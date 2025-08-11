<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Answer Model
 * 
 * Represents a user's answer to a specific question in a survey response
 * 
 * @property int $id
 * @property int $response_id - Foreign key to responses table
 * @property int $question_id - Foreign key to questions table
 * @property string $answer_text - The user's answer
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class Answer extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'response_id',
        'question_id',
        'answer_text',
    ];

    /**
     * Get the response that owns this answer
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function response()
    {
        return $this->belongsTo(Response::class);
    }

    /**
     * Get the question that this answer belongs to
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    /**
     * Scope to get answers for a specific response
     * 
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int $responseId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeForResponse($query, $responseId)
    {
        return $query->where('response_id', $responseId);
    }

    /**
     * Scope to get answers for a specific question
     * 
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int $questionId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeForQuestion($query, $questionId)
    {
        return $query->where('question_id', $questionId);
    }

    /**
     * Get numeric value for numeric scale questions
     * 
     * @return int|null
     */
    public function getNumericValue(): ?int
    {
        if ($this->question && $this->question->type === Question::TYPE_NUMERIC_SCALE) {
            return (int) $this->answer_text;
        }
        return null;
    }

    /**
     * Check if answer is valid for the question type
     * 
     * @return bool
     */
    public function isValid(): bool
    {
        if (!$this->question) {
            return false;
        }

        switch ($this->question->type) {
            case Question::TYPE_MULTIPLE_CHOICE:
                // Check if answer is in the available options
                return in_array($this->answer_text, $this->question->options ?? []);
            
            case Question::TYPE_TEXT_INPUT:
                // Check if answer is not empty and within length limit
                return !empty($this->answer_text) && strlen($this->answer_text) <= 255;
            
            case Question::TYPE_NUMERIC_SCALE:
                // Check if answer is a number between 1 and 5
                $value = (int) $this->answer_text;
                return $value >= 1 && $value <= 5;
            
            default:
                return false;
        }
    }
}