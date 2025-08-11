<?php

namespace App\Services;

use App\Models\Answer;
use App\Models\Response;
use Illuminate\Support\Facades\DB;

/**
 * SurveyService
 * 
 * Handles business logic for survey response processing
 */
class SurveyService
{
    /**
     * Process and store a survey response
     * 
     * @param array $data Validated survey data
     * @return Response The created response model
     * @throws \Exception
     */
    public function processSurveyResponse(array $data): Response
    {
        try {
            DB::beginTransaction();

            // Create the response record
            $response = Response::create([
                'email' => $data['email']
            ]);

            // Process and store each answer
            foreach ($data['answers'] as $answerData) {
                $this->createAnswer($response, $answerData);
            }

            DB::commit();

            // Load relationships for return
            $response->load('answers.question');

            return $response;

        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception('Failed to process survey response: ' . $e->getMessage());
        }
    }

    /**
     * Create an answer record
     * 
     * @param Response $response
     * @param array $answerData
     * @return Answer
     */
    protected function createAnswer(Response $response, array $answerData): Answer
    {
        return Answer::create([
            'response_id' => $response->id,
            'question_id' => $answerData['question_id'],
            'answer_text' => (string) $answerData['answer']
        ]);
    }

    /**
     * Get response statistics for a specific question
     * 
     * @param int $questionId
     * @return array
     */
    public function getQuestionStatistics(int $questionId): array
    {
        $answers = Answer::where('question_id', $questionId)
            ->with('question')
            ->get();

        if ($answers->isEmpty()) {
            return [
                'total' => 0,
                'distribution' => []
            ];
        }

        $question = $answers->first()->question;
        $statistics = ['total' => $answers->count()];

        switch ($question->type) {
            case 'A': // Multiple choice
                $distribution = $answers->groupBy('answer_text')
                    ->map(function ($group) {
                        return $group->count();
                    })
                    ->toArray();
                $statistics['distribution'] = $distribution;
                break;

            case 'C': // Numeric scale
                $values = $answers->pluck('answer_text')->map(function ($value) {
                    return (int) $value;
                });
                $statistics['average'] = round($values->avg(), 2);
                $statistics['min'] = $values->min();
                $statistics['max'] = $values->max();
                $statistics['distribution'] = $values->countBy()->toArray();
                break;

            case 'B': // Text input
                // For text inputs, we might want to show sample responses
                $statistics['sample_responses'] = $answers->take(10)
                    ->pluck('answer_text')
                    ->toArray();
                break;
        }

        return $statistics;
    }

    /**
     * Validate that all required questions are answered
     * 
     * @param array $answers
     * @return bool
     */
    public function validateAllQuestionsAnswered(array $answers): bool
    {
        $answeredQuestionIds = collect($answers)->pluck('question_id')->unique();
        
        // We expect exactly 20 questions to be answered
        return $answeredQuestionIds->count() === 20;
    }

    /**
     * Get recent responses
     * 
     * @param int $limit
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getRecentResponses(int $limit = 10)
    {
        return Response::with(['answers.question'])
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }

    /**
     * Get response count by date range
     * 
     * @param \DateTime $startDate
     * @param \DateTime $endDate
     * @return int
     */
    public function getResponseCountByDateRange(\DateTime $startDate, \DateTime $endDate): int
    {
        return Response::whereBetween('created_at', [$startDate, $endDate])->count();
    }
}