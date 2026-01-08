<template>
  <section class="relative bg-white pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-semibold mb-8">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
            </span>
            Работает с HeadHunter
        </div>

      <h1 class="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
        Каждый работотадель должен увидеть ваше <span class="text-brand-primary">резюме</span>
      </h1>
      
      <p class="mt-4 text-xl text-gray-600 max-w-2xl mx-auto mb-10">
        Отправляйте до 200 отликов в день. 6000 в месяц!
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <NuxtLink to="/signin" class="w-full sm:w-auto px-8 py-4 bg-brand-primary text-white font-bold text-lg rounded-xl shadow-lg hover:bg-brand-primary/90 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
           <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
           Попробовать бесплатно
        </NuxtLink>
        <a href="#how-it-works" class="w-full sm:w-auto px-8 py-4 bg-gray-100 text-gray-900 font-bold text-lg rounded-xl hover:bg-gray-200 transition-all duration-300">
          Как это работает
        </a>
      </div>

       <!-- <div class="mt-16 relative mx-auto max-w-5xl">
          <div class="relative rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden p-2">
            <div class="pointer-events-none absolute top-0 left-0 -translate-x-10 -translate-y-10 w-96 h-96 bg-brand-lime/30 rounded-full blur-3xl opacity-50"></div>
            <div class="pointer-events-none absolute bottom-0 right-0 translate-x-10 translate-y-10 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl opacity-50"></div>
            
            <div class="bg-gray-50 rounded-xl aspect-[16/9] flex items-center justify-center relative overflow-hidden">
                <div class="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                    <svg class="w-24 h-24 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <span class="font-medium">Интерфейс Offer Jet</span>
                </div>
            </div>
          </div>
       </div> -->

    </div>
  </section>
</template>
