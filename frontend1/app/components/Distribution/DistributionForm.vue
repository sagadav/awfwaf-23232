<template>
  <div v-if="props.isOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50 overflow-y-auto transition-all">
    <div class="bg-white rounded-t-3xl sm:rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative animate-in slide-in-from-bottom duration-300 sm:animate-in sm:zoom-in-95 sm:duration-200">
      <div class="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 sm:hidden"></div>
      <h2 class="text-xl sm:text-2xl font-bold mb-6 text-gray-900">{{ props.distribution ? 'Редактировать' : 'Новая рассылка' }}</h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Резюме с HeadHunter</label>
          <p v-if="hhLoading" class="text-xs text-gray-500 mb-2">Загружаем ваши резюме…</p>
          <p v-else-if="hhError" class="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-2">
            {{ hhError }}
          </p>
          <select
            v-model="form.resume_hash"
            class="w-full px-4 py-2 bg-gray-50/50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all mb-2"
            :disabled="hhLoading || !hhResumes.length"
          >
            <option value="">{{ hhResumes.length ? '— Выберите из списка —' : 'Список недоступен' }}</option>
            <option v-for="r in hhResumes" :key="r.hash" :value="r.hash">
              {{ r.title }}
            </option>
          </select>
          <p class="text-xs text-gray-500 mb-1">Дополнительно: ссылка (если не хотите пользоваться списком)</p>
          <input
            v-model="form.resume_link"
            type="url"
            placeholder="https://hh.ru/resume/..."
            class="w-full px-4 py-2 bg-gray-50/50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all"
          />
          <p class="text-xs text-gray-400 mt-1">Нужно выбрать резюме в списке или указать ссылку.</p>
          <p v-if="resumeChoiceError" class="text-sm text-red-600 mt-2">{{ resumeChoiceError }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Поисковый запрос</label>
          <input 
            v-model="form.query"
            type="text"
            required
            placeholder="например, Frontend Developer"
            class="w-full px-4 py-2 bg-gray-50/50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Количество откликов (цель)
            <span class="text-xs font-normal text-gray-500 ml-1">(макс. {{ maxApplications }})</span>
          </label>
          <input 
            v-model.number="form.target_applications"
            type="number"
            min="1"
            :max="maxApplications"
            required
            class="w-full px-4 py-2 bg-gray-50/50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Дневной лимит</label>
            <input 
              v-model.number="form.daily_limit"
              type="number"
              min="1"
              :max="maxApplications"
              class="w-full px-4 py-2 bg-gray-50/50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Статус</label>
            <select 
              v-model="form.status"
              class="w-full px-4 py-2 bg-gray-50/50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all"
            >
              <option value="active">Активна</option>
              <option value="paused">Пауза</option>
            </select>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Сопроводительное письмо</label>
          <textarea 
            v-model="form.cover_letter"
            rows="4"
            placeholder="Ваше сопроводительное письмо..."
            class="w-full px-4 py-2 bg-gray-50/50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all resize-none"
          ></textarea>
        </div>

        <div v-if="props.formError" class="text-sm text-red-600 bg-red-50 p-3 rounded-xl">
          {{ props.formError }}
        </div>

        <div class="flex gap-3 pt-4">
          <button 
            type="button"
            @click="$emit('close')"
            class="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
          >
            Отмена
          </button>
          <button 
            type="submit"
            :disabled="props.loading"
            class="flex-1 py-3 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-green-100 disabled:opacity-50"
          >
            {{ props.loading ? 'Сохранение...' : (props.distribution ? 'Обновить' : 'Создать') }}
          </button>
        </div>
      </form>

      <button 
        @click="$emit('close')"
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 sm:p-0"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, computed } from 'vue'
import type { Distribution } from '~/composables/useDistributions'
import { useHhResumes } from '~/composables/useHhResumes'

const props = defineProps<{
  distribution: Distribution | null
  user: { id: number; tier: string } | null
  isOpen: boolean
  loading: boolean
  formError: string | null
}>()

const emit = defineEmits(['close', 'save'])

const { resumes: hhResumes, loading: hhLoading, error: hhError, fetchResumes } = useHhResumes()

const resumeChoiceError = ref('')

const form = reactive({
  resume_hash: '',
  resume_title: '' as string,
  resume_link: '',
  query: '',
  target_applications: 40,
  daily_limit: 10,
  status: 'active',
  cover_letter: ''
})

const maxApplications = computed(() => {
  return props.user?.tier === 'pro' ? 200 : 40
})

watch(() => props.distribution, (newVal) => {
  if (newVal) {
    form.resume_hash = newVal.resume_hash || ''
    form.resume_title = newVal.resume_title || ''
    form.resume_link = newVal.resume_link || ''
    form.query = newVal.search_filters?.query || ''
    form.target_applications = newVal.target_applications
    form.daily_limit = newVal.daily_limit || 10
    form.status = newVal.status
    form.cover_letter = newVal.cover_letter || ''
  } else {
    form.resume_hash = ''
    form.resume_title = ''
    form.resume_link = ''
    form.query = ''
    form.target_applications = 40
    form.daily_limit = 10
    form.status = 'active'
    form.cover_letter = ''
  }
}, { immediate: true })

watch(
  () => form.resume_hash,
  (hash) => {
    if (!hash) {
      form.resume_title = ''
      return
    }
    const item = hhResumes.value.find((r) => r.hash === hash)
    form.resume_title = item?.title || ''
  }
)

watch(hhResumes, () => {
  if (!form.resume_hash) return
  const item = hhResumes.value.find((r) => r.hash === form.resume_hash)
  if (item) {
    form.resume_title = item.title
  } else if (props.distribution?.resume_title) {
    form.resume_title = props.distribution.resume_title
  }
})

watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      resumeChoiceError.value = ''
      fetchResumes()
    }
  }
)

const handleSubmit = () => {
  resumeChoiceError.value = ''
  const link = form.resume_link.trim()
  if (!form.resume_hash && !link) {
    resumeChoiceError.value = 'Выберите резюме из списка или вставьте ссылку на hh.ru.'
    return
  }

  const payload: Record<string, unknown> = {
    search_filters: { query: form.query },
    target_applications: form.target_applications,
    daily_limit: form.daily_limit,
    status: form.status,
    cover_letter: form.cover_letter
  }
  if (form.resume_hash) {
    payload.resume_hash = form.resume_hash
    if (form.resume_title) {
      payload.resume_title = form.resume_title
    }
  }
  if (link) {
    payload.resume_link = link
  }
  emit('save', payload)
}
</script>
