<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-14 sm:h-16">
          <div class="flex items-center gap-8 h-full">
            <div class="flex items-center gap-2 sm:gap-3">
              <div class="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-green-100">
                ✈️
              </div>
              <h1 class="hidden sm:block text-xl font-bold text-gray-900 truncate">OJ</h1>
            </div>
            
            <!-- Navigation Tabs -->
            <nav class="flex h-full">
              <button 
                id="tour-tab-distributions"
                @click="activeTab = 'distributions'"
                :class="[
                  'px-1 sm:px-4 h-full flex items-center border-b-2 font-medium text-sm transition-all relative top-[1px]',
                  activeTab === 'distributions' 
                    ? 'border-brand-primary text-brand-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                ]"
              >
                Рассылки
              </button>
              <button 
                id="tour-tab-pricing"
                @click="activeTab = 'pricing'"
                :class="[
                  'px-1 sm:px-4 h-full flex items-center border-b-2 font-medium text-sm transition-all relative top-[1px]',
                  activeTab === 'pricing' 
                    ? 'border-brand-primary text-brand-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                ]"
              >
                Тарифы
              </button>
            </nav>
          </div>
          
          <div class="flex items-center gap-3 sm:gap-6">
            <a 
              href="https://t.me/artursagadav" 
              target="_blank"
              class="hidden md:flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-brand-primary transition-colors bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100"
            >
              <svg class="w-4 h-4 text-[#24A1DE]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.39.51-.46-.01-1.33-.26-1.98-.48-.8-.27-1.43-.42-1.37-.89.03-.25.38-.51 1.03-.78 4.04-1.76 6.74-2.92 8.09-3.48 3.85-1.6 4.64-1.88 5.17-1.89.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.14-.03.22z"/>
              </svg>
              Саппорт: @artursagadav
            </a>
            <button @click="handleLogout" class="text-xs sm:text-sm text-gray-500 hover:text-gray-900 font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              Выход
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <!-- Distributions Tab -->
      <div v-if="activeTab === 'distributions'">
        <!-- Stats Cards -->
        <div id="tour-stats" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard 
            label="Активные рассылки" 
            :value="activeCount" 
            icon-bg="bg-green-100" 
            icon-color="text-green-600"
            svg-path="M13 10V3L4 14h7v7l9-11h-7z"
          />
          <StatsCard 
            label="Отправлено откликов" 
            :value="totalSent" 
            icon-bg="bg-blue-100" 
            icon-color="text-blue-600"
            svg-path="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
          <StatsCard 
            label="Ответов работодателей" 
            :value="totalResponses" 
            icon-bg="bg-amber-100" 
            icon-color="text-amber-600"
            svg-path="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </div>

        <!-- Action Bar -->
        <div class="mb-6 text-right">
          <button 
            id="tour-create"
            @click="openCreateModal"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-green-200 active:scale-95 text-sm"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Создать рассылку
          </button>
        </div>

        <!-- Error State -->
        <div v-if="listError" class="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 flex items-center gap-3">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ listError }}
        </div>

        <!-- Distributions List / loading -->
        <div v-if="loading && !distributions.length" class="grid gap-4" aria-busy="true">
          <div
            v-for="n in 3"
            :key="n"
            class="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 animate-pulse"
          >
            <div class="flex justify-between mb-4">
              <div class="space-y-2 flex-1">
                <div class="h-5 bg-gray-200 rounded w-24" />
                <div class="h-4 bg-gray-100 rounded w-3/4 max-w-md" />
                <div class="h-4 bg-gray-100 rounded w-1/2 max-w-sm" />
              </div>
              <div class="h-8 w-8 bg-gray-200 rounded-full shrink-0" />
            </div>
            <div class="h-16 bg-gray-100 rounded-xl mb-3 max-w-xs" />
            <div class="h-2 bg-gray-200 rounded-full w-full mb-2" />
            <div class="h-3 bg-gray-100 rounded w-40" />
          </div>
        </div>

        <div v-else id="tour-distributions">
          <div v-if="distributions.length === 0" class="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Активных рассылок нет</h3>
            <p class="text-gray-600 mb-6">Создайте свою первую рассылку, чтобы запустить автоматическую отправку откликов</p>
            <button 
              @click="openCreateModal"
              class="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-primary/90 transition-all"
            >
              Создать рассылку
            </button>
          </div>

          <div v-else class="grid gap-4">
            <DistributionCard 
              v-for="dist in distributions" 
              :key="dist.id" 
              :distribution="dist"
              @edit="openEditModal"
              @delete="confirmDelete"
              @toggle-status="handleToggleStatus"
            />
          </div>
        </div>
      </div>

      <!-- Pricing Tab -->
      <div v-else-if="activeTab === 'pricing'">
        <Pricing />
      </div>
    </main>

    <!-- Modals -->
    <DistributionForm 
      :is-open="showFormModal"
      :distribution="editingDistribution"
      :user="user"
      :loading="loading"
      :form-error="formError"
      @close="closeFormModal"
      @save="handleSave"
    />

    <DeleteConfirmModal 
      :is-open="showDeleteModal"
      :loading="loading"
      @close="showDeleteModal = false"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useDistributions } from '~/composables/useDistributions'
