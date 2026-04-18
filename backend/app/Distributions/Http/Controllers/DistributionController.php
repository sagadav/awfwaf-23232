<?php

namespace App\Distributions\Http\Controllers;

use App\Distributions\Application\DTOs\DistributionData;
use App\Distributions\Application\Services\DistributionService;
use App\Distributions\Http\Resources\DistributionResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class DistributionController extends Controller
{
    public function __construct(
        private readonly DistributionService $distributionService
    ) {
    }

    /**
     * Display a listing of the user's distributions.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $distributions = $this->distributionService->getUserDistributions($request->user()->id);

        return DistributionResource::collection($distributions);
    }

    /**
     * Store a newly created distribution.
     */
    public function store(Request $request): JsonResponse
    {
        $maxApps = $request->user()->getMaxApplications();
        $validated = $request->validate([
            'target_applications' => 'required|integer|min:1|max:' . $maxApps,
            'resume_hash' => ['nullable', 'string', 'max:64', 'regex:/^[A-Za-z0-9]+$/', 'required_without:resume_link'],
            'resume_link' => ['nullable', 'string', 'url', 'required_without:resume_hash'],
            'resume_title' => 'nullable|string|max:500',
            'search_filters' => 'nullable|array',
            'daily_limit' => 'nullable|integer|min:1|max:' . $maxApps,
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i',
            'cover_letter' => 'nullable|string|max:5000',
        ]);

        // Check global limit
        $activeDistributions = $this->distributionService->getUserDistributions($request->user()->id)
            ->whereIn('status', ['active', 'paused']);
            
        $currentUsage = $activeDistributions->sum('target_applications');

        if ($currentUsage + $validated['target_applications'] > $maxApps) {
            return response()->json([
                'message' => "Application limit exceeded. You can only have {$maxApps} active applications in total across all tasks.",
                'errors' => [
                    'target_applications' => ["Total limit of {$maxApps} active applications exceeded. Current usage: {$currentUsage}."]
                ]
            ], 422);
        }

        $distribution = $this->distributionService->createDistribution(
            $request->user()->id,
            DistributionData::fromArray($validated)
        );

        return response()->json([
            'success' => true,
            'message' => 'Distribution created',
            'distribution' => new DistributionResource($distribution),
        ], 201);
    }

    /**
     * Display the specified distribution.
     */
    public function show(Request $request, int $id): JsonResponse|DistributionResource
    {
        $distributions = $this->distributionService->getUserDistributions($request->user()->id);
        $distribution = $distributions->firstWhere('id', $id);

        if (!$distribution) {
            return response()->json(['message' => 'Not found'], 404);
        }

        return new DistributionResource($distribution);
    }

    /**
     * Update the specified distribution.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $maxApps = $request->user()->getMaxApplications();
        $validated = $request->validate([
            'status' => 'sometimes|in:active,paused,completed,failed',
            'target_applications' => 'sometimes|integer|min:1|max:' . $maxApps,
            'resume_hash' => ['sometimes', 'nullable', 'string', 'max:64', 'regex:/^[A-Za-z0-9]+$/'],
            'resume_link' => ['sometimes', 'nullable', 'string', 'url'],
            'resume_title' => 'sometimes|nullable|string|max:500',
            'search_filters' => 'sometimes|array',
            'daily_limit' => 'sometimes|integer|min:1|max:' . $maxApps,
            'start_time' => 'sometimes|date_format:H:i',
            'end_time' => 'sometimes|date_format:H:i',
            'cover_letter' => 'nullable|string|max:5000',
        ]);

        // Access all distributions to check limits
        $allDistributions = $this->distributionService->getUserDistributions($request->user()->id);
        $currentDistribution = $allDistributions->firstWhere('id', $id);

        if (!$currentDistribution) {
             return response()->json(['message' => 'Not found'], 404);
        }

        $merged = array_merge(
            $currentDistribution->only([
                'target_applications', 'resume_link', 'resume_hash', 'resume_title',
                'search_filters', 'daily_limit', 'start_time', 'end_time', 'cover_letter', 'status',
            ]),
            $validated
        );

        if (empty($merged['resume_hash']) && empty($merged['resume_link'])) {
            return response()->json([
                'message' => 'Укажите резюме из списка или ссылку на резюме.',
                'errors' => [
                    'resume_hash' => ['Нужно выбрать резюме или указать ссылку.'],
                ],
            ], 422);
        }

        // Determine new state
        $newStatus = $merged['status'] ?? $currentDistribution->status;
        $newTarget = $merged['target_applications'] ?? $currentDistribution->target_applications;

        // Only check limit if the task is going to be active or paused
        if (in_array($newStatus, ['active', 'paused'])) {
            // Sum of OTHER active/paused tasks
            $otherUsage = $allDistributions
                ->where('id', '!=', $id)
                ->whereIn('status', ['active', 'paused'])
                ->sum('target_applications');

            if ($otherUsage + $newTarget > $maxApps) {
                return response()->json([
                    'message' => "Application limit exceeded. You can only have {$maxApps} active applications in total.",
                    'errors' => [
                        'target_applications' => ["Total limit of {$maxApps} exceeded. Other active tasks: {$otherUsage}. Requested: {$newTarget}."]
                    ]
                ], 422);
            }
        }

        $distribution = $this->distributionService->updateDistribution(
            $id,
            $request->user()->id,
            DistributionData::fromArray($merged)
        );

        if (!$distribution) {
            return response()->json(['message' => 'Not found'], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Distribution updated',
            'distribution' => new DistributionResource($distribution),
        ]);
    }

    /**
     * Remove the specified distribution.
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        $deleted = $this->distributionService->deleteDistribution($id, $request->user()->id);

        if (!$deleted) {
            return response()->json(['message' => 'Not found'], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Distribution deleted',
        ]);
    }
}
