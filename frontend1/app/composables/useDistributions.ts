import { ref } from 'vue'

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
  const error = ref<string | null>(null);
  const user = ref<{ id: number; tier: string } | null>(null);
  
  const config = useRuntimeConfig();
  const API_BASE = config.public.apiBase || '/api';

  const fetchDistributions = async () => {
    loading.value = true;
    error.value = null;
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${API_BASE}/distributions`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          navigateTo('/signin');
          return;
        }
        throw new Error('Failed to fetch distributions');
      }

      const data = await response.json();
      distributions.value = data.data; // Adjusted for JSON Resource wrapper
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${API_BASE}/user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });
      if (response.ok) {
        user.value = await response.json();
      }
    } catch (err) {
      console.error('Failed to fetch user profile', err);
    }
  };

  const createDistribution = async (data: Partial<Distribution>) => {
    loading.value = true;
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${API_BASE}/distributions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to create distribution');
      
      await fetchDistributions();
      return true;
    } catch (err: any) {
      error.value = err.message;
      return false;
    } finally {
      loading.value = false;
    }
  };

  const updateDistribution = async (id: number, data: Partial<Distribution>) => {
    loading.value = true;
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${API_BASE}/distributions/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update distribution');
      
      await fetchDistributions();
      return true;
    } catch (err: any) {
      error.value = err.message;
      return false;
    } finally {
      loading.value = false;
    }
  };

  const deleteDistribution = async (id: number) => {
    loading.value = true;
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${API_BASE}/distributions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to delete distribution');
      
      distributions.value = distributions.value.filter(d => d.id !== id);
      return true;
    } catch (err: any) {
      error.value = err.message;
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    distributions,
    loading,
    error,
    user,
    fetchDistributions,
    fetchUserProfile,
    createDistribution,
    updateDistribution,
    deleteDistribution,
  };
};
