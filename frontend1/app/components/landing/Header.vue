<template>
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center gap-2 cursor-pointer" @click="navigateTo('/')">
            <div class="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold">✈️</div>
            <span class="font-bold text-xl tracking-tight text-gray-900">Offer Jet</span>
        </div>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex gap-8">
          <a href="#how-it-works" class="text-gray-600 hover:text-brand-primary font-medium transition-colors">Как это работает</a>
          <a href="#advantages" class="text-gray-600 hover:text-brand-primary font-medium transition-colors">Преимущества</a>
          <a href="#pricing" class="text-gray-600 hover:text-brand-primary font-medium transition-colors">Тарифы</a>
          <!-- <a href="#reviews" class="text-gray-600 hover:text-brand-primary font-medium transition-colors">Отзывы</a> -->
          <a href="#faq" class="text-gray-600 hover:text-brand-primary font-medium transition-colors">FAQ</a>
        </nav>

        <!-- CTA / Mobile Menu Button -->
        <div class="flex items-center gap-4">
             <NuxtLink to="/signin" class="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary">
            В кабинет
          </NuxtLink>
          <!-- Mobile menu button -->
           <button 
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-primary"
            >
              <span class="sr-only">Open menu</span>
              <!-- Hamburger -->
              <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <!-- Close (X) -->
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
           </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Dropdown -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div v-show="isMobileMenuOpen" class="md:hidden border-t border-gray-100 bg-white shadow-lg absolute w-full left-0">
        <nav class="flex flex-col p-4 space-y-4">
          <a href="#how-it-works" @click="closeMobileMenu" class="text-gray-600 hover:text-brand-primary font-medium transition-colors px-2 py-1 block">Как это работает</a>
          <a href="#advantages" @click="closeMobileMenu" class="text-gray-600 hover:text-brand-primary font-medium transition-colors px-2 py-1 block">Преимущества</a>
          <a href="#pricing" @click="closeMobileMenu" class="text-gray-600 hover:text-brand-primary font-medium transition-colors px-2 py-1 block">Тарифы</a>
          <!-- <a href="#reviews" @click="closeMobileMenu" class="text-gray-600 hover:text-brand-primary font-medium transition-colors px-2 py-1 block">Отзывы</a> -->
          <a href="#faq" @click="closeMobileMenu" class="text-gray-600 hover:text-brand-primary font-medium transition-colors px-2 py-1 block">FAQ</a>
          <NuxtLink to="/signin" @click="closeMobileMenu" class="sm:hidden text-brand-primary font-bold px-2 py-1 block">В кабинет</NuxtLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const isMobileMenuOpen = ref(false)

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
}
</script>
