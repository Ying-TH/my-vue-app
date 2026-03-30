import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(JSON.parse(localStorage.getItem('portal_user') || 'null'))
  const token = ref(localStorage.getItem('portal_token') || null)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const initials = computed(() => {
    if (!user.value?.name) return '?'
    return user.value.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  })

  // Actions
  async function login(username, password) {
    // TODO: replace with real API call: POST /api/auth/login
    await new Promise((r) => setTimeout(r, 800)) // simulate network delay

    if (email && password.length >= 6) {
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email,
        role: 'admin',
        department: 'IT',
        avatar: null,
      }
      const mockToken = 'mock-jwt-token' + Date.now()

      user.value = mockUser
      token.value = mockToken
      localStorage.setItem('portal_user', JSON.stringify(mockUser))
      localStorage.setItem('portal_token', mockToken)
      return { success: true }
    }

    throw new Error('Invalid credentials. Please try again.')
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('portal_user')
    localStorage.removeItem('portal_token')
  }

  return { user, token, isAuthenticated, initials, login, logout }
})
