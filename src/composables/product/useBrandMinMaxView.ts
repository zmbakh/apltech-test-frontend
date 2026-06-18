import { useAsync } from '@/composables/useAsync.ts'
import { productRepository } from '@/repositories/productRepository.ts'
import { ref } from 'vue'

export function useBrandMinMaxView() {
  const { data: result, loading, error, execute } = useAsync(productRepository.getBrandMinMax)

  const brand = ref('')

  const search = (): void => {
    if (brand.value.trim()) {
      execute(brand.value.trim()).catch(() => {})
    }
  }

  return {
    search,
    brand,
    result,
    loading,
    error,
  }
}
