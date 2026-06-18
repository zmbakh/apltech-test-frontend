import http from '@/api/http'

export interface LoginResponse {
  token: string
  token_type: string
  expires_in: number
}

export const authRepository = {
  async login(username: string, password: string): Promise<LoginResponse> {
    const { data } = await http.post<LoginResponse>('/api/auth/login', { username, password })
    return data
  },
}
