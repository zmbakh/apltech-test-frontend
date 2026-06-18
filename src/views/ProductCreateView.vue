<script setup lang="ts">
import { useTemplateRef } from 'vue'
import type { ComponentExposed } from 'vue-component-type-helpers'
import ProductCreateForm from '@/components/ProductCreateForm.vue'

const productCreateFormRef =
  useTemplateRef<ComponentExposed<typeof ProductCreateForm>>('productCreateFormRef')
</script>

<template>
  <h1>Создать товар</h1>
  <div v-if="productCreateFormRef?.error" class="alert error">
    {{ productCreateFormRef?.error }}
  </div>

  <ProductCreateForm ref="productCreateFormRef" />
</template>
