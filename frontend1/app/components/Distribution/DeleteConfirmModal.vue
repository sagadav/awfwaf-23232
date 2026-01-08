<template>
  <div v-if="props.isOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50 transition-all">
    <div class="bg-white rounded-t-3xl sm:rounded-2xl p-6 sm:p-8 w-full max-w-sm shadow-2xl animate-in slide-in-from-bottom duration-300 sm:animate-in sm:zoom-in-95 sm:duration-200">
      <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </div>
      
      <h3 class="text-xl font-bold text-gray-900 text-center mb-2">Удалить рассылку</h3>
      <p class="text-gray-600 text-center mb-6">Вы уверены, что хотите удалить эту рассылку? Это действие нельзя будет отменить.</p>
      
      <div class="flex gap-3">
        <button 
          @click="$emit('close')"
          class="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
        >
          Отмена
        </button>
        <button 
          @click="$emit('confirm')"
          :disabled="props.loading"
          class="flex-1 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all disabled:opacity-50"
        >
          {{ props.loading ? 'Удаление...' : 'Удалить' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
  loading: boolean
}>()

defineEmits(['close', 'confirm'])
</script>
