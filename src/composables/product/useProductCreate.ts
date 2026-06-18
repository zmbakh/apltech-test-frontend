import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { useAsync } from '@/composables/useAsync.ts'
import { productRepository } from '@/repositories/productRepository.ts'
import type { ProductFormModel, ProductInput } from '@/types/product.ts'

export function useProductCreate() {
  const router = useRouter()

  const fields = reactive<ProductFormModel>({
    name: '',
    category_name: null,
    brand_name: null,
    price: null,
    rrp_price: null,
    status: 1,
  })

  const { loading, error, fieldErrors, execute } = useAsync(productRepository.create)

  const submit = async(): Promise<void> => {
    try {
      const created = await execute({ ...fields } as ProductInput)
      router.push({ name: 'product', params: { id: created.id } })
    } catch {}
  }

  return {
    fields,
    submit,
    error,
    fieldErrors,
    loading,
  }
}
