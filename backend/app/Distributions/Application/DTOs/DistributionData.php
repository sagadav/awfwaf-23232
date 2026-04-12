<?php

namespace App\Distributions\Application\DTOs;

class DistributionData
{
    public function __construct(
        public readonly int $targetApplications,
        public readonly ?string $resumeLink,
        public readonly ?string $resumeHash = null,
        public readonly ?string $resumeTitle = null,
        public readonly ?array $searchFilters = null,
        public readonly ?string $status = 'active',
        public readonly ?int $dailyLimit = null,
        public readonly ?string $startTime = null,
        public readonly ?string $endTime = null,
        public readonly ?string $coverLetter = null,
    ) {
    }

    /**
     * Create DTO from array data.
     */
    public static function fromArray(array $data): self
    {
        return new self(
            targetApplications: (int) $data['target_applications'],
            resumeLink: $data['resume_link'] ?? null,
            resumeHash: $data['resume_hash'] ?? null,
            resumeTitle: $data['resume_title'] ?? null,
            searchFilters: $data['search_filters'] ?? null,
            status: $data['status'] ?? 'active',
            dailyLimit: isset($data['daily_limit']) ? (int) $data['daily_limit'] : null,
            startTime: $data['start_time'] ?? null,
            endTime: $data['end_time'] ?? null,
            coverLetter: $data['cover_letter'] ?? null,
        );
    }

    /**
     * Convert DTO to array for model persistence.
     */
    public function toArray(): array
    {
        return [
            'target_applications' => $this->targetApplications,
            'resume_link' => $this->resumeLink,
            'resume_hash' => $this->resumeHash,
            'resume_title' => $this->resumeTitle,
            'search_filters' => $this->searchFilters,
            'status' => $this->status,
            'daily_limit' => $this->dailyLimit,
            'start_time' => $this->startTime,
            'end_time' => $this->endTime,
            'cover_letter' => $this->coverLetter,
        ];
    }
}
