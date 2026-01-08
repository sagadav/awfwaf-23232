<?php

namespace App\Distributions\Domain\Repositories;

use App\Models\ResumeDistribution;
use Illuminate\Support\Collection;

interface DistributionRepositoryInterface
{
    /**
     * Find all distributions for a specific user.
     * 
     * @param int $userId
     * @return Collection<int, ResumeDistribution>
     */
    public function findAllByUserId(int $userId): Collection;

    /**
     * Find a distribution by its ID and user ID.
     * 
     * @param int $id
     * @param int $userId
     * @return ResumeDistribution|null
     */
    public function findByIdAndUserId(int $id, int $userId): ?ResumeDistribution;

    /**
     * Save a distribution.
     * 
     * @param ResumeDistribution $distribution
     * @return ResumeDistribution
     */
    public function save(ResumeDistribution $distribution): ResumeDistribution;

    /**
     * Delete a distribution.
     * 
     * @param ResumeDistribution $distribution
     * @return bool
     */
    public function delete(ResumeDistribution $distribution): bool;
}
