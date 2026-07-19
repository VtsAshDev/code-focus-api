<?php

namespace Tests\Feature;

use App\Models\FocusSession;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FocusSessionTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_can_be_rendered(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertStatus(200);
    }

    public function test_logs_can_be_rendered(): void
    {
        $user = User::factory()->create();

        // Create a few sessions to ensure the view renders with data
        FocusSession::create([
            'user_id' => $user->id,
            'duration' => 25,
            'status' => 'completed',
            'started_at' => now()->subMinutes(25),
            'completed_at' => now(),
        ]);

        $response = $this->actingAs($user)->get('/logs');

        $response->assertStatus(200);
    }

    public function test_session_can_be_started(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/sessions/start', [
            'duration' => 25,
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('focus_sessions', [
            'user_id' => $user->id,
            'status' => 'active',
            'duration' => 25,
        ]);
    }

    public function test_session_can_be_completed(): void
    {
        $user = User::factory()->create();

        FocusSession::create([
            'user_id' => $user->id,
            'duration' => 25,
            'status' => 'active',
            'started_at' => now(),
        ]);

        $response = $this->actingAs($user)->post('/sessions/complete');

        $response->assertRedirect('/dashboard');

        $this->assertDatabaseHas('focus_sessions', [
            'user_id' => $user->id,
            'status' => 'completed',
        ]);
    }

    public function test_session_can_be_failed(): void
    {
        $user = User::factory()->create();

        FocusSession::create([
            'user_id' => $user->id,
            'duration' => 25,
            'status' => 'active',
            'started_at' => now(),
        ]);

        $response = $this->actingAs($user)->post('/sessions/fail');

        $response->assertRedirect('/sessions/failed');

        $this->assertDatabaseHas('focus_sessions', [
            'user_id' => $user->id,
            'status' => 'failed',
        ]);
    }

    public function test_failed_screen_can_be_rendered(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/sessions/failed');

        $response->assertStatus(200);
    }
}
