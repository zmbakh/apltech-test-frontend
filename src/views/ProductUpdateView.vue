<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useTemplateRef } from 'vue'
import type { ComponentExposed } from 'vue-component-type-helpers'
import ProductUpdateForm from '@/components/ProductUpdateForm.vue'
import { NCard, NAlert } from 'naive-ui'

const route = useRoute()
const productUpdateFormRef =
  useTemplateRef<ComponentExposed<typeof ProductUpdateForm>>('productUpdateFormRef')
</script>

<template>
  <NCard :title="`Редактировать товар #${route.params.id}`" style="max-width: 540px">
    <NAlert
      v-if="productUpdateFormRef?.loadError"
      type="error"
      :title="productUpdateFormRef.loadError"
      style="margin-bottom: 8px"
    />
    <NAlert
      v-if="productUpdateFormRef?.saveError"
      type="error"
      :title="productUpdateFormRef.saveError"
      style="margin-bottom: 16px"
    />
    <ProductUpdateForm ref="productUpdateFormRef" />
  </NCard>
</template>
