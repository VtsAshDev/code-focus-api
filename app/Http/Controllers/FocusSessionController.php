<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FocusSessionController extends Controller
{
    public function start(Request $request)
    {
        $validated = $request->validate([
            'id' => 'uuid|required',
            'duration' => 'integer|required',
        ]);

        $session = $request->user()->focusSessions()->create([
            'id' => $validated['id'],
            'duration' => $validated['duration'],
            'status' => 'in_progress',
            'started_at' => now(),
        ]);

        return response()->json($session, 201);
    }
}
