import { defineStore } from 'pinia'
import { authRepository } from '@/repositories/authRepository'

interface AuthState {
  token: string | null
  username: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('jwt_token'),
    username: localStorage.getItem('auth_username'),
  }),

  getters: {
    isAuthenticated: (state): boolean => Boolean(state.token),
  },

  actions: {
    async login(username: string, password: string): Promise<void> {
      const { token } = await authRepository.login(username, password)
      this.token = token
      this.username = username
      localStorage.setItem('jwt_token', token)
      localStorage.setItem('auth_username', username)
    },

    logout(): void {
      this.token = null
      this.username = null
      localStorage.removeItem('jwt_token')
      localStorage.removeItem('auth_username')
    },
  },
})
