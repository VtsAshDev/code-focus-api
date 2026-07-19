<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-zinc-100 leading-tight">
            {{ __('Foco') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-zinc-900 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-zinc-100">
                    <h3 class="text-2xl font-bold mb-4">Iniciar Sessão de Foco</h3>
                    
                    @if(session('status') === 'session-completed')
                        <div class="mb-4 text-green-500 font-bold">
                            Sessão completada com sucesso! Pontos adquiridos.
                        </div>
                    @endif
                    
                    @if(session('error') === 'session-failed')
                        <div class="mb-4 text-red-500 font-bold">
                            Você perdeu o foco e a sessão falhou!
                        </div>
                    @endif

                    <form method="POST" action="{{ route('sessions.start') }}">
                        @csrf
                        <div class="mb-4">
                            <label for="duration" class="block text-sm font-medium text-zinc-300">Duração (minutos)</label>
                            <input type="number" id="duration" name="duration" min="1" value="25" required
                                class="mt-1 block w-full bg-black border-zinc-700 text-zinc-100 rounded-md shadow-sm focus:border-zinc-500 focus:ring-zinc-500">
                            <x-input-error :messages="$errors->get('duration')" class="mt-2" />
                        </div>
                        
                        <x-primary-button>
                            {{ __('Iniciar Foco') }}
                        </x-primary-button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
