<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Question Model
 * 
 * Represents a survey question with its type and options
 * 
 * @property int $id
 * @property string $question_text
 * @property string $type - A: Multiple Choice, B: Text Input, C: Numeric Scale
 * @property array|null $options - Options for multiple choice questions
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class Question extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'question_text',
        'type',
        'options',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'options' => 'array',
    ];

    /**
     * Question types constants
     */
    const TYPE_MULTIPLE_CHOICE = 'A';
    const TYPE_TEXT_INPUT = 'B';
    const TYPE_NUMERIC_SCALE = 'C';

    /**
     * Get all answers for this question
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    /**
     * Check if question is multiple choice
     * 
     * @return bool
     */
    public function isMultipleChoice(): bool
    {
        return $this->type === self::TYPE_MULTIPLE_CHOICE;
    }

    /**
     * Check if question is text input
     * 
     * @return bool
     */
    public function isTextInput(): bool
    {
        return $this->type === self::TYPE_TEXT_INPUT;
    }

    /**
     * Check if question is numeric scale
     * 
     * @return bool
     */
    public function isNumericScale(): bool
    {
        return $this->type === self::TYPE_NUMERIC_SCALE;
    }
}