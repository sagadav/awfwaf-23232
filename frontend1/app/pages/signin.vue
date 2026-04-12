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

      <div class="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 min-h-[400px] flex flex-col relative">
        <!-- Resend success banner -->
        <transition name="fade">
          <div
            v-if="resendBannerVisible"
            role="status"
            class="absolute top-4 left-4 right-4 z-10 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 shadow-sm"
          >
            <span class="font-medium">Код отправлен повторно</span>
          </div>
        </transition>

        <p class="text-center text-xs font-medium text-gray-500 mb-4">
          {{ step === 'identifier' ? 'Шаг 1 из 2' : 'Шаг 2 из 2' }}
        </p>

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
                <button
                  v-if="showErrorRetry"
                  type="button"
                  class="mt-3 w-full sm:w-auto rounded-xl bg-white px-4 py-2 text-sm font-semibold text-red-700 ring-1 ring-red-200 hover:bg-red-50"
                  @click="retryLastAction"
                >
                  Повторить
                </button>
              </div>

              <div>
                <label
                  for="phone"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >Номер телефона</label>
                <input
                  id="phone"
                  :value="phoneDisplay"
                  name="phone"
                  type="tel"
                  inputmode="tel"
                  autocomplete="tel"
                  class="appearance-none block w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all"
                  placeholder="+7 (999) 000-00-00"
                  @input="onPhoneInput"
                >
                <p
                  v-if="phoneTouched && phoneDigits && !isValidRuMobile(phoneDigits)"
                  class="mt-2 text-xs text-amber-700"
                >
                  Нужен российский мобильный: +7 и ещё 10 цифр (например, 9XX&nbsp;XXX‑XX‑XX).
                </p>
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
                  rel="noopener noreferrer"
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
              type="button"
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
              Назад к вводу телефона
            </button>

            <div class="text-center mb-8">
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                Введите код
              </h3>
              <p class="text-sm text-gray-500">
                Мы отправили код подтверждения на <br>
                <span class="font-medium text-gray-900">{{ phoneDisplay }}</span>
              </p>
              <p class="mt-2 text-xs text-gray-400">
                Код придёт в SMS
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
                <button
                  v-if="showErrorRetry"
                  type="button"
                  class="mt-3 w-full sm:w-auto rounded-xl bg-white px-4 py-2 text-sm font-semibold text-red-700 ring-1 ring-red-200 hover:bg-red-50"
                  @click="retryLastAction"
                >
                  Повторить
                </button>
              </div>

              <div>
                <label
                  for="verification_code"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >Код подтверждения</label>
                <input
                  id="verification_code"
                  ref="codeInputRef"
                  v-model="verificationCode"
                  name="verification_code"
                  type="text"
                  pattern="[0-9]*"
                  inputmode="numeric"
                  maxlength="4"
                  required
                  class="appearance-none block w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-center text-3xl font-bold tracking-[1em]"
                  placeholder="0000"
                  @paste.prevent="onCodePaste"
                >
                <p class="mt-2 text-center text-xs text-gray-400">
                  Можно вставить код из SMS целиком — поле заполнится автоматически
                </p>
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
                type="button"
                class="text-sm font-semibold text-brand-primary hover:text-brand-primary/80 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-brand-primary"
                :disabled="resendSecondsLeft > 0 || loading"
                @click="handleResendCode"
              >
                <template v-if="resendSecondsLeft > 0">
                  Отправить снова через {{ resendSecondsLeft }}&nbsp;с
                </template>
                <template v-else>
                  Отправить код повторно
                </template>
              </button>
            </div>
          </div>
        </transition>
      </div>

      <p class="mt-8 text-center text-xs text-gray-400 leading-relaxed">
        Нажимая «Продолжить», вы соглашаетесь с
        <a
          href="https://hh.ru/terms_of_use"
          target="_blank"
          rel="noopener noreferrer"
          class="text-brand-primary hover:underline font-medium"
        >условиями использования</a>
        и
        <a
          href="https://hh.ru/article/personal_data"
          target="_blank"
          rel="noopener noreferrer"
          class="text-brand-primary hover:underline font-medium"
        >политикой конфиденциальности</a>
        сервиса HeadHunter.
      </p>
    </div>

    <!-- Captcha Modal -->
    <transition name="fade">
      <div
        v-if="showCaptchaModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <!-- Backdrop: не закрываем по клику -->
        <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" />

        <!-- Modal Card -->
        <div
          class="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center overflow-hidden"
          @click.stop
        >
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
              rel="noopener noreferrer"
              class="block w-full py-4 px-4 bg-brand-primary text-white font-bold rounded-2xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/25"
            >
              Перейти к решению капчи
            </a>

            <button
              type="button"
              class="block w-full py-4 px-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-all"
              @click="closeCaptchaModal"
            >
              Закрыть и снова нажать «Продолжить»
            </button>
          </div>
          <p class="mt-4 text-xs text-gray-500">
            После возврата на эту вкладку мы автоматически попробуем отправить код ещё раз.
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
type ErrorKind = 'field' | 'network' | 'server' | 'api'

