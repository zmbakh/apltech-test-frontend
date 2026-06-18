import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import type { Product, ProductFormModel, ProductPatch } from '@/types/product.ts'
import { useAsync } from '@/composables/useAsync.ts'
import { productRepository } from '@/repositories/productRepository.ts'

export function useProductUpdate() {
  const route = useRoute()
  const router = useRouter()
  const id = route.params.id as string

  const fields = reactive<ProductFormModel>({
    name: '',
    category_name: null,
    brand_name: null,
    price: null,
    rrp_price: null,
    status: 1,
  })

  let original: Product | null = null
  const loaded = ref(false)

  const { execute: loadProductExecute, error: loadError } = useAsync(productRepository.getById)

  const {
    execute: saveProductExecute,
    error: saveError,
    fieldErrors,
    loading,
  } = useAsync((fields: ProductPatch) => productRepository.update(id, fields))

  onMounted(async () => {
    try {
      const loadedProduct = await loadProductExecute(id)
      original = loadedProduct
      Object.assign(fields, loadedProduct)
      loaded.value = true
    } catch {}
  })

  const changedFields = (): ProductPatch => {
    if (!original) return {}
    const orig = original as unknown as Record<string, unknown>
    return Object.fromEntries(
      Object.entries(fields).filter(([k, v]) => k !== 'id' && v !== orig[k]),
    ) as ProductPatch
  }

  const submit = async (): Promise<void> => {
    const diff = changedFields()
    if (Object.keys(diff).length === 0) return
    try {
      await saveProductExecute(diff)
      router.push({ name: 'product', params: { id } })
    } catch {}
  }

  return {
    fields,
    submit,
    loadError,
    saveError,
    fieldErrors,
    loading,
  }
}
