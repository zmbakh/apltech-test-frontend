import { useAuthStore } from '@/stores/auth.ts'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'

export function useLogin() {
  const auth = useAuthStore()
  const route = useRoute()
  const router = useRouter()

  const fields = ref<{ username: string; password: string }>({
    username: '',
    password: '',
  })

  const error = ref<string | null>(null)
  const loading = ref(false)

  const submit = async (): Promise<void> => {
    error.value = null
    loading.value = true
    try {
      await auth.login(fields.value.username, fields.value.password)
      router.push((route.query.redirect as string) || { name: 'products' })
    } catch (e: unknown) {
      error.value =
        axios.isAxiosError(e) && e.response?.status === 401
          ? 'Неверный логин или пароль.'
          : 'Не удалось выполнить вход.'
    } finally {
      loading.value = false
    }
  }

  return {
    fields,
    submit,
    error,
    loading,
  }
}