const step = ref<'identifier' | 'verification'>('identifier')
const phoneDigits = ref('')
const phoneTouched = ref(false)
const verificationCode = ref('')
const codeInputRef = ref<HTMLInputElement | null>(null)
const loading = ref(false)
const errorMessage = ref('')
const errorKind = ref<ErrorKind | null>(null)
const lastAction = ref<'login' | 'verify' | null>(null)

const showCaptchaModal = ref(false)
const captchaUrl = ref('')

const resendBannerVisible = ref(false)
const resendSecondsLeft = ref(0)
let resendInterval: ReturnType<typeof setInterval> | null = null
let resendBannerTimeout: ReturnType<typeof setTimeout> | null = null

let captchaVisibilityListener: (() => void) | null = null
let lastCaptchaAutoRetryAt = 0

const config = useRuntimeConfig()
const API_BASE = config.public.apiBase || '/api'

const showErrorRetry = computed(
  () => errorKind.value === 'network' || errorKind.value === 'server'
)

const phoneDisplay = computed(() => formatPhoneDisplay(phoneDigits.value))

function digitsOnly(s: string) {
  return s.replace(/\D/g, '')
}

/** Нормализация к 11 цифрам РФ: 79xxxxxxxxx */
function normalizeRuPhoneDigits(raw: string): string {
  let d = digitsOnly(raw)
  if (d.startsWith('8')) {
    d = '7' + d.slice(1)
  }
  if (d.length === 10 && d.startsWith('9')) {
    d = '7' + d
  }
  if (d.startsWith('7')) {
    return d.slice(0, 11)
  }
  if (d.length > 0) {
    return ('7' + d).slice(0, 11)
  }
  return ''
}

function formatPhoneDisplay(digits: string): string {
  if (!digits) {
    return ''
  }
  const d = digits.startsWith('7') ? digits : normalizeRuPhoneDigits(digits)
  const rest = d.startsWith('7') ? d.slice(1) : d
  let out = '+7'
  if (rest.length > 0) {
    out += ' (' + rest.slice(0, Math.min(3, rest.length))
  }
  if (rest.length >= 3) {
    out += ') ' + rest.slice(3, Math.min(6, rest.length))
  }
  if (rest.length > 6) {
    out += '-' + rest.slice(6, Math.min(8, rest.length))
  }
  if (rest.length > 8) {
    out += '-' + rest.slice(8, Math.min(10, rest.length))
  }
  return out
}

function isValidRuMobile(digits: string): boolean {
  const x = normalizeRuPhoneDigits(digits)
  return /^79\d{9}$/.test(x)
}

function loginPayloadPhone(): string {
  return `+${normalizeRuPhoneDigits(phoneDigits.value)}`
}

function onPhoneInput(e: Event) {
  phoneTouched.value = true
  const t = (e.target as HTMLInputElement).value
  phoneDigits.value = normalizeRuPhoneDigits(t)
}

function onCodePaste(e: ClipboardEvent) {
  const text = e.clipboardData?.getData('text') ?? ''
  const d = digitsOnly(text).slice(0, 4)
  if (d.length === 4) {
    verificationCode.value = d
    nextTick(() => codeInputRef.value?.blur())
  }
}

