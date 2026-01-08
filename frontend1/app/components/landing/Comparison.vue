<template>
  <section class="py-16 bg-gray-50" id="comparison">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">В чем разница?</h2>
        <p class="mt-4 text-lg text-gray-600">Сравните самостоятельный поиск и работу с Offer Jet</p>
      </div>

      <div class="overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white">
        <div class="grid grid-cols-1 md:grid-cols-3">
          <!-- Labels Column (Hidden on mobile mostly, simplified) -->
          <div class="hidden md:block col-span-1 bg-white p-8">
             <div class="h-20 flex items-center"></div> <!-- Spacer for header -->
             <div class="space-y-8 mt-8">
                 <div class="h-16 flex items-center text-gray-600 font-medium">Откликов в день</div>
                 <div class="h-16 flex items-center text-gray-600 font-medium">Время на поиск</div>
                 <!-- <div class="h-16 flex items-center text-gray-600 font-medium">Сопроводительные письма</div> -->
                 <div class="h-16 flex items-center text-gray-600 font-medium">Эффективность</div>
             </div>
          </div>

          <!-- You (Manual) -->
          <div class="col-span-1 bg-gray-50/50 p-8 border-r border-gray-100 md:border-l relative">
            <div class="h-20 flex flex-col justify-center items-center text-center">
                <span class="text-xl font-bold text-gray-900">Вы сами</span>
                <span class="text-sm text-gray-500">Ручной поиск</span>
            </div>
             <div class="space-y-8 mt-8">
                 <div class="h-16 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                     <span class="md:hidden text-xs text-gray-400 uppercase tracking-wider mb-1">Откликов в день</span>
                     <span class="text-lg text-gray-900">10-20</span>
                 </div>
                 <div class="h-16 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                     <span class="md:hidden text-xs text-gray-400 uppercase tracking-wider mb-1">Время на поиск</span>
                     <span class="text-lg text-gray-900">2-3 часа</span>
                 </div>
                 <!-- <div class="h-16 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                     <span class="md:hidden text-xs text-gray-400 uppercase tracking-wider mb-1">Сопроводительные</span>
                     <span class="text-lg text-gray-900">Копипаст</span>
                 </div> -->
                 <div class="h-16 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                     <span class="md:hidden text-xs text-gray-400 uppercase tracking-wider mb-1">Эффективность</span>
                     <span class="text-lg text-red-500 font-medium">Низкая</span>
                 </div>
             </div>
          </div>

          <!-- Offer Jet -->
          <div class="col-span-1 bg-white p-8 relative overflow-hidden">
             <div class="absolute top-0 right-0 bg-brand-lime text-black text-xs font-bold px-3 py-1 rounded-bl-lg">РЕКОМЕНДУЕМ</div>
             <div class="h-20 flex flex-col justify-center items-center text-center">
                <span class="text-xl font-bold text-brand-primary">Offer Jet</span>
                <span class="text-sm text-brand-primary">Автоматизация</span>
            </div>
             <div class="space-y-8 mt-8">
                 <div class="h-16 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                     <span class="md:hidden text-xs text-gray-400 uppercase tracking-wider mb-1">Откликов в день</span>
                     <span class="text-2xl font-bold text-gray-900">200</span>
                 </div>
                 <div class="h-16 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                     <span class="md:hidden text-xs text-gray-400 uppercase tracking-wider mb-1">Время на поиск</span>
                     <span class="text-2xl font-bold text-brand-lime bg-black px-2 py-1 rounded">0 минут</span>
                 </div>
                 <!-- <div class="h-16 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                     <span class="md:hidden text-xs text-gray-400 uppercase tracking-wider mb-1">Сопроводительные</span>
                     <span class="text-lg text-gray-900">Индивидуальные (AI)</span>
                 </div> -->
                 <div class="h-16 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                     <span class="md:hidden text-xs text-gray-400 uppercase tracking-wider mb-1">Эффективность</span>
                     <span class="text-lg text-brand-primary font-bold">Высокая</span>
                 </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
