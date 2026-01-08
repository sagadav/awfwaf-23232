<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Background accents -->
    <div class="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50" />
    <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-lime-100 rounded-full blur-3xl opacity-50" />

    <div class="max-w-md w-full space-y-8 relative">
      <div class="text-center">
        <div class="flex justify-center mb-6">
          <div class="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-green-100">
            ✈️
          </div>
        </div>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">
          Вход в личный кабинет
        </h2>
        <div class="mt-2 flex items-center justify-center gap-2 text-sm text-gray-500">
          <span>С помощью вашего аккаунта HeadHunter</span>
          <div class="group relative flex items-center">
            <div class="cursor-help w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-green-50 hover:text-brand-primary transition-colors">
              ?
            </div>
            <!-- Tooltip -->
            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-20 text-center leading-relaxed">
              Мы не храним ваши персональные данные, вход напрямую в HH через официальные механизмы авторизации.
              <div class="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900" />
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 min-h-[400px] flex flex-col">
        <transition
          name="fade-slide"
          mode="out-in"
        >
          <!-- Step 1: Identifier Input -->
          <div
            v-if="step === 'identifier'"
            key="identifier"
            class="flex-1 flex flex-col"
          >
            <!-- Tabs -->
            <div class="flex p-1 bg-gray-100 rounded-2xl mb-8">
              <button
                :class="[
                  'flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200',
                  tab === 'email' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                ]"
                @click="tab = 'email'"
              >
                Email
              </button>
              <button
                :class="[
                  'flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200',
                  tab === 'phone' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                ]"
                @click="tab = 'phone'"
              >
                Телефон
              </button>
            </div>

            <form
              class="space-y-6 flex-1 flex flex-col"
              @submit.prevent="handleLogin"
            >
              <!-- Error message -->
              <div
                v-if="errorMessage"
                class="p-4 bg-red-50 border border-red-200 rounded-xl"
              >
                <p class="text-sm text-red-600">
                  {{ errorMessage }}
                </p>
              </div>

              <div v-if="tab === 'email'">
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >Электронная почта</label>
                <input
                  id="email"
                  v-model="email"
                  name="email"
                  type="email"
                  required
                  class="appearance-none block w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all"
                  placeholder="example@mail.ru"
                >
              </div>

              <div v-else>
                <label
                  for="phone"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >Номер телефона</label>
                <input
                  id="phone"
                  v-model="phone"
                  name="phone"
                  type="tel"
                  required
                  class="appearance-none block w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all"
                  placeholder="+7 (999) 000-00-00"
                >
              </div>

              <div class="mt-auto">
                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-lg text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-all active:scale-95 disabled:opacity-50"
                >
                  <span v-if="!loading">Продолжить</span>
                  <svg
                    v-else
                    class="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    />
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </button>
              </div>
            </form>

            <div class="mt-8 text-center pt-6 border-t border-gray-50">
              <p class="text-sm text-gray-500">
                Нет аккаунта на HH?
                <a
                  href="https://hh.ru/signup"
                  target="_blank"
                  class="font-semibold text-brand-primary hover:text-brand-primary/80"
                >Зарегистрироваться</a>
              </p>
            </div>
          </div>

          <!-- Step 2: Verification Code -->
          <div
            v-else
            key="verification"
            class="flex-1 flex flex-col"
          >
            <button
              class="group mb-6 inline-flex items-center text-sm font-medium text-gray-500 hover:text-brand-primary transition-colors"
              @click="step = 'identifier'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Назад к вводу {{ tab === 'email' ? 'почты' : 'телефона' }}
            </button>

            <div class="text-center mb-8">
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                Введите код
              </h3>
              <p class="text-sm text-gray-500">
                Мы отправили код подтверждения на <br>
                <span class="font-medium text-gray-900">{{ tab === 'email' ? email : phone }}</span>
              </p>
            </div>

            <form
              class="space-y-8 flex-1 flex flex-col"
              @submit.prevent="handleVerify"
            >
              <!-- Error message -->
              <div
                v-if="errorMessage"
                class="p-4 bg-red-50 border border-red-200 rounded-xl"
              >
                <p class="text-sm text-red-600">
                  {{ errorMessage }}
                </p>
              </div>

              <div>
                <label
                  for="verification_code"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >Код подтверждения</label>
                <input
                  id="verification_code"
                  v-model="verificationCode"
                  name="verification_code"
                  type="text"
                  pattern="[0-9]*"
                  inputmode="numeric"
                  maxlength="4"
                  required
                  class="appearance-none block w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-center text-3xl font-bold tracking-[1em]"
                  placeholder="0000"
                >
              </div>

              <div class="mt-auto">
                <button
                  type="submit"
                  :disabled="loading || verificationCode.length !== 4"
                  class="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-lg text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-all active:scale-95 disabled:opacity-50"
                >
                  <span v-if="!loading">Войти в кабинет</span>
                  <svg
                    v-else
                    class="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    />
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </button>
              </div>
            </form>

            <div class="mt-8 text-center">
              <button
                class="text-sm font-semibold text-brand-primary hover:text-brand-primary/80"
                @click="handleResendCode"
              >
                Отправить код повторно
              </button>
            </div>
          </div>
        </transition>
      </div>

      <p class="mt-8 text-center text-xs text-gray-400">
        Нажимая «Продолжить», вы соглашаетесь с условиями использования и политикой конфиденциальности.
      </p>
    </div>

    <!-- Captcha Modal -->
    <transition name="fade">
      <div
        v-if="showCaptchaModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          @click="showCaptchaModal = false"
        />

        <!-- Modal Card -->
        <div class="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center overflow-hidden">
          <div class="flex justify-center mb-6">
            <div class="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-yellow-50">
              🛡️
            </div>
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-4">
            Требуется проверка
          </h3>

          <p class="text-gray-600 mb-8 leading-relaxed">
            Пожалуйста перейдите на сайт hh.ru и решите капчу. Если ошибки не будет после отправки капчи (сообщения о успехе тоже), возвращайтесь на эту страницу и продолжите вход.
          </p>

          <div class="space-y-3">
            <a
              :href="captchaUrl"
              target="_blank"
              class="block w-full py-4 px-4 bg-brand-primary text-white font-bold rounded-2xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/25"
            >
              Перейти к решению капчи
            </a>

            <button
              class="block w-full py-4 px-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-all"
              @click="showCaptchaModal = false"
            >
              Я всё решил, продолжить
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const step = ref('identifier') // 'identifier' or 'verification'
const tab = ref('email')
const email = ref('')
const phone = ref('')
const verificationCode = ref('')
const loading = ref(false)
const errorMessage = ref('')

