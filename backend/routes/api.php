<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\QuestionController;
use App\Http\Controllers\Api\ResponseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes (no authentication required)
Route::prefix('v1')->group(function () {
    
    // Survey questions - public can view
    Route::get('/questions', [QuestionController::class, 'index']);
    Route::get('/questions/{question}', [QuestionController::class, 'show']);
    
    // Survey responses - public can submit and view by token
    Route::post('/responses', [ResponseController::class, 'store']);
    Route::get('/responses/{token}', [ResponseController::class, 'show']);
    
    // Admin authentication
    Route::post('/admin/login', [AdminController::class, 'login']);
});

// Protected admin routes (require authentication)
Route::prefix('v1/admin')->middleware('auth:sanctum')->group(function () {
    
    // Admin authentication
    Route::post('/logout', [AdminController::class, 'logout']);
    Route::get('/me', [AdminController::class, 'me']);
    
    // Dashboard and statistics
    Route::get('/dashboard', [AdminController::class, 'dashboard']);
    
    // Questions management
    Route::get('/questionnaire', [AdminController::class, 'questionnaire']);
    
    // Responses management
    Route::get('/responses', [AdminController::class, 'responses']);
    
    // Additional admin endpoints can be added here
});

// Health check endpoint
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
        'service' => 'Survey Platform API',
        'version' => '1.0.0'
    ]);
});

// Fallback for undefined routes
Route::fallback(function () {
    return response()->json([
        'success' => false,
        'message' => 'Endpoint not found. Please check the API documentation.',
    ], 404);
});
