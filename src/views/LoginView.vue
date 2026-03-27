<script setup>
import { ref, reactive } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'

const router = useRouter()

const form = reactive({ email: '', password: '', remember: false })
const formErrors = reactive({ email: '', password: '' })
const error = ref('')
const submitting = ref(false)

function validate() {
  formErrors.email = ''
  formErrors.password = ''
  let valid = true

  if (!form.email) {
    formErrors.email = 'Email is required.'
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    formErrors.email = 'Please enter a valid email address.'
    valid = false
  }

  if (!form.password) {
    formErrors.password = 'Password is required.'
    valid = false
  } else if (form.password.length < 6) {
    formErrors.password = 'Password must be at least 6 characters.'
    valid = false
  }

  return valid
}

async function handleSubmit() {
  error.value = ''
  if (!validate()) return

  submitting.value = true
  try {
    // TODO: replace with real auth call, e.g. await authStore.login(form.email, form.password)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push({ name: 'home' })
  } catch (err) {
    error.value = err.message || 'Invalid email or password. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center py-12 px-4">
    <div class="w-full max-w-md">
      <!-- Masthead -->
      <div class="text-center mb-8">
        <RouterLink to="/" class="inline-block">
          <h1
            class="font-display font-black text-4xl text-primary hover:text-accent transition-colors"
          >
            The Scoop
          </h1>
        </RouterLink>
        <p class="dateline mt-1 text-base-content/50">Members access · Sign in to continue</p>
      </div>

      <BaseCard shadow="xl" :bordered="true">
        <div class="space-y-1 mb-6">
          <h2 class="font-display font-bold text-2xl">Welcome back</h2>
          <p class="font-body text-sm text-base-content/60">
            Sign in to your account to read unlimited stories.
          </p>
        </div>

        <!-- Error alert -->
        <div v-if="error" role="alert" class="alert alert-error mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span class="font-body text-sm">{{ error }}</span>
        </div>

        <!-- Form -->
        <form class="space-y-4" @submit.prevent="handleSubmit">
          <BaseInput
            v-model="form.email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            :required="true"
            :error="formErrors.email"
          />

          <div>
            <BaseInput
              v-model="form.password"
              label="Password"
              type="password"
              placeholder="••••••••"
              :required="true"
              :error="formErrors.password"
            />
            <div class="text-right mt-1">
              <a href="#" class="font-body text-xs text-accent hover:underline">Forgot password?</a>
            </div>
          </div>

          <!-- Remember me -->
          <div class="flex items-center gap-2">
            <input
              v-model="form.remember"
              type="checkbox"
              id="remember"
              class="checkbox checkbox-sm checkbox-primary"
            />
            <label for="remember" class="font-body text-sm cursor-pointer">Keep me signed in</label>
          </div>

          <BaseButton
            variant="primary"
            size="lg"
            type="submit"
            :loading="submitting"
            class="w-full"
          >
            Sign In
          </BaseButton>
        </form>

        <!-- Divider -->
        <div class="divider font-body text-xs text-base-content/40 my-4">OR</div>

        <!-- Google OAuth placeholder -->
        <button class="btn btn-outline btn-sm w-full font-body gap-2">
          <svg class="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        <!-- Register -->
        <p class="font-body text-sm text-center text-base-content/60 mt-6">
          Don't have an account?
          <a href="#" class="text-accent font-semibold hover:underline">Create one free</a>
        </p>
      </BaseCard>
    </div>
  </div>
</template>
