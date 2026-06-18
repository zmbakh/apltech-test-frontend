<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useTemplateRef } from 'vue'
import type { ComponentExposed } from 'vue-component-type-helpers'
import type ProductUpdateForm from '@/components/ProductUpdateForm.vue'

const route = useRoute()

const productUpdateFormRef =
  useTemplateRef<ComponentExposed<typeof ProductUpdateForm>>('productUpdateFormRef')
</script>

<template>
  <h1>Редактировать товар #{{ route.params.id }}</h1>

  <div
    v-if="productUpdateFormRef?.loadError || productUpdateFormRef?.saveError"
    class="alert error"
  >
    <div>
      {{ productUpdateFormRef.loadError }}
    </div>
    <div>
      {{ productUpdateFormRef.saveError }}
    </div>
  </div>

  <ProductUpdateForm ref="productUpdateFormRef" />
</template>