import type { Distribution } from '~/composables/useDistributions'
import { driver } from "driver.js"
import "driver.js/dist/driver.css"
import StatsCard from '~/components/Dashboard/StatsCard.vue'
import Pricing from '~/components/Dashboard/Pricing.vue'
import DistributionCard from '~/components/Distribution/DistributionCard.vue'
import DistributionForm from '~/components/Distribution/DistributionForm.vue'
import DeleteConfirmModal from '~/components/Distribution/DeleteConfirmModal.vue'

type DashTab = 'distributions' | 'pricing'

const route = useRoute()
const router = useRouter()

const resolveTab = (q: unknown): DashTab => (q === 'pricing' ? 'pricing' : 'distributions')

const activeTab = computed({
  get: () => resolveTab(route.query.tab),
  set: (tab: DashTab) => {
    const query = { ...route.query } as Record<string, unknown>
    if (tab === 'distributions') {
      delete query.tab
    } else {
      query.tab = tab
    }
    router.push({ path: route.path, query: query as Record<string, string> })
  }
})

const initTour = () => {
  const driverObj = driver({
    showProgress: true,
    nextBtnText: 'Далее',
    prevBtnText: 'Назад',
    doneBtnText: 'Готово',
    steps: [
      { element: '#tour-tab-distributions', popover: { title: 'Ваши рассылки', description: 'Здесь отображаются все ваши активные кампании по поиску работы.', side: "bottom", align: 'start' }},
      { element: '#tour-stats', popover: { title: 'Ваша статистика', description: 'Сводка по активным рассылкам, отправленным откликам и ответам работодателей.', side: "bottom", align: 'start' }},
      { element: '#tour-create', popover: { title: 'Создание', description: 'Нажмите сюда, чтобы запустить новую автоматическую рассылку откликов.', side: "left", align: 'start' }},
      { element: '#tour-distributions', popover: { title: 'Список рассылок', description: 'Карточки показывают прогресс, отклики и ответы по каждой кампании.', side: "top", align: 'start' }},
      { element: '#tour-tab-pricing', popover: { title: 'Тарифы', description: 'Здесь вы можете выбрать подходящий план и продлить подписку.', side: "bottom", align: 'start' }},
    ]
  });

  const hasSeenTour = localStorage.getItem('has_seen_tour_v1')
  if (!hasSeenTour) {
    driverObj.drive();
    localStorage.setItem('has_seen_tour_v1', 'true')
  }
}

const { 
  distributions, 
  loading, 
  listError,
  formError,
  clearFormError,
  fetchDistributions, 
  deleteDistribution,
  createDistribution,
  updateDistribution,
  user,
  fetchUserProfile
} = useDistributions()

const showFormModal = ref(false)
const showDeleteModal = ref(false)
const editingDistribution = ref<Distribution | null>(null)
const distributionToDeleteId = ref<number | null>(null)

const activeCount = computed(() => 
  distributions.value.filter(d => d.status === 'active').length
)

const totalSent = computed(() => 
  distributions.value.reduce((sum, d) => sum + d.applications_sent, 0)
)

const totalResponses = computed(() => 
  distributions.value.reduce((sum, d) => sum + d.responses_count, 0)
)

const openCreateModal = () => {
  editingDistribution.value = null
  clearFormError()
  showFormModal.value = true
}

const closeFormModal = () => {
  showFormModal.value = false
  clearFormError()
}

const openEditModal = (dist: Distribution) => {
  editingDistribution.value = dist
  clearFormError()
  showFormModal.value = true
}

const confirmDelete = (id: number) => {
  distributionToDeleteId.value = id
  showDeleteModal.value = true
}

const handleSave = async (data: any) => {
  let success = false
  if (editingDistribution.value) {
    success = await updateDistribution(editingDistribution.value.id, data)
  } else {
    success = await createDistribution(data)
  }

  if (success) {
    showFormModal.value = false
    clearFormError()
  }
}

const handleDelete = async () => {
  if (distributionToDeleteId.value) {
    const success = await deleteDistribution(distributionToDeleteId.value)
    if (success) {
      showDeleteModal.value = false
      distributionToDeleteId.value = null
    }
  }
}

const handleToggleStatus = async (dist: Distribution) => {
  const newStatus = dist.status === 'active' ? 'paused' : 'active'
  await updateDistribution(dist.id, { status: newStatus }, { errorScope: 'list' })
}

const handleLogout = () => {
  if (!confirm('Выйти из аккаунта?')) return
  localStorage.removeItem('auth_token')
  navigateTo('/signin')
}

onMounted(async () => {
  await fetchDistributions()
  fetchUserProfile()
  await nextTick()
  if (activeTab.value === 'distributions') {
    await nextTick()
    initTour()
  }
})
</script>
