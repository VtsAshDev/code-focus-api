<?php

namespace App\Models;

use Database\Factories\FocusSessionFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class FocusSession extends Model
{
    /** @use HasFactory<FocusSessionFactory> */
    use HasFactory;

    protected $fillable = [
        'status',
        'duration',
        'id',
        'started_at',
    ];

    public function focusSessions(): HasOne
    {
        return $this->hasOne(User::class);
    }
}
