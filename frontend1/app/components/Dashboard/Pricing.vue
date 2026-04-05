<template>
  <div class="py-4">
    <div class="text-center mb-10">
      <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl px-4">
        Выберите план подписки
      </h2>
      <p class="mt-4 text-xl text-gray-600 max-w-2xl mx-auto px-4">
        Автоматизируйте поиск работы и получайте больше приглашений каждый день
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4">
      <!-- 7 Days Plan -->
      <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative overflow-hidden">
        <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg class="w-20 h-20 text-brand-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        
        <div class="mb-8">
          <h3 class="text-xl font-bold text-gray-900 mb-2">7 Дней</h3>
          <p class="text-gray-500 mb-4">Для быстрого старта и теста</p>
          <div class="flex items-baseline gap-1">
            <span class="text-4xl font-extrabold text-gray-900">1 000</span>
            <span class="text-gray-500 font-medium">₽</span>
          </div>
        </div>

        <ul class="space-y-4 mb-10 flex-grow">
          <li v-for="feature in ['До 2100 откликов за неделю', 'Умная фильтрация вакансий', 'Сопроводительные письма', 'Поддержка в чате']" :key="feature" class="flex items-center gap-3 text-gray-600">
            <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ feature }}
          </li>
        </ul>

        <a 
          href="https://t.me/artursagadav" 
          target="_blank"
          class="w-full py-4 px-6 text-center font-bold text-brand-primary bg-green-50 rounded-2xl hover:bg-green-100 transition-colors border-2 border-green-100"
        >
          Выбрать 7 дней
        </a>
      </div>

      <!-- 14 Days Plan (Best Value) -->
      <div class="bg-white rounded-3xl p-8 border-2 border-brand-primary shadow-xl shadow-green-100 flex flex-col relative transform hover:scale-[1.02] transition-all duration-300">
        <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-primary text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
          ВЫГОДНО
        </div>
        
        <div class="mb-8">
          <h3 class="text-xl font-bold text-gray-900 mb-2">14 Дней</h3>
          <p class="text-gray-500 mb-4">Максимальный охват и результат</p>
          <div class="flex items-baseline gap-1">
            <span class="text-4xl font-extrabold text-gray-900">1 600</span>
            <span class="text-gray-500 font-medium">₽</span>
          </div>
        </div>

        <ul class="space-y-4 mb-10 flex-grow">
          <li v-for="feature in ['До 4500 откликов за 2 недели', 'Умная фильтрация вакансий', 'Сопроводительные письма', 'Приоритетная поддержка', 'Максимальная эффективность']" :key="feature" class="flex items-center gap-3 text-gray-800 font-medium">
            <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ feature }}
          </li>
        </ul>

        <a 
          href="https://t.me/artursagadav" 
          target="_blank"
          class="w-full py-4 px-6 text-center font-bold text-white bg-brand-primary rounded-2xl hover:bg-brand-primary/95 transition-all shadow-lg shadow-green-200"
        >
          Выбрать 14 дней
        </a>
      </div>
    </div>
    
    <div class="mt-12 text-center p-6 bg-white rounded-3xl border border-dashed border-gray-200 max-w-4xl mx-auto">
      <p class="text-gray-600">
        Есть вопросы или нужна помощь в выборе? Напишите нам напрямую: 
        <a href="https://t.me/artursagadav" class="text-brand-primary font-bold hover:underline">@artursagadav</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Компонент цен
</script>

<style scoped>
.text-brand-primary {
  color: #10b981;
}
.bg-brand-primary {
  background-color: #10b981;
}
.border-brand-primary {
  border-color: #10b981;
}
</style>