function clearError() {
  errorMessage.value = ''
  errorKind.value = null
}

function startResendCooldown() {
  resendSecondsLeft.value = 60
  if (resendInterval) {
    clearInterval(resendInterval)
  }
  resendInterval = setInterval(() => {
    resendSecondsLeft.value -= 1
    if (resendSecondsLeft.value <= 0) {
      if (resendInterval) {
        clearInterval(resendInterval)
        resendInterval = null
      }
      resendSecondsLeft.value = 0
    }
  }, 1000)
}

function showResendBanner() {
  resendBannerVisible.value = true
  if (resendBannerTimeout) {
    clearTimeout(resendBannerTimeout)
  }
  resendBannerTimeout = setTimeout(() => {
    resendBannerVisible.value = false
    resendBannerTimeout = null
  }, 4000)
}

function closeCaptchaModal() {
  showCaptchaModal.value = false
}

async function runLoginRequest(): Promise<{
  ok: boolean
  response: Response | null
  data: Record<string, unknown>
  networkError: boolean
}> {
  lastAction.value = 'login'
  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        login: loginPayloadPhone()
      })
    })
    let data: Record<string, unknown> = {}
    try {
      data = (await response.json()) as Record<string, unknown>
    } catch {
      data = {}
    }
    return { ok: response.ok, response, data, networkError: false }
  } catch (err) {
    console.error(err)
    return { ok: false, response: null, data: {}, networkError: true }
  }
}

function applyLoginResult(
  result: Awaited<ReturnType<typeof runLoginRequest>>,
  options: { fromResend?: boolean } = {}
) {
  const { fromResend = false } = options

  if (result.networkError) {
    errorKind.value = 'network'
    errorMessage.value = 'Не удалось связаться с сервером. Проверьте интернет и попробуйте снова.'
    return
  }

  const { response, data } = result
  if (!response) {
    return
  }

  // Captcha
  if (response.status === 403 && data.is_bot && data.captcha_url) {
    captchaUrl.value = String(data.captcha_url)
    showCaptchaModal.value = true
    return
  }

  if (response.status >= 500) {
    errorKind.value = 'server'
    errorMessage.value = 'Сервер временно недоступен. Подождите немного и нажмите «Повторить».'
    return
  }

  if (!result.ok || !data.success) {
    errorKind.value = 'api'
    errorMessage.value =
      (typeof data.message === 'string' && data.message) || 'Ошибка при отправке кода'
    return
  }

  clearError()
  localStorage.setItem('auth_session', JSON.stringify(data.session_data))
  if (step.value === 'identifier') {
    step.value = 'verification'
  }
  startResendCooldown()
  if (fromResend) {
    showResendBanner()
  }
}

const handleLogin = async () => {
  clearError()
  phoneTouched.value = true
  if (!isValidRuMobile(phoneDigits.value)) {
    errorKind.value = 'field'
    errorMessage.value = 'Введите корректный российский номер: +7 и 10 цифр мобильного.'
    return
  }

  loading.value = true
  try {
    const result = await runLoginRequest()
    applyLoginResult(result, { fromResend: false })
  } finally {
    loading.value = false
  }
}

async function tryCaptchaAutoRetry() {
  if (!showCaptchaModal.value || document.visibilityState !== 'visible') {
    return
  }
  const now = Date.now()
  if (now - lastCaptchaAutoRetryAt < 2500) {
    return
  }
  lastCaptchaAutoRetryAt = now

  if (!isValidRuMobile(phoneDigits.value)) {
    return
  }

  loading.value = true
  clearError()
  try {
    const result = await runLoginRequest()
    if (result.networkError || (result.response && result.response.status >= 500)) {
      applyLoginResult(result)
      return
    }
    const { response, data } = result
    if (response?.status === 403 && data.is_bot && data.captcha_url) {
      captchaUrl.value = String(data.captcha_url)
      return
    }
    if (response?.ok && data.success) {
      showCaptchaModal.value = false
      localStorage.setItem('auth_session', JSON.stringify(data.session_data))
      if (step.value === 'identifier') {
        step.value = 'verification'
      }
      startResendCooldown()
      clearError()
      return
    }
    applyLoginResult(result)
  } finally {
    loading.value = false
  }
}

