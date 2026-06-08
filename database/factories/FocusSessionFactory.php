<?php

namespace Database\Factories;

use App\Models\FocusSession;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends Factory<FocusSession>
 */
class FocusSessionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startedAt = Carbon::instance($this->faker->dateTimeBetween('-1 month', 'now'));
        $duration = $this->faker->randomElement([5, 10, 15, 20, 30]);
        $status = $this->faker->randomElement(['completed', 'fail', 'active']);

        return [
            'id' => $this->faker->uuid(),
            'user_id' => User::factory(),
            'duration' => $duration,
            'status' => $status,
            'started_at' => $startedAt,
            'completed_at' => (clone $startedAt)->addMinutes($duration),
            'failed_at' => null,
        ];
    }

    public function failed(): Factory
    {
        return $this->state(function (array $attributes) {
            $minutesToFail = rand(1, max(1, $attributes['duration'] - 1));

            return [
                'status' => 'failed',
                'completed_at' => null,
                'failed_at' => Carbon::parse($attributes['started_at'])->addMinutes($minutesToFail),
            ];
        });
    }

    public function inProgress(): Factory
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'in_progress',
            'completed_at' => null,
            'failed_at' => null,
        ]);
    }
}
