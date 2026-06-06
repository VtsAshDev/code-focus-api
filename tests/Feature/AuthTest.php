<?php

use App\Models\User;
use Laravel\Sanctum\Sanctum;

test('deve registrar um novo usuario com sucesso', function () {
    $response = $this->postJson('/api/register', [
        'name' => 'App User',
        'email' => 'teste@app.com',
        'password' => 'password123',
    ]);

    $response->assertStatus(201)
        ->assertJsonStructure([
            'user' => ['id', 'name', 'email', 'created_at', 'updated_at'],
            'access_token',
            'token_type',
        ]);

    $this->assertDatabaseHas('users', [
        'email' => 'teste@app.com',
    ]);
});

test('deve fazer login com credenciais validas', function () {
    $user = User::factory()->create([
        'password' => 'password123',
    ]);

    $response = $this->postJson('/api/login', [
        'email' => $user->email,
        'password' => 'password123',
    ]);

    $response->assertStatus(200)
        ->assertJsonStructure([
            'user',
            'access_token',
            'token_type',
        ]);
});

test('nao deve fazer login com senha incorreta', function () {
    $user = User::factory()->create();

    $response = $this->postJson('/api/login', [
        'email' => $user->email,
        'password' => 'senha_errada',
    ]);

    $response->assertStatus(422);
});

test('deve fazer logout e invalidar o token', function () {
    $user = User::factory()->create();

    Sanctum::actingAs($user);

    $response = $this->postJson('/api/logout');

    $response->assertStatus(200)
        ->assertJson([
            'message' => 'Sessão encerrada com sucesso.',
        ]);

    $this->assertDatabaseCount('personal_access_tokens', 0);
});
