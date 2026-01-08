<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
        'hh_token',
        'hh_hhul',
        'hh_crypted_id',
        'hh_xsrf',
        'hh_token_expires_at',
        'tier',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'hh_token',
        'hh_hhul',
        'hh_xsrf',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'hh_token_expires_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the resume distributions for the user.
     */
    public function resumeDistributions()
    {
        return $this->hasMany(ResumeDistribution::class);
    }

    /**
     * Get the maximum number of applications allowed for the user's tier.
     */
    public function getMaxApplications(): int
    {
        return $this->tier === 'pro' ? 200 : 40;
    }
}
