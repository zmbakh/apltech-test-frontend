<script setup lang="ts">
import { useTemplateRef } from 'vue'
import type { ComponentExposed } from 'vue-component-type-helpers'
import ProductCreateForm from '@/components/ProductCreateForm.vue'
import { NCard, NAlert } from 'naive-ui'

const productCreateFormRef =
  useTemplateRef<ComponentExposed<typeof ProductCreateForm>>('productCreateFormRef')
</script>

<template>
  <NCard title="Создать товар" style="max-width: 540px">
    <NAlert
      v-if="productCreateFormRef?.error"
      type="error"
      :title="productCreateFormRef.error"
      style="margin-bottom: 16px"
    />
    <ProductCreateForm ref="productCreateFormRef" />
  </NCard>
</template>
