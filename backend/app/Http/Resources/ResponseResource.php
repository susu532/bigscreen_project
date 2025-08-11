<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * ResponseResource
 * 
 * Transforms Response model for API responses
 */
class ResponseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'token' => $this->token,
            'email' => $this->email,
            'submitted_at' => $this->created_at?->toISOString(),
            'formatted_date' => $this->created_at?->format('F j, Y g:i A'),
            'answers' => AnswerResource::collection($this->whenLoaded('answers')),
            'response_url' => $this->getResponseUrl(),
        ];
    }
}