<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\QuestionResource;
use App\Models\Question;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * QuestionController
 * 
 * Handles API requests for survey questions
 */
class QuestionController extends Controller
{
    /**
     * Get all survey questions
     * 
     * Returns all questions in the correct order for the survey
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        // Fetch all questions ordered by ID
        $questions = Question::orderBy('id')->get();

        // Return questions as a resource collection
        return response()->json([
            'success' => true,
            'data' => QuestionResource::collection($questions),
            'message' => 'Questions retrieved successfully'
        ]);
    }

    /**
     * Get a specific question by ID
     * 
     * @param Question $question
     * @return JsonResponse
     */
    public function show(Question $question): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => new QuestionResource($question),
            'message' => 'Question retrieved successfully'
        ]);
    }
}