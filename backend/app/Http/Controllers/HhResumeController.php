<?php

namespace App\Http\Controllers;

use App\Services\HhResumeListService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HhResumeController extends Controller
{
    public function __construct(
        private readonly HhResumeListService $hhResumeListService
    ) {
    }

    public function index(Request $request): JsonResponse
    {
        $result = $this->hhResumeListService->fetchForUser($request->user());

        if (! ($result['ok'] ?? false)) {
            return response()->json([
                'message' => $result['message'] ?? 'Ошибка',
                'error' => $result['error'] ?? 'unknown',
            ], 422);
        }

        return response()->json([
            'data' => $result['data'],
        ]);
    }
}
