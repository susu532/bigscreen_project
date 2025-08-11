<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreResponseRequest;
use App\Http\Resources\ResponseResource;
use App\Models\Response;
use App\Services\SurveyService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * ResponseController
 * 
 * Handles survey response submission and retrieval
 */
class ResponseController extends Controller
{
    /**
     * Survey service instance
     * 
     * @var SurveyService
     */
    protected $surveyService;

    /**
     * Constructor
     * 
     * @param SurveyService $surveyService
     */
    public function __construct(SurveyService $surveyService)
    {
        $this->surveyService = $surveyService;
    }

    /**
     * Store a new survey response
     * 
     * Validates and stores user's survey submission
     * 
     * @param StoreResponseRequest $request
     * @return JsonResponse
     */
    public function store(StoreResponseRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();

            // Process the survey response through service
            $response = $this->surveyService->processSurveyResponse(
                $request->validated()
            );

            DB::commit();

            // Return success response with token
            return response()->json([
                'success' => true,
                'message' => 'Survey response submitted successfully',
                'data' => [
                    'token' => $response->token,
                    'response_url' => "/response/{$response->token}"
                ]
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Survey submission error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to submit survey response. Please try again.',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * Retrieve a survey response by token
     * 
     * @param string $token
     * @return JsonResponse
     */
    public function show(string $token): JsonResponse
    {
        // Find response by token
        $response = Response::where('token', $token)
            ->with(['answers.question'])
            ->first();

        if (!$response) {
            return response()->json([
                'success' => false,
                'message' => 'Survey response not found'
            ], 404);
        }

        // Return response with answers
        return response()->json([
            'success' => true,
            'data' => new ResponseResource($response),
            'message' => 'Response retrieved successfully'
        ]);
    }

    /**
     * Get all responses (Admin only)
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        // This should be protected by admin middleware
        $responses = Response::with(['answers.question'])
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json([
            'success' => true,
            'data' => ResponseResource::collection($responses),
            'meta' => [
                'current_page' => $responses->currentPage(),
                'last_page' => $responses->lastPage(),
                'per_page' => $responses->perPage(),
                'total' => $responses->total()
            ],
            'message' => 'Responses retrieved successfully'
        ]);
    }
}