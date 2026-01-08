<?php

namespace App\Distributions\Infrastructure\Persistence;

use App\Distributions\Domain\Repositories\DistributionRepositoryInterface;
use App\Models\ResumeDistribution;
use Illuminate\Support\Collection;

class EloquentDistributionRepository implements DistributionRepositoryInterface
{
    /**
     * @inheritDoc
     */
    public function findAllByUserId(int $userId): Collection
    {
        return ResumeDistribution::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * @inheritDoc
     */
    public function findByIdAndUserId(int $id, int $userId): ?ResumeDistribution
    {
        return ResumeDistribution::where('id', $id)
            ->where('user_id', $userId)
            ->first();
    }

    /**
     * @inheritDoc
     */
    public function save(ResumeDistribution $distribution): ResumeDistribution
    {
        $distribution->save();
        return $distribution;
    }

    /**
     * @inheritDoc
     */
    public function delete(ResumeDistribution $distribution): bool
    {
        return $distribution->delete();
    }
}
