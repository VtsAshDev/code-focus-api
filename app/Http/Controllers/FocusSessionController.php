<?php

namespace App\Http\Controllers;

use App\Models\FocusSession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FocusSessionController extends Controller
{
    /**
     * Display the user's historical logs.
     */
    public function index(Request $request)
    {
        $sessions = $request->user()->focusSessions()->latest()->get();

        // Calculate basic stats
        $totalSessions = $sessions->count();
        $successfulSessions = $sessions->where('status', 'completed')->count();
        $successRate = $totalSessions > 0 ? round(($successfulSessions / $totalSessions) * 100, 1) : 0;

        $totalDurationMinutes = $sessions->where('status', 'completed')->sum('duration');
        $totalHours = round($totalDurationMinutes / 60, 1);

        return Inertia::render('Focus/Logs', [
            'sessions' => $sessions,
            'stats' => [
                'successRate' => $successRate,
                'totalHours' => $totalHours,
            ],
        ]);
    }

    public function start(Request $request)
    {
        $request->validate([
            'duration' => 'required|integer|min:1',
        ]);

        $session = FocusSession::create([
            'user_id' => $request->user()->id,
            'duration' => $request->duration,
            'status' => 'active',
            'started_at' => now(),
        ]);

        return Inertia::render('Focus/Session', [
            'focusSession' => $session,
        ]);
    }

    public function complete(Request $request)
    {
        $session = FocusSession::where('user_id', $request->user()->id)
            ->where('status', 'active')
            ->latest('started_at')
            ->firstOrFail();

        $session->update([
            'status' => 'completed',
            'completed_at' => now(),
        ]);

        return redirect()->route('dashboard')->with('status', 'session-completed');
    }

    public function fail(Request $request)
    {
        $session = FocusSession::where('user_id', $request->user()->id)
            ->where('status', 'active')
            ->latest('started_at')
            ->firstOrFail();

        $session->update([
            'status' => 'failed',
            'completed_at' => now(),
        ]);

        return redirect()->route('sessions.failed_screen');
    }

    public function failedScreen()
    {
        return Inertia::render('Focus/Failed');
    }
}
