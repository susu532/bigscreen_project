<?php

namespace App\Http\Requests;

use App\Models\Question;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * StoreResponseRequest
 * 
 * Validates survey response submission data
 */
class StoreResponseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Allow all users to submit survey responses
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'email' => 'required|email|max:255',
            'answers' => 'required|array|size:20', // Must have exactly 20 answers
            'answers.*.question_id' => 'required|exists:questions,id',
            'answers.*.answer' => 'required|string|max:255',
        ];

        // Add dynamic validation based on question types
        if ($this->has('answers')) {
            foreach ($this->input('answers', []) as $index => $answer) {
                if (isset($answer['question_id'])) {
                    $question = Question::find($answer['question_id']);
                    
                    if ($question) {
                        switch ($question->type) {
                            case 'A': // Multiple choice
                                if ($question->options) {
                                    $rules["answers.{$index}.answer"] = [
                                        'required',
                                        'string',
                                        Rule::in($question->options)
                                    ];
                                }
                                break;
                            
                            case 'B': // Text input
                                $rules["answers.{$index}.answer"] = 'required|string|max:255';
                                break;
                            
                            case 'C': // Numeric scale
                                $rules["answers.{$index}.answer"] = 'required|integer|min:1|max:5';
                                break;
                        }
                    }
                }
            }
        }

        return $rules;
    }

    /**
     * Get custom error messages
     * 
     * @return array
     */
    public function messages(): array
    {
        return [
            'email.required' => 'Email address is required.',
            'email.email' => 'Please provide a valid email address.',
            'answers.required' => 'All survey questions must be answered.',
            'answers.array' => 'Invalid answer format.',
            'answers.size' => 'All 20 questions must be answered.',
            'answers.*.question_id.required' => 'Question ID is required for each answer.',
            'answers.*.question_id.exists' => 'Invalid question ID provided.',
            'answers.*.answer.required' => 'Answer is required for each question.',
            'answers.*.answer.string' => 'Answer must be text.',
            'answers.*.answer.max' => 'Answer cannot exceed 255 characters.',
            'answers.*.answer.integer' => 'Rating must be a number.',
            'answers.*.answer.min' => 'Rating must be at least 1.',
            'answers.*.answer.max' => 'Rating cannot exceed 5.',
            'answers.*.answer.in' => 'Please select a valid option.',
        ];
    }

    /**
     * Prepare the data for validation
     * 
     * @return void
     */
    protected function prepareForValidation(): void
    {
        // Extract email from answers if question_id 1 is email question
        if ($this->has('answers')) {
            $answers = $this->input('answers');
            foreach ($answers as $answer) {
                if (isset($answer['question_id']) && $answer['question_id'] == 1) {
                    $this->merge([
                        'email' => $answer['answer'] ?? ''
                    ]);
                    break;
                }
            }
        }
    }
}