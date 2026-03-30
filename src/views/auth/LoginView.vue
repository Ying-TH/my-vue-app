<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const form = reactive({ email: '', password: '', remember: false })
const formErrors = reactive({ email: '', password: '' })
const error = ref('')
const submitting = ref(false)
const showPassword = ref(false)

const features = [
  'Secure single sign-on with corporate LDAP',
  'Files, calendar, and tasks in one view',
  'Real-time team communication via Talk',
  'Role-based access across all modules',
]

function validate() {
  formErrors.email = ''
  formErrors.password = ''
  let ok = true
  if (!form.email) {
    formErrors.email = 'Email is required.'
    ok = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    formErrors.email = 'Enter a valid email address.'
    ok = false
  }
  if (!form.password) {
    formErrors.password = 'Password is required.'
    ok = false
  } else if (form.password.length < 6) {
    formErrors.password = 'Password must be at least 6 characters.'
    ok = false
  }
  return ok
}

async function handleSubmit() {
  error.value = ''
  if (!validate()) return
  submitting.value = true
  try {
    await auth.login(form.email, form.password)
    const redirect = route.query.redirect || '/portal/dashboard'
    router.push(redirect)
  } catch (err) {
    error.value = err.message
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex" style="background: oklch(var(--b2))">
    <!-- Left panel: branding -->
    <div
      class="hidden lg:flex lg:w-1/2 flex-col justify-between p-12"
      style="background: oklch(var(--p)); color: oklch(var(--pc))"
    >
      <div>
        <div class="flex items-center gap-3 mb-12">
          <div
            class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold text-lg"
          >
            C
          </div>
          <span class="font-bold text-xl tracking-tight">CorpPortal</span>
        </div>
        <h1 class="text-4xl font-bold leading-snug mb-4">Your internal workspace,<br />unified.</h1>
        <p class="text-base opacity-70 leading-relaxed max-w-sm">
          Files, communication, planning, and people — all in one place. Sign in to access your
          tools and team.
        </p>
      </div>

      <!-- Feature bullets -->
      <div class="space-y-3">
        <div v-for="f in features" :key="f" class="flex items-center gap-3 opacity-80">
          <div class="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
          <span class="text-sm">{{ f }}</span>
        </div>
      </div>
    </div>

    <!-- Right panel: login form -->
    <div class="flex-1 flex items-center justify-center p-6">
      <div class="w-full max-w-sm">
        <!-- Mobile logo -->
        <div class="flex items-center gap-2 mb-8 lg:hidden">
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
            style="background: oklch(var(--p))"
          >
            C
          </div>
          <span class="font-bold text-lg">CorpPortal</span>
        </div>

        <h2 class="text-2xl font-bold mb-1">Sign in</h2>
        <p class="text-sm opacity-60 mb-8">Use your corporate credentials to continue.</p>

        <!-- Error alert -->
        <div v-if="error" role="alert" class="alert alert-error mb-5 py-3">
          <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
          <span class="text-sm">{{ error }}</span>
        </div>

        <!-- Form -->
        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div class="form-control">
            <label class="label pb-1">
              <span class="label-text font-medium text-sm">Email / Username</span>
            </label>
            <input
              v-model="form.email"
              type="email"
              placeholder="you@company.com"
              class="input input-bordered w-full text-sm"
              :class="{ 'input-error': formErrors.email }"
              autocomplete="username"
            />
            <p v-if="formErrors.email" class="text-error text-xs mt-1">{{ formErrors.email }}</p>
          </div>

          <div class="form-control">
            <label class="label pb-1">
              <span class="label-text font-medium text-sm">Password</span>
              <a href="#" class="label-text-alt text-xs" style="color: oklch(var(--s))"
                >Forgot password?</a
              >
            </label>
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="input input-bordered w-full text-sm"
              :class="{ 'input-error': formErrors.password }"
              autocomplete="current-password"
            />
            <p v-if="formErrors.password" class="text-error text-xs mt-1">
              {{ formErrors.password }}
            </p>
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                v-model="form.remember"
                type="checkbox"
                class="checkbox checkbox-sm checkbox-primary"
              />
              <span class="text-sm">Keep me signed in</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input v-model="showPassword" type="checkbox" class="checkbox checkbox-sm" />
              <span class="text-xs opacity-60">Show</span>
            </label>
          </div>

          <button
            type="submit"
            class="btn btn-primary w-full"
            :class="{ loading: submitting }"
            :disabled="submitting"
          >
            <span v-if="submitting" class="loading loading-spinner loading-sm" />
            {{ submitting ? 'Signing in…' : 'Sign In' }}
          </button>
        </form>

        <p class="text-xs opacity-40 text-center mt-8">
          Access is restricted to authorised personnel only.<br />
          Contact IT if you cannot log in.
        </p>
      </div>
    </div>
  </div>
</template>
