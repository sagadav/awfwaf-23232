<template>
  <div class="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1 min-w-0">
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <span 
            :class="statusClasses"
            class="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap"
          >
            {{ statusText }}
          </span>
          <span class="text-[11px] sm:text-sm text-gray-400">
            {{ formatDate(props.distribution.created_at) }}
          </span>
        </div>
        <div class="text-xs sm:text-sm text-gray-600 truncate pr-2">
          <span class="font-medium">Резюме:</span> 
          <a :href="props.distribution.resume_link" target="_blank" class="text-brand-primary hover:underline ml-1">
            {{ props.distribution.resume_link }}
          </a>
        </div>
        <div v-if="props.distribution.search_filters?.query" class="text-xs sm:text-sm text-gray-500 mt-1 truncate pr-2">
          <span class="font-medium text-gray-600">Поиск:</span> {{ props.distribution.search_filters.query }}
        </div>
        <div v-if="props.distribution.cover_letter" class="text-[11px] sm:text-sm text-gray-500 mt-1.5 flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Письмо прикреплено
        </div>
      </div>
      
      <div class="relative group">
        <button class="text-gray-400 hover:text-gray-600 p-1">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
        
        <div class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 hidden group-focus-within:block z-10">
          <button 
            @click="$emit('edit', props.distribution)"
            class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
          >
            Изменить
          </button>
          <button 
            @click="$emit('toggle-status', props.distribution)"
            class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            {{ props.distribution.status === 'active' ? 'Пауза' : 'Запустить' }}
          </button>
          <div class="border-t border-gray-100 my-1"></div>
          <button 
            @click="$emit('delete', props.distribution.id)"
            class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
      <div class="bg-gray-50/50 p-2.5 rounded-xl">
        <p class="text-[10px] sm:text-xs text-gray-400 mb-0.5 uppercase tracking-wider font-bold">Цель</p>
        <p class="text-base sm:text-lg font-bold text-gray-900 leading-none">{{ props.distribution.target_applications }}</p>
      </div>
      <div class="bg-gray-50/50 p-2.5 rounded-xl">
        <p class="text-[10px] sm:text-xs text-gray-400 mb-0.5 uppercase tracking-wider font-bold">Отклики</p>
        <p class="text-base sm:text-lg font-bold text-gray-900 leading-none">{{ props.distribution.applications_sent }}</p>
      </div>
      <div class="bg-gray-50/50 p-2.5 rounded-xl">
        <p class="text-[10px] sm:text-xs text-gray-400 mb-0.5 uppercase tracking-wider font-bold">Просмотры</p>
        <p class="text-base sm:text-lg font-bold text-gray-900 leading-none">{{ props.distribution.views_count }}</p>
      </div>
      <div class="bg-gray-50/50 p-2.5 rounded-xl">
        <p class="text-[10px] sm:text-xs text-gray-400 mb-0.5 uppercase tracking-wider font-bold">Ответы</p>
        <p class="text-base sm:text-lg font-bold text-gray-900 leading-none">{{ props.distribution.responses_count }}</p>
      </div>
    </div>

    <div class="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
      <div 
        class="bg-brand-primary h-1.5 sm:h-2 rounded-full transition-all"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Distribution } from '~/composables/useDistributions'

const props = defineProps<{
  distribution: Distribution
}>()

defineEmits(['edit', 'delete', 'toggle-status'])

const progress = computed(() => {
  if (props.distribution.target_applications === 0) return 0
  return Math.min(100, (props.distribution.applications_sent / props.distribution.target_applications) * 100)
})

const statusText = computed(() => {
  const map: Record<string, string> = {
    active: 'Активна',
    paused: 'Пауза',
    completed: 'Завершена',
    failed: 'Ошибка'
  }
  return map[props.distribution.status] || props.distribution.status
})

const statusClasses = computed(() => {
  const map: Record<string, string> = {
    active: 'bg-green-100 text-green-700',
    paused: 'bg-yellow-100 text-yellow-700',
    completed: 'bg-gray-100 text-gray-700',
    failed: 'bg-red-100 text-red-700'
  }
  return map[props.distribution.status] || 'bg-gray-100 text-gray-700'
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>