async function runVerifyRequest(): Promise<{
  ok: boolean
  response: Response | null
  data: Record<string, unknown>
  networkError: boolean
}> {
  lastAction.value = 'verify'
  const sessionDataStr = localStorage.getItem('auth_session')
  if (!sessionDataStr) {
    return { ok: false, response: null, data: { message: 'Сессия истекла. Запросите код повторно.' }, networkError: false }
  }
  let sessionData: unknown
  try {
    sessionData = JSON.parse(sessionDataStr)
  } catch {
    return { ok: false, response: null, data: { message: 'Сессия истекла. Запросите код повторно.' }, networkError: false }
  }

  try {
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
    let data: Record<string, unknown> = {}
    try {
      data = (await response.json()) as Record<string, unknown>
    } catch {
      data = {}
    }
    return { ok: response.ok, response, data, networkError: false }
  } catch (err) {
    console.error(err)
    return { ok: false, response: null, data: {}, networkError: true }
  }
}

function applyVerifyResult(result: Awaited<ReturnType<typeof runVerifyRequest>>) {
  if (result.networkError) {
    errorKind.value = 'network'
    errorMessage.value = 'Не удалось связаться с сервером. Проверьте интернет и попробуйте снова.'
    return
  }

  const sessionMsg =
    typeof result.data.message === 'string' ? result.data.message : ''
  if (!result.response && sessionMsg.includes('Сессия')) {
    errorKind.value = 'api'
    errorMessage.value = sessionMsg
    step.value = 'identifier'
    return
  }

  const response = result.response
  if (!response) {
    return
  }

  if (response.status >= 500) {
    errorKind.value = 'server'
    errorMessage.value = 'Сервер временно недоступен. Подождите немного и нажмите «Повторить».'
    return
  }

  if (!result.ok || !result.data.success) {
    errorKind.value = 'api'
    errorMessage.value =
      (typeof result.data.message === 'string' && result.data.message) || 'Неверный код'
    return
  }

  clearError()
  localStorage.removeItem('auth_session')
  if (result.data.token) {
    localStorage.setItem('auth_token', String(result.data.token))
  }
  console.log('Login successful:', result.data.user)
  navigateTo('/dashboard')
}

const handleVerify = async () => {
  loading.value = true
  clearError()
  try {
    const result = await runVerifyRequest()
    applyVerifyResult(result)
  } finally {
    loading.value = false
  }
}

const handleResendCode = async () => {
  if (resendSecondsLeft.value > 0 || loading.value) {
    return
  }
  clearError()
  phoneTouched.value = true
  if (!isValidRuMobile(phoneDigits.value)) {
    errorKind.value = 'field'
    errorMessage.value = 'Введите корректный российский номер: +7 и 10 цифр мобильного.'
    return
  }

  loading.value = true
  try {
    const result = await runLoginRequest()
    applyLoginResult(result, { fromResend: true })
  } finally {
    loading.value = false
  }
}

function retryLastAction() {
  clearError()
  if (lastAction.value === 'verify') {
    void handleVerify()
  } else {
    void handleLogin()
  }
}

useHead({
  title: 'Offer Jet - Вход',
  meta: [
    { name: 'description', content: 'Найдем работу на hh.ru за вас. Автоматические отклики и сопроводительные письма.' }
  ]
})

onMounted(() => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    navigateTo('/dashboard')
  }

  captchaVisibilityListener = () => {
    void tryCaptchaAutoRetry()
  }
  document.addEventListener('visibilitychange', captchaVisibilityListener)
})

onUnmounted(() => {
  if (resendInterval) {
    clearInterval(resendInterval)
    resendInterval = null
  }
  if (resendBannerTimeout) {
    clearTimeout(resendBannerTimeout)
  }
  if (captchaVisibilityListener) {
    document.removeEventListener('visibilitychange', captchaVisibilityListener)
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
