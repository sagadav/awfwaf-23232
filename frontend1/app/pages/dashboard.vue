<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2 sm:gap-3">
            <div class="w-8 h-8 sm:w-10 sm:h-10 bg-brand-primary rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-sm shadow-green-100">
              ✈️
            </div>
            <h1 class="text-xl sm:text-2xl font-bold text-gray-900 truncate">Панель</h1>
          </div>
          <button @click="handleLogout" class="text-xs sm:text-sm text-gray-600 hover:text-gray-900 bg-gray-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl transition-colors">
            Выйти
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
          label="Всего ответов" 
          :value="totalResponses" 
          icon-bg="bg-purple-100" 
          icon-color="text-purple-600"
          svg-path="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </div>

      <!-- Action Bar -->
      <div class="mb-6">
        <button 
          @click="openCreateModal"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-green-200 active:scale-95 text-base sm:text-sm"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Создать рассылку
        </button>
      </div>

      <!-- Error State -->
      <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 flex items-center gap-3">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ error }}
      </div>

      <!-- Distributions List -->
      <div v-if="loading && !distributions.length" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-brand-primary"></div>
      </div>

      <div v-else-if="distributions.length === 0" class="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
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
    </main>

    <!-- Modals -->
    <DistributionForm 
      :is-open="showFormModal"
      :distribution="editingDistribution"
      :user="user"
      :loading="loading"
      :error="error"
      @close="showFormModal = false"
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
import { ref, computed, onMounted } from 'vue'
import { useDistributions } from '~/composables/useDistributions'
import type { Distribution } from '~/composables/useDistributions'
import StatsCard from '~/components/Dashboard/StatsCard.vue'
import DistributionCard from '~/components/Distribution/DistributionCard.vue'
import DistributionForm from '~/components/Distribution/DistributionForm.vue'
import DeleteConfirmModal from '~/components/Distribution/DeleteConfirmModal.vue'

const { 
  distributions, 
  loading, 
  error, 
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
  showFormModal.value = true
}

const openEditModal = (dist: Distribution) => {
  editingDistribution.value = dist
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
  await updateDistribution(dist.id, { status: newStatus })
}

const handleLogout = () => {
  localStorage.removeItem('auth_token')
  navigateTo('/signin')
}

onMounted(() => {
  fetchDistributions()
  fetchUserProfile()
})
</script>
