<?php

namespace App\Distributions\Application\Services;

use App\Distributions\Application\DTOs\DistributionData;
use App\Distributions\Domain\Repositories\DistributionRepositoryInterface;
use App\Models\ResumeDistribution;
use App\Jobs\ProcessDistribution;
use Illuminate\Support\Collection;

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
        $distribution->fill($data->toArray());
        
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
        $distribution->fill(array_filter($data->toArray(), fn($value) => $value !== null));
        
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
}
