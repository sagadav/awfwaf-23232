<template>
  <section id="faq" class="py-20 bg-white">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">Частые вопросы</h2>
      </div>

      <div class="space-y-4">
        <details class="group bg-gray-50 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
            <summary class="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-gray-900 font-medium hover:bg-gray-100 transition-colors">
                <h3 class="text-lg">Безопасно ли это для моего аккаунта hh.ru?</h3>
                <svg class="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
            </summary>
            <div class="px-6 pb-6 text-gray-600 leading-relaxed">
                Да, наш сервис полностью безопасен. Мы эмулируем действия реального пользователя и соблюдаем лимиты hh.ru.
            </div>
        </details>

        <details class="group bg-gray-50 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
            <summary class="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-gray-900 font-medium hover:bg-gray-100 transition-colors">
                <h3 class="text-lg">Как начать пользоваться?</h3>
                <svg class="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
            </summary>
            <div class="px-6 pb-6 text-gray-600 leading-relaxed">
                Перейдите в личный кабинет hh.ru. Вы сможете настроить параметры поиска и запустить рассылку за пару минут.
            </div>
        </details>

         <details class="group bg-gray-50 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
            <summary class="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-gray-900 font-medium hover:bg-gray-100 transition-colors">
                <h3 class="text-lg">Можно ли редактировать сопроводительное письмо?</h3>
                <svg class="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
            </summary>
            <div class="px-6 pb-6 text-gray-600 leading-relaxed">
                Конечно. Вы можете использовать наш шаблон или написать свой собственный текст, который будет отправляться работодателям.
            </div>
        </details>
      </div>
    </div>
  </section>
</template>
