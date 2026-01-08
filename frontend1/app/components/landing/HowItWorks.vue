<template>
  <section id="how-it-works" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">Как это работает?</h2>
        <p class="mt-4 text-xl text-gray-600">Всего 3 простых шага к вашей новой работе</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
         <!-- Connecting line for desktop (simplified) -->
         <div class="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-10"></div>

        <!-- Step 1 -->
        <div class="relative flex flex-col items-center text-center">
            <div class="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-sm">
                <span class="text-brand-primary font-bold text-2xl">1</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Мы отбираем вакансии</h3>
            <p class="text-gray-600 leading-relaxed">
                Наш умный алгоритм анализирует тысячи вакансий и выбирает те, которые идеально подходят под ваш опыт и навыки.
            </p>
        </div>

        <!-- Step 2 -->
        <div class="relative flex flex-col items-center text-center">
            <div class="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-sm">
                 <span class="text-brand-primary font-bold text-2xl">2</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Рассылаем отклики</h3>
            <p class="text-gray-600 leading-relaxed">
                Отправляем до 200 откликов в сутки. К каждому отклику прикладываем уникальное сопроводительное письмо.
            </p>
        </div>

        <!-- Step 3 -->
        <div class="relative flex flex-col items-center text-center">
            <div class="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-sm">
                 <span class="text-brand-primary font-bold text-2xl">3</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Вы получаете приглашения</h3>
            <p class="text-gray-600 leading-relaxed">
                Вам остается только отвечать на звонки и сообщения от рекрутеров и выбирать лучшие предложения.
            </p>
        </div>
      </div>
    </div>
  </section>
</template>
