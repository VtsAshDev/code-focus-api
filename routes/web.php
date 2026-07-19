<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

use App\Http\Controllers\FocusSessionController;

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/logs', [FocusSessionController::class, 'index'])->name('logs');

    // Fallback if user refreshes the page on the active session URL
    Route::get('/sessions/start', function () {
        return redirect()->route('dashboard');
    });
    Route::post('/sessions/start', [FocusSessionController::class, 'start'])->name('sessions.start');
    Route::post('/sessions/complete', [FocusSessionController::class, 'complete'])->name('sessions.complete');
    Route::post('/sessions/fail', [FocusSessionController::class, 'fail'])->name('sessions.fail');
    Route::get('/sessions/failed', [FocusSessionController::class, 'failedScreen'])->name('sessions.failed_screen');
});

require __DIR__.'/auth.php';
