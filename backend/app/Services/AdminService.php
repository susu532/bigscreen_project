<?php

namespace App\Services;

use App\Models\Answer;
use App\Models\Question;
use App\Models\Response;
use Illuminate\Support\Facades\DB;

/**
 * AdminService
 * 
 * Handles business logic for admin dashboard and statistics
 */
class AdminService
{
    /**
     * Get dashboard statistics including charts data
     * 
     * @return array
     */
    public function getDashboardStatistics(): array
    {
        $totalResponses = Response::count();
        
        // Get pie chart data for questions 6, 7, and 10
        $purchaseFrequency = $this->getPieChartData(6); // Question 6
        $recommendationLikelihood = $this->getPieChartData(7); // Question 7
        $productCategory = $this->getPieChartData(10); // Question 10
        
        // Get radar chart data for questions 11-15
        $radarData = $this->getRadarChartData([11, 12, 13, 14, 15]);
        
        // Get recent responses
        $recentResponses = Response::with('answers')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($response) {
                return [
                    'id' => $response->id,
                    'email' => $response->email,
                    'date' => $response->created_at->format('Y-m-d H:i:s'),
                    'token' => $response->token
                ];
            });

        // Get response trends (last 7 days)
        $trends = $this->getResponseTrends(7);

        return [
            'total_responses' => $totalResponses,
            'pie_charts' => [
                'purchase_frequency' => $purchaseFrequency,
                'recommendation_likelihood' => $recommendationLikelihood,
                'product_category' => $productCategory
            ],
            'radar_chart' => $radarData,
            'recent_responses' => $recentResponses,
            'response_trends' => $trends,
            'statistics' => [
                'today' => Response::whereDate('created_at', today())->count(),
                'this_week' => Response::whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()])->count(),
                'this_month' => Response::whereMonth('created_at', now()->month)->count()
            ]
        ];
    }

    /**
     * Get pie chart data for a specific question
     * 
     * @param int $questionId
     * @return array
     */
    protected function getPieChartData(int $questionId): array
    {
        $question = Question::find($questionId);
        
        if (!$question || $question->type !== 'A') {
            return [
                'labels' => [],
                'data' => [],
                'question' => null
            ];
        }

        $answers = Answer::where('question_id', $questionId)
            ->select('answer_text', DB::raw('COUNT(*) as count'))
            ->groupBy('answer_text')
            ->get();

        $labels = [];
        $data = [];

        // Ensure all options are included, even with 0 count
        foreach ($question->options as $option) {
            $labels[] = $option;
            $answer = $answers->firstWhere('answer_text', $option);
            $data[] = $answer ? $answer->count : 0;
        }

        return [
            'labels' => $labels,
            'data' => $data,
            'question' => $question->question_text,
            'total' => array_sum($data)
        ];
    }

    /**
     * Get radar chart data for numeric scale questions
     * 
     * @param array $questionIds
     * @return array
     */
    protected function getRadarChartData(array $questionIds): array
    {
        $labels = [];
        $averages = [];

        foreach ($questionIds as $questionId) {
            $question = Question::find($questionId);
            
            if (!$question || $question->type !== 'C') {
                continue;
            }

            // Get average rating for this question
            $avg = Answer::where('question_id', $questionId)
                ->selectRaw('AVG(CAST(answer_text AS DECIMAL(3,2))) as average')
                ->first()
                ->average;

            // Extract key label from question text
            $label = $this->extractLabelFromQuestion($question->question_text);
            $labels[] = $label;
            $averages[] = round($avg ?? 0, 2);
        }

        return [
            'labels' => $labels,
            'datasets' => [
                [
                    'label' => 'Average Rating',
                    'data' => $averages,
                    'backgroundColor' => 'rgba(54, 162, 235, 0.2)',
                    'borderColor' => 'rgba(54, 162, 235, 1)',
                    'borderWidth' => 2
                ]
            ]
        ];
    }

    /**
     * Extract a short label from question text for charts
     * 
     * @param string $questionText
     * @return string
     */
    protected function extractLabelFromQuestion(string $questionText): string
    {
        // Map specific questions to labels
        $labelMap = [
            'ease of use' => 'Ease of Use',
            'features' => 'Product Features',
            'delivery speed' => 'Delivery Speed',
            'website' => 'Website Experience',
            'pricing' => 'Price Competitiveness'
        ];

        $lowerText = strtolower($questionText);
        foreach ($labelMap as $key => $label) {
            if (strpos($lowerText, $key) !== false) {
                return $label;
            }
        }

        // Fallback: take first few words
        $words = explode(' ', $questionText);
        return implode(' ', array_slice($words, 0, 3));
    }

    /**
     * Get response trends for the last N days
     * 
     * @param int $days
     * @return array
     */
    protected function getResponseTrends(int $days): array
    {
        $trends = [];
        
        for ($i = $days - 1; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $count = Response::whereDate('created_at', $date)->count();
            
            $trends[] = [
                'date' => $date->format('Y-m-d'),
                'day' => $date->format('D'),
                'count' => $count
            ];
        }

        return $trends;
    }

    /**
     * Get all questions for admin view
     * 
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllQuestions()
    {
        return Question::orderBy('id')
            ->get()
            ->map(function ($question) {
                return [
                    'id' => $question->id,
                    'number' => $question->id,
                    'question_text' => $question->question_text,
                    'type' => $question->type,
                    'type_label' => $this->getTypeLabel($question->type),
                    'options' => $question->options,
                    'response_count' => $question->answers()->count()
                ];
            });
    }

    /**
     * Get human-readable type label
     * 
     * @param string $type
     * @return string
     */
    protected function getTypeLabel(string $type): string
    {
        return match($type) {
            'A' => 'Multiple Choice',
            'B' => 'Text Input',
            'C' => 'Numeric Scale (1-5)',
            default => 'Unknown'
        };
    }

    /**
     * Get all responses with pagination and search
     * 
     * @param int $page
     * @param int $perPage
     * @param string $search
     * @return array
     */
    public function getAllResponses(int $page = 1, int $perPage = 20, string $search = ''): array
    {
        $query = Response::with(['answers.question']);

        if (!empty($search)) {
            $query->where('email', 'like', "%{$search}%")
                  ->orWhere('token', 'like', "%{$search}%");
        }

        $responses = $query->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);

        $formattedResponses = $responses->map(function ($response) {
            return [
                'id' => $response->id,
                'token' => $response->token,
                'email' => $response->email,
                'submitted_at' => $response->created_at->format('Y-m-d H:i:s'),
                'answers' => $response->answers->map(function ($answer) {
                    return [
                        'question_id' => $answer->question_id,
                        'question_text' => $answer->question->question_text,
                        'answer' => $answer->answer_text,
                        'type' => $answer->question->type
                    ];
                })
            ];
        });

        return [
            'data' => $formattedResponses,
            'meta' => [
                'current_page' => $responses->currentPage(),
                'last_page' => $responses->lastPage(),
                'per_page' => $responses->perPage(),
                'total' => $responses->total(),
                'from' => $responses->firstItem(),
                'to' => $responses->lastItem()
            ]
        ];
    }

    /**
     * Export responses to CSV
     * 
     * @return string CSV content
     */
    public function exportResponsesToCsv(): string
    {
        $responses = Response::with(['answers.question'])->get();
        
        // Build CSV header
        $headers = ['Response ID', 'Email', 'Submitted At'];
        $questions = Question::orderBy('id')->get();
        foreach ($questions as $question) {
            $headers[] = "Q{$question->id}: " . substr($question->question_text, 0, 50);
        }
        
        $csv = implode(',', $headers) . "\n";
        
        // Build CSV rows
        foreach ($responses as $response) {
            $row = [
                $response->id,
                $response->email,
                $response->created_at->format('Y-m-d H:i:s')
            ];
            
            foreach ($questions as $question) {
                $answer = $response->answers->firstWhere('question_id', $question->id);
                $row[] = $answer ? $answer->answer_text : '';
            }
            
            $csv .= implode(',', array_map(function($value) {
                return '"' . str_replace('"', '""', $value) . '"';
            }, $row)) . "\n";
        }
        
        return $csv;
    }
}