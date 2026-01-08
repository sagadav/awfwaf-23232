<template>
  <section id="pricing" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">Тарифы</h2>
        <p class="mt-4 text-xl text-gray-600">Выберите подходящий план и начните получать приглашения</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <!-- Plan 1 -->
        <div class="border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow bg-white flex flex-col">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">7 Дней</h3>
            <p class="text-gray-500 mb-6">Для быстрого старта</p>
            <div class="text-4xl font-bold text-gray-900 mb-6">1 000 ₽</div>
            <ul class="space-y-4 mb-8 flex-1">
                <li class="flex items-center gap-3 text-gray-600">
                    <svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                    До 2100 откликов
                </li>
                <li class="flex items-center gap-3 text-gray-600">
                    <svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                    Умная фильтрация
                </li>
                 <li class="flex items-center gap-3 text-gray-600">
                    <svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                    Сопроводительные письма
                </li>
            </ul>
            <NuxtLink to="/signin" class="block w-full py-4 text-center font-bold text-brand-primary bg-brand-primary/10 rounded-xl hover:bg-brand-primary/20 transition-colors">
                Выбрать
            </NuxtLink>
        </div>

        <!-- Plan 2 (Best Value) -->
        <div class="border-2 border-brand-primary rounded-2xl p-8 hover:shadow-lg transition-shadow bg-white relative flex flex-col transform md:-translate-y-4">
             <div class="absolute top-0 right-0 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">ВЫГОДНО</div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">14 Дней</h3>
            <p class="text-gray-500 mb-6">Максимальный охват</p>
            <div class="text-4xl font-bold text-gray-900 mb-6">1 600 ₽</div>
             <ul class="space-y-4 mb-8 flex-1">
                <li class="flex items-center gap-3 text-gray-600">
                    <svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                    До 4500 откликов
                </li>
                <li class="flex items-center gap-3 text-gray-600">
                    <svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                    Приоритетная поддержка
                </li>
                 <li class="flex items-center gap-3 text-gray-600">
                    <svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                    Все функции включены
                </li>
            </ul>
            <NuxtLink to="/signin" class="block w-full py-4 text-center font-bold text-white bg-brand-primary rounded-xl hover:bg-brand-primary/90 transition-colors">
                Выбрать
            </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
