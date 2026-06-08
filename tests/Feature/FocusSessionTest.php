<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;

uses(RefreshDatabase::class);

it('can start a focus session', function () {
    $user = User::factory()->create();
    $sessionId = Str::uuid()->toString();

    $response = actingAs($user)->postJson('/api/sessions/start', [
        'id' => $sessionId,
        'duration' => 25,
    ]);

    $response->assertStatus(201)
        ->assertJson([
            'id' => $sessionId,
            'duration' => 25,
            'status' => 'in_progress',
        ]);

    assertDatabaseHas('focus_sessions', [
        'id' => $sessionId,
        'user_id' => $user->id,
        'duration' => 25,
        'status' => 'in_progress',
    ]);
});
