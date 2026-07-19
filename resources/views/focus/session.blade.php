<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-zinc-100 leading-tight">
            {{ __('Sessão de Foco') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-4xl mx-auto sm:px-6 lg:px-8 text-center">
            
            <h1 class="text-6xl font-bold mb-8 text-zinc-100" id="timer-display">
                {{ sprintf('%02d:00', $focusSession->duration) }}
            </h1>
            
            <p class="text-zinc-400 mb-8" id="status-text">Mantenha o foco. Não minimize ou mude de aba!</p>

            <form method="POST" action="{{ route('sessions.fail') }}" id="fail-form" class="hidden">
                @csrf
            </form>

            <form method="POST" action="{{ route('sessions.complete') }}" id="complete-form" class="hidden">
                @csrf
                <button type="submit" class="bg-zinc-100 text-black font-bold py-3 px-6 rounded-lg text-xl hover:bg-zinc-300 transition">
                    Finalizar Sessão
                </button>
            </form>

        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            let durationSeconds = {{ $focusSession->duration }} * 60;
            const timerDisplay = document.getElementById('timer-display');
            const completeForm = document.getElementById('complete-form');
            const failForm = document.getElementById('fail-form');
            const statusText = document.getElementById('status-text');
            
            let hasFailed = false;

            // Timer Logic
            const interval = setInterval(function() {
                if (hasFailed) {
                    clearInterval(interval);
                    return;
                }

                durationSeconds--;
                
                const minutes = Math.floor(durationSeconds / 60);
                const seconds = durationSeconds % 60;
                timerDisplay.textContent = 
                    String(minutes).padStart(2, '0') + ':' + 
                    String(seconds).padStart(2, '0');

                if (durationSeconds <= 0) {
                    clearInterval(interval);
                    completeForm.classList.remove('hidden');
                    statusText.textContent = "Tempo esgotado! Você pode finalizar a sessão.";
                }
            }, 1000);

            // Visibility Logic
            document.addEventListener("visibilitychange", function() {
                if (document.hidden && durationSeconds > 0) {
                    hasFailed = true;
                    clearInterval(interval);
                    // Dispara falha
                    failForm.submit();
                }
            });
        });
    </script>
</x-app-layout>