// Captcha state
const showCaptchaModal = ref(false)
const captchaUrl = ref('')

const config = useRuntimeConfig()
const API_BASE = config.public.apiBase || '/api'

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''
  const identifier = tab.value === 'email' ? email.value : phone.value

  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        login: identifier
      })
    })

    const data = await response.json()

    // Handle Captcha
    if (response.status === 403 && data.is_bot && data.captcha_url) {
      captchaUrl.value = data.captcha_url
      showCaptchaModal.value = true
      loading.value = false
      return
    }

    if (!response.ok || !data.success) {
      errorMessage.value = data.message || 'Ошибка при отправке кода'
      return
    }

    // Store session data in localStorage (stateless REST)
    localStorage.setItem('auth_session', JSON.stringify(data.session_data))
    step.value = 'verification'
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Ошибка соединения с сервером'
  } finally {
    loading.value = false
  }
}

const handleVerify = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    // Retrieve session data from localStorage
    const sessionDataStr = localStorage.getItem('auth_session')
    if (!sessionDataStr) {
      errorMessage.value = 'Сессия истекла. Запросите код повторно.'
      step.value = 'identifier'
      return
    }

    const sessionData = JSON.parse(sessionDataStr)

    const response = await fetch(`${API_BASE}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        session_data: sessionData,
        code: verificationCode.value
      })
    })

    const data = await response.json()

    if (!response.ok || !data.success) {
      errorMessage.value = data.message || 'Неверный код'
      return
    }

    // Clear session data
    localStorage.removeItem('auth_session')

    // Save token to localStorage
    if (data.token) {
      localStorage.setItem('auth_token', data.token)
    }

    // Redirect to dashboard
    console.log('Login successful:', data.user)
    navigateTo('/dashboard')
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Ошибка соединения с сервером'
  } finally {
    loading.value = false
  }
}

const handleResendCode = async () => {
  await handleLogin()
  if (!errorMessage.value && !showCaptchaModal.value) {
    // Optional: show a toast or temporary message
    alert('Код отправлен повторно')
  }
}

onMounted(() => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    navigateTo('/dashboard')
  }
})
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease-out;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
