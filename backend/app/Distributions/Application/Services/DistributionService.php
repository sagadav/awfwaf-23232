<?php

namespace App\Distributions\Application\Services;

use App\Distributions\Application\DTOs\DistributionData;
use App\Distributions\Domain\Repositories\DistributionRepositoryInterface;
use App\Models\ResumeDistribution;
use App\Jobs\ProcessDistribution;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Schema;

class DistributionService
{
    public function __construct(
        private readonly DistributionRepositoryInterface $repository
    ) {
    }

    /**
     * Get all distributions for a user.
     */
    public function getUserDistributions(int $userId): Collection
    {
        return $this->repository->findAllByUserId($userId);
    }

    /**
     * Create a new distribution.
     */
    public function createDistribution(int $userId, DistributionData $data): ResumeDistribution
    {
        $distribution = new ResumeDistribution();
        $distribution->user_id = $userId;
        $distribution->fill($this->filterPersistableAttributes($data->toArray()));
        $this->applyResumeNormalization($distribution);

        // Initial defaults
        $distribution->applications_sent = 0;
        $distribution->views_count = 0;
        $distribution->responses_count = 0;

        $saved = $this->repository->save($distribution);

        if ($saved->status === 'active') {
            ProcessDistribution::dispatch($saved);
        }

        return $saved;
    }

    /**
     * Update an existing distribution.
     */
    public function updateDistribution(int $id, int $userId, DistributionData $data): ?ResumeDistribution
    {
        $distribution = $this->repository->findByIdAndUserId($id, $userId);
        
        if (!$distribution) {
            return null;
        }

        $oldStatus = $distribution->status;
        $distribution->fill(
            $this->filterPersistableAttributes(
                array_filter($data->toArray(), fn($value) => $value !== null)
            )
        );
        $this->applyResumeNormalization($distribution);

        $saved = $this->repository->save($distribution);

        if ($saved->status === 'active' && $oldStatus !== 'active') {
            ProcessDistribution::dispatch($saved);
        }

        return $saved;
    }

    /**
     * Delete a distribution.
     */
    public function deleteDistribution(int $id, int $userId): bool
    {
        $distribution = $this->repository->findByIdAndUserId($id, $userId);
        
        if (!$distribution) {
            return false;
        }

        return $this->repository->delete($distribution);
    }

    private function applyResumeNormalization(ResumeDistribution $distribution): void
    {
        if (! empty($distribution->resume_hash)) {
            $distribution->resume_link = 'https://hh.ru/resume/'.$distribution->resume_hash;

            return;
        }
        if (! empty($distribution->resume_link)) {
            $path = parse_url($distribution->resume_link, PHP_URL_PATH);
            if ($path) {
                $distribution->resume_hash = basename($path);
            }
        }
    }

    /**
     * Keep only columns that exist in current DB schema.
     */
    private function filterPersistableAttributes(array $attributes): array
    {
        static $columns = null;

        if ($columns === null) {
            $columns = array_flip(Schema::getColumnListing('resume_distributions'));
        }

        return array_filter(
            $attributes,
            static fn ($_value, $key) => isset($columns[$key]),
            ARRAY_FILTER_USE_BOTH
        );
    }
}
