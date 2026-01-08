<template>
  <div class="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 transition-all hover:border-brand-primary/20">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1 uppercase tracking-wider font-semibold">{{ label }}</p>
        <p class="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">{{ value }}</p>
      </div>
      <div :class="['w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-transform hover:scale-110', iconBg]">
        <svg :class="['w-5 h-5 sm:w-6 sm:h-6', iconColor]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="svgPath" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: number | string
  iconBg: string
  iconColor: string
  svgPath: string
}>()
</script>
