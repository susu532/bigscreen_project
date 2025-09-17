<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminLoginRequest;
use App\Models\User;
use App\Services\AdminService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

/**
 * AdminController
 * 
 * Handles admin authentication and dashboard operations
 */
class AdminController extends Controller
{
    /**
     * Admin service instance
     * 
     * @var AdminService
     */
    protected $adminService;

    /**
     * Constructor
     * 
     * @param AdminService $adminService
     */
    public function __construct(AdminService $adminService)
    {
        $this->adminService = $adminService;
    }

    /**
     * Admin login
     * 
     * Authenticates admin user and returns access token
     * 
     * @param AdminLoginRequest $request
     * @return JsonResponse
     */
    public function login(AdminLoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();

        // Find user by email
        $user = User::where('email', $credentials['email'])->first();

        // Check if user exists and password is correct
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }

        // Check if user is admin (for now, we check specific email)
        if ($user->email !== 'admin@survey.com') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access'
            ], 403);
        }

        // Create token
        $token = $user->createToken('admin-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email
                ],
                'token' => $token,
                'token_type' => 'Bearer'
            ]
        ]);
    }

    /**
     * Admin logout
     * 
     * Revokes the current access token
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        // Revoke the current token
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully'
        ]);
    }

    /**
     * Get dashboard statistics
     * 
     * Returns statistics for admin dashboard charts
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function dashboard(Request $request): JsonResponse
    {
        try {
            // Get dashboard statistics from service
            $statistics = $this->adminService->getDashboardStatistics();

            return response()->json([
                'success' => true,
                'data' => $statistics,
                'message' => 'Dashboard statistics retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve dashboard statistics',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * Get all survey questions for admin view
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function questionnaire(Request $request): JsonResponse
    {
        try {
            $questions = $this->adminService->getAllQuestions();

            return response()->json([
                'success' => true,
                'data' => $questions,
                'message' => 'Questions retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve questions',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * Update a question
     * 
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function updateQuestion(Request $request, int $id): JsonResponse
    {
        try {
            $validated = $request->validate([
                'question_text' => 'required|string|max:1000',
                'type' => 'required|in:A,B,C',
                'options' => 'nullable|array',
                'options.*' => 'string|max:255'
            ]);

            $question = $this->adminService->updateQuestion($id, $validated);

            if (!$question) {
                return response()->json([
                    'success' => false,
                    'message' => 'Question not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $question,
                'message' => 'Question updated successfully'
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update question',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * Get all survey responses for admin view
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function responses(Request $request): JsonResponse
    {
        try {
            // Get paginated responses with filters
            $page = $request->get('page', 1);
            $perPage = $request->get('per_page', 20);
            $search = $request->get('search', '');

            $responses = $this->adminService->getAllResponses($page, $perPage, $search);

            return response()->json([
                'success' => true,
                'data' => $responses['data'],
                'meta' => $responses['meta'],
                'message' => 'Responses retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve responses',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * Get current authenticated admin user
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'id' => $request->user()->id,
                'name' => $request->user()->name,
                'email' => $request->user()->email
            ],
            'message' => 'User retrieved successfully'
        ]);
    }
}