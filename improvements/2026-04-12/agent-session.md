
Ниже — ответ по пунктам. Изменения уже лежат в рабочей копии репозитория (`frontend1`).

---

## 1. Стек и назначение

**Backend** (`backend/`): Laravel (PHP) — API в `routes/api.php`, Sanctum (`auth:sanctum`), модель `ResumeDistribution`, слой `app/Distributions/` (контроллер, сервис, репозиторий, DTO, Resource), очередь `ProcessDistribution`. Назначение: учётные записи, токены, CRUD «рассылок» откликов на вакансии (лимиты по тарифу `User::getMaxApplications()`, фильтры поиска, сопроводительное письмо и т.д.).

**Frontend** (`frontend1/`): Nuxt 4, Vue 3, PrimeVue (тема Aura), Tailwind, `driver.js` (онбординг). Страницы `signin.vue` (вход через сценарий HH), `dashboard.vue` (рассылки, тарифы). Запросы к API через `useAuthApiFetch` + `useDistributions`, база URL — `runtimeConfig.public.apiBase` / прокси `/api`.

**Прочее**: Vite-артефакты в `backend` для классического Laravel-фронта; основной UI — отдельное Nuxt-приложение.

---

## 2. Конкретные улучшения (3–7)

1. **`useAuthApiFetch.ts` / SSR**: прямой `localStorage` без проверки клиента — при вызове на сервере возможен краш; стоит читать токен только в `import.meta.client` или через cookie/session.
2. **Ошибки API**: до правок при 422/404 пользователь видел общие строки вроде «Failed to create»; Laravel уже отдаёт `message` и `errors` из `DistributionController.php` — их нужно показывать (сделано).
3. **`nuxt typecheck`**: падает на `process` в `nuxt.config.ts` без `@types/node` / `types: ["node"]` — мешает CI и DX.
4. **Тесты**: в backend почти только `ExampleTest`; нет Feature-тестов на `/api/distributions` и лимиты — регрессии по бизнес-правилам не ловятся.
5. **Безопасность / секреты**: в git status был `cookies.json` (удалён) — важно держать пример (`cookies.example.json`) и не коммитить реальные куки; проверить `.gitignore`.
6. **Конфиг**: в `nuxt.config.ts` `apiBase` по умолчанию `''`, в коде подставляется `/api` — лучше явно задать дефолт в конфиге и документировать `NUXT_PUBLIC_API_BASE` в одном месте.
7. **i18n UX**: сообщения об ошибках с API частично на английском (Laravel) — при желании маппить коды/ключи на русский на фронте.

---

## 3. Выбор одного улучшения и одной фичи

- **Улучшение**: разбор тела JSON-ошибок Laravel и вывод в `formError` / `listError` (`parseLaravelApiError` + правки в `useDistributions.ts`). Это напрямую бьёт в UX при лимитах откликов и валидации (`DistributionController` уже отдаёт осмысленные `message`/`errors`).
- **Фича**: при **401** очищать `auth_token` перед редиректом на `/signin` (`useAuthApiFetch.ts`). Иначе клиент остаётся с протухшим токеном, что ухудшает повторный вход и отладку; поведение согласуется с `handleLogout` в `dashboard.vue`, где токен тоже снимается.

Объём небольшой (один утилитный файл + два composable), эффект заметен сразу в UI и при истечении сессии.

---

## 4. Файлы и содержимое

| Действие |
|----------|
| **Создать** `frontend1/app/utils/parseLaravelApiError.ts` |
| **Изменить** `frontend1/app/composables/useAuthApiFetch.ts` |
| **Изменить** `frontend1/app/composables/useDistributions.ts` |

**Команды**: не требуются (зависимости не добавлялись).

```typescript
// frontend1/app/utils/parseLaravelApiError.ts
/**
 * Текст ошибки из JSON-ответа Laravel (validation, abort(422), 404 message и т.д.).
 */
export async function parseLaravelApiError(
  response: Response,
  fallback: string
): Promise<string> {
  let raw: string;
  try {
    raw = await response.text();
  } catch {
    return fallback;
  }

  if (!raw?.trim()) {
    return fallback;
  }

  try {
    const data = JSON.parse(raw) as Record<string, unknown>;
    const parts: string[] = [];

    const errors = data.errors;
    if (errors && typeof errors === 'object' && !Array.isArray(errors)) {
      for (const msgs of Object.values(errors)) {
        if (Array.isArray(msgs)) {
          for (const m of msgs) {
            if (typeof m === 'string' && m.trim()) {
              parts.push(m.trim());
            }
          }
        } else if (typeof msgs === 'string' && msgs.trim()) {
          parts.push(msgs.trim());
        }
      }
    }

    const msg = typeof data.message === 'string' ? data.message.trim() : '';
    const genericValidation = /^The given data was invalid\.?$/i.test(msg);

    const out: string[] = [];
    if (msg && !genericValidation) {
      out.push(msg);
    }
    for (const p of parts) {
      if (!out.includes(p)) {
        out.push(p);
      }
    }

    if (out.length) {
      return out.join(' ');
    }
    if (msg) {
      return msg;
    }
  } catch {
    /* не JSON */
  }

  return fallback;
}
```

