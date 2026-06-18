import { ref, type Ref } from 'vue'
import axios from 'axios'
import type { ValidationErrorItem } from '@/types/product'

export interface UseAsync<TArgs extends unknown[], TResult> {
  data: Ref<TResult | null>
  loading: Ref<boolean>
  error: Ref<string | null>
  fieldErrors: Ref<Record<string, string>>
  execute: (...args: TArgs) => Promise<TResult>
}

export function useAsync<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
): UseAsync<TArgs, TResult> {
  const data = ref(null) as Ref<TResult | null>
  const loading = ref(false)
  const error = ref<string | null>(null)
  const fieldErrors = ref<Record<string, string>>({})

  async function execute(...args: TArgs): Promise<TResult> {
    loading.value = true
    error.value = null
    fieldErrors.value = {}

    try {
      data.value = await fn(...args)
      return data.value
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response) {
        const res = e.response
        if (res.status === 422 && Array.isArray(res.data)) {
          fieldErrors.value = Object.fromEntries(
            (res.data as ValidationErrorItem[]).map(({ field, message }) => [field, message]),
          )
          error.value = 'Проверьте правильность заполнения полей.'
        } else if (res.status === 404) {
          error.value = (res.data as { message?: string })?.message ?? 'Не найдено.'
        } else if (res.status === 401) {
          error.value = 'Требуется авторизация.'
        } else {
          error.value = (res.data as { message?: string })?.message ?? 'Что-то пошло не так.'
        }
      } else {
        error.value = 'Сервер недоступен.'
      }
      throw e
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fieldErrors, execute }
}
