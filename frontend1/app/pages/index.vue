<template>
  <div class="min-h-screen font-sans bg-white">
    <LandingHeader />
    <LandingHero />
    <LandingComparison />
    <LandingHowItWorks />
    <LandingAdvantages />
    <LandingPricing />
    <!-- <LandingTestimonials /> -->
    <LandingFAQ />
    <LandingFooter />
  </div>
</template>

<script setup lang="ts">
// Page meta
useHead({
  title: 'Offer Jet - Автоотклики на вакансии hh.ru',
  meta: [
    { name: 'description', content: 'Найдем работу на hh.ru за вас. Автоматические отклики и сопроводительные письма.' }
  ]
})
</script>
