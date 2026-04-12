<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HhResumeController;
use App\Distributions\Http\Controllers\DistributionController;

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/verify', [AuthController::class, 'verify']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::get('/hh/resumes', [HhResumeController::class, 'index']);
    Route::apiResource('distributions', DistributionController::class);
});
