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
  resume_link: string | null;
  resume_hash?: string | null;
  resume_title?: string | null;
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
