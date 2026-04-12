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
