<?php

namespace App\Distributions\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DistributionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'status' => $this->status,
            'target_applications' => $this->target_applications,
            'applications_sent' => $this->applications_sent,
            'search_filters' => $this->search_filters,
            'excluded_companies' => $this->excluded_companies,
            'daily_limit' => $this->daily_limit,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'views_count' => $this->views_count,
            'responses_count' => $this->responses_count,
            'last_sent_at' => $this->last_sent_at?->toIso8601String(),
            'completed_at' => $this->completed_at?->toIso8601String(),
            'resume_link' => $this->resume_link,
            'vacancy_link' => $this->vacancy_link,
            'cover_letter' => $this->cover_letter,
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
        ];
    }
}