```typescript
// frontend1/app/composables/useAuthApiFetch.ts
/**
 * Запросы к бэкенду с Bearer-токеном из localStorage.
 * База URL берётся из runtimeConfig.public.apiBase (по умолчанию /api).
 * При ответе 401 выполняется переход на /signin (как в useDistributions).
 */
export function useAuthApiFetch() {
  const config = useRuntimeConfig();
  const base = (config.public.apiBase || '/api').replace(/\/$/, '');

  return async function authFetch(path: string, init: RequestInit = {}): Promise<Response> {
    const url = path.startsWith('http')
      ? path
      : `${base}${path.startsWith('/') ? path : `/${path}`}`;

    const headers = new Headers(init.headers);
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    if (!headers.has('Accept')) {
      headers.set('Accept', 'application/json');
    }

    const response = await fetch(url, { ...init, headers });

    if (response.status === 401) {
      if (import.meta.client) {
        localStorage.removeItem('auth_token');
      }
      await navigateTo('/signin');
    }

    return response;
  };
}
```

```typescript
// frontend1/app/composables/useDistributions.ts
import { ref } from 'vue';
import { parseLaravelApiError } from '~/utils/parseLaravelApiError';

export interface Distribution {
  id: number;
  status: 'active' | 'paused' | 'completed' | 'failed';
  target_applications: number;
  applications_sent: number;
  search_filters: { query?: string } | null;
  excluded_companies: string[] | null;
  daily_limit: number | null;
  start_time: string | null;
  end_time: string | null;
  views_count: number;
  responses_count: number;
  last_sent_at: string | null;
  completed_at: string | null;
  resume_link: string;
  cover_letter?: string;
  vacancy_link: string | null;
  created_at: string;
}

export const useDistributions = () => {
  const distributions = ref<Distribution[]>([]);
  const loading = ref(false);
  /** Ошибки загрузки списка / удаления (баннер на странице) */
  const listError = ref<string | null>(null);
  /** Ошибки создания / обновления в модалке формы */
  const formError = ref<string | null>(null);
  const user = ref<{ id: number; tier: string } | null>(null);

  const clearFormError = () => {
    formError.value = null;
  };

  const authFetch = useAuthApiFetch();

  const fetchDistributions = async () => {
    loading.value = true;
    listError.value = null;
    try {
      const response = await authFetch('/distributions');

      if (!response.ok) {
        if (response.status === 401) {
          return;
        }
        const detail = await parseLaravelApiError(
          response,
          'Не удалось загрузить рассылки'
        );
        throw new Error(detail);
      }

      const data = await response.json();
      distributions.value = data.data; // Adjusted for JSON Resource wrapper
    } catch (err: unknown) {
      listError.value = err instanceof Error ? err.message : String(err);
    } finally {
      loading.value = false;
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await authFetch('/user');
      if (response.ok) {
        user.value = await response.json();
      }
    } catch (err) {
      console.error('Failed to fetch user profile', err);
    }
  };

  const createDistribution = async (data: Partial<Distribution>) => {
    loading.value = true;
    formError.value = null;
    try {
      const response = await authFetch('/distributions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status === 401) {
          return false;
        }
        const detail = await parseLaravelApiError(
          response,
          'Не удалось создать рассылку'
        );
        throw new Error(detail);
      }

      await fetchDistributions();
      return true;
    } catch (err: unknown) {
      formError.value = err instanceof Error ? err.message : String(err);
      return false;
    } finally {
      loading.value = false;
    }
  };

  const updateDistribution = async (
    id: number,
    data: Partial<Distribution>,
    opts?: { errorScope?: 'form' | 'list' }
  ) => {
    const scope = opts?.errorScope ?? 'form';
    loading.value = true;
    if (scope === 'form') formError.value = null;
    else listError.value = null;
    try {
      const response = await authFetch(`/distributions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status === 401) {
          return false;
        }
        const detail = await parseLaravelApiError(
          response,
          'Не удалось обновить рассылку'
        );
        throw new Error(detail);
      }

      await fetchDistributions();
      return true;
    } catch (err: unknown) {
      if (scope === 'form') formError.value = err instanceof Error ? err.message : String(err);
      else listError.value = err instanceof Error ? err.message : String(err);
      return false;
    } finally {
      loading.value = false;
    }
  };

  const deleteDistribution = async (id: number) => {
    loading.value = true;
    listError.value = null;
    try {
      const response = await authFetch(`/distributions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        if (response.status === 401) {
          return false;
        }
        const detail = await parseLaravelApiError(
          response,
          'Не удалось удалить рассылку'
        );
        throw new Error(detail);
      }

      distributions.value = distributions.value.filter(d => d.id !== id);
      return true;
    } catch (err: unknown) {
      listError.value = err instanceof Error ? err.message : String(err);
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    distributions,
    loading,
    listError,
    formError,
    clearFormError,
    user,
    fetchDistributions,
    fetchUserProfile,
    createDistribution,
    updateDistribution,
    deleteDistribution,
  };
};
```

---

## 5. Чеклист проверки

1. Поднять Laravel API и Nuxt (`frontend1`: `npm run dev`), залогиниться, открыть дашборд.
2. Создать рассылку с суммой целей выше лимита тарифа — в модалке должен появиться текст из ответа API (например, про `Application limit exceeded` и/или строка из `errors.target_applications`), а не только «Не удалось создать рассылку».
3. Отправить заведомо невалидный URL резюме — должно отобразиться сообщение валидации Laravel (поле `resume_link`).
4. В DevTools → Application → Local Storage удалить или испортить `auth_token`, обновить список рассылок или сохранить форму: редирект на `/signin`, в storage ключ `auth_token` отсутствует (после 401).
5. `npm run typecheck` в `frontend1` — убедиться, что новые файлы не добавляют ошибок (известные ошибки по `process` в `nuxt.config.ts` могут сохраняться до отдельного фикса).
