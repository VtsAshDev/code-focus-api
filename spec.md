## 1. Visão Geral da Nova Arquitetura

O **codeFocus** agora é uma aplicação web monolítica (com potencial para PWA). O backend em Laravel servirá diretamente as views do frontend através do Inertia.js, eliminando a necessidade de uma API REST separada e do gerenciamento de tokens no cliente.

### Stack Atualizada

* **Framework:** Laravel
* **Frontend:** Blade
* **Estilização:** Tailwind CSS
* **Autenticação:** Laravel Breeze (Sessão nativa, substitui o Sanctum/Tokens)
* **Banco de Dados:** PostgreSQL
* **Tema Visual:** OLED Black (`#000000`)

---

## 2. Adaptação de Mecânicas (Mobile para Web)

Como o aplicativo não será mais nativo (Expo), as regras de negócio core precisam ser adaptadas para o ambiente do navegador:

### 2.1 Falha Automática (Monitoramento de Abandono)

Em vez de usar a API `AppState` do React Native, o frontend deve escutar o evento `visibilitychange` do navegador.

* Se a aba perder o foco ou o navegador for minimizado (`document.hidden === true`), a sessão falha imediatamente.
* O frontend deve disparar uma requisição de falha para o backend no momento em que isso ocorrer.

### 2.2 Proteção contra Recarregamento

Se o usuário recarregar a página (F5) durante uma sessão ativa, o backend deve tratar isso como abandono e marcar a sessão como falha (ou o frontend deve interceptar o descarregamento da página).

### 2.3 Substituição do Secure Storage

Com o frontend acoplado ao Laravel, a autenticação passa a usar cookies de sessão `HttpOnly`. O agente não precisará implementar armazenamento de tokens JWT/Sanctum no cliente.

---

## 3. Estrutura de Rotas (routes/web.php)

O agente deve focar em criar rotas web tradicionais retornando componentes Inertia.

**Autenticação:**

* `GET /login` → Exibe tela de login
* `POST /login` → Processa login
* `GET /register` → Exibe tela de cadastro
* `POST /register` → Processa cadastro
* `POST /logout` → Encerra sessão

**Área Autenticada (Middleware auth):**

* `GET /dashboard` → Tela principal (pontuação atual e botão de iniciar foco)
* `POST /sessions/start` → Inicia a contagem no banco e retorna a view do Timer
* `POST /sessions/complete` → Valida a conclusão, atribui pontos e redireciona ao dashboard
* `POST /sessions/fail` → Marca a sessão como falha e redireciona ao dashboard com feedback negativo

---

## 4. Instruções de Implementação para o Agente (Antigravity)

Ao executar as tarefas, o agente deve seguir o fluxo abaixo:

### Passo 1: Setup do Ecossistema Frontend

O agente deve instalar e configurar o Laravel Breeze utilizando a stack React.

```bash
composer require laravel/breeze --dev
php artisan breeze:install react
npm install

```

### Passo 2: Configuração do Tailwind CSS

O arquivo de configuração do Tailwind deve forçar o background global para OLED Black e o texto para tons claros.

```javascript
import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    theme: {
        extend: {
            colors: {
                black: '#000000',
                zinc: {
                    900: '#18181b',
                    800: '#27272a',
                    100: '#f4f4f5',
                },
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [forms],
};

```

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
    body {
        @apply bg-black text-zinc-100 antialiased;
    }
}

```

### Passo 3: O Componente de Timer (Lógica Principal)

O agente deve criar um componente React (`resources/js/Pages/Focus/Session.jsx`) que possua a seguinte lógica estrita:

1. Inicia um contador regressivo visual a partir da `duration` passada pelo backend.
2. Registra um `EventListener` para `visibilitychange`.
3. Se `document.visibilityState === 'hidden'`, executa um `router.post('/sessions/fail')`.
4. Oculta botões de navegação lateral ou superior para manter a imersão.
5. Ao término do contador, exibe o botão para invocar `router.post('/sessions/complete')`.

### Passo 4: Controladores e Validação

O `FocusSessionController` deve garantir que o tempo `completed_at` recebido tenha a diferença correta em relação ao `started_at`. O tempo de validação continua ocorrendo estritamente no backend.

```php
namespace App\Http\Controllers;

use App\Models\FocusSession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FocusSessionController extends Controller
{
    public function start(Request $request)
    {
        $request->validate([
            'duration' => 'required|integer|min:1'
        ]);

        $session = FocusSession::create([
            'user_id' => $request->user()->id,
            'duration' => $request->duration,
            'status' => 'active',
            'started_at' => now(),
        ]);

        return Inertia::render('Focus/Session', [
            'focusSession' => $session
        ]);
    }
}

```

---

**Como usar isso:** Basta copiar o texto acima e entregar ao antigravity com o comando de inicializar a construção do frontend dentro do projeto Laravel. As restrições de comentários no código gerado já foram aplicadas nos blocos acima.