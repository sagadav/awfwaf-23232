import { ref } from 'vue'

export interface HhResumeItem {
  hash: string
  title: string
  url: string
}

export function useHhResumes() {
  const resumes = ref<HhResumeItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const authFetch = useAuthApiFetch()

  const fetchResumes = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await authFetch('/hh/resumes')
      const body = await response.json().catch(() => ({}))
      if (!response.ok) {
        error.value =
          typeof body.message === 'string'
            ? body.message
            : 'Не удалось загрузить список резюме'
        resumes.value = []
        return
      }
      resumes.value = Array.isArray(body.data) ? body.data : []
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e)
      resumes.value = []
    } finally {
      loading.value = false
    }
  }

  return { resumes, loading, error, fetchResumes }
}
