<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * Response Model
 * 
 * Represents a user's survey response with a unique token for access
 * 
 * @property int $id
 * @property string $token - UUID for accessing the response
 * @property string $email - User's email address
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class Response extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'token',
        'email',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'id', // Hide ID from API responses for security
    ];

    /**
     * Boot method to handle model events
     * 
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        // Automatically generate UUID token when creating a new response
        static::creating(function ($response) {
            if (empty($response->token)) {
                $response->token = (string) Str::uuid();
            }
        });
    }

    /**
     * Get all answers for this response
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    /**
     * Get response by token
     * 
     * @param string $token
     * @return Response|null
     */
    public static function findByToken(string $token): ?Response
    {
        return static::where('token', $token)->first();
    }

    /**
     * Get the route key for the model (use token instead of id)
     * 
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'token';
    }

    /**
     * Get response URL
     * 
     * @return string
     */
    public function getResponseUrl(): string
    {
        return url("/response/{$this->token}");
    }

    /**
     * Get formatted creation date
     * 
     * @return string
     */
    public function getFormattedDateAttribute(): string
    {
        return $this->created_at->format('F j, Y g:i A');
    }
}