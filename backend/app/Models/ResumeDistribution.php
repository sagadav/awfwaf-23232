<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResumeDistribution extends Model
{
    protected $fillable = [
        'user_id',
        'status',
        'target_applications',
        'applications_sent',
        'search_filters',
        'excluded_companies',
        'daily_limit',
        'start_time',
        'end_time',
        'views_count',
        'responses_count',
        'last_sent_at',
        'completed_at',
        'resume_link',
        'vacancy_link',
        'cover_letter',
    ];

    protected $casts = [
        'search_filters' => 'array',
        'excluded_companies' => 'array',
        'last_sent_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
