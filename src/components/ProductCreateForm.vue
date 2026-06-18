<script setup lang="ts">
import { useProductCreate } from '@/composables/product/useProductCreate.js'
import { NForm, NFormItem, NInput, NInputNumber, NSelect, NButton } from 'naive-ui'

const { fields, submit, error, fieldErrors, loading } = useProductCreate()

const statusOptions = [
  { label: 'В наличии', value: 1 },
  { label: 'Под заказ', value: 2 },
]

defineExpose({ error })
</script>

<template>
  <NForm>
    <NFormItem
      label="Название *"
      :validation-status="fieldErrors.name ? 'error' : undefined"
      :feedback="fieldErrors.name"
    >
      <NInput v-model:value="fields.name" />
    </NFormItem>

    <NFormItem
      label="Категория"
      :validation-status="fieldErrors.category_name ? 'error' : undefined"
      :feedback="fieldErrors.category_name"
    >
      <NInput v-model:value="fields.category_name" clearable />
    </NFormItem>

    <NFormItem
      label="Бренд"
      :validation-status="fieldErrors.brand_name ? 'error' : undefined"
      :feedback="fieldErrors.brand_name"
    >
      <NInput v-model:value="fields.brand_name" clearable />
    </NFormItem>

    <NFormItem
      label="Цена *"
      :validation-status="fieldErrors.price ? 'error' : undefined"
      :feedback="fieldErrors.price"
    >
      <NInputNumber v-model:value="fields.price" :min="1" style="width: 100%" />
    </NFormItem>

    <NFormItem
      label="РРЦ"
      :validation-status="fieldErrors.rrp_price ? 'error' : undefined"
      :feedback="fieldErrors.rrp_price"
    >
      <NInputNumber v-model:value="fields.rrp_price" :min="1" clearable style="width: 100%" />
    </NFormItem>

    <NFormItem
      label="Статус"
      :validation-status="fieldErrors.status ? 'error' : undefined"
      :feedback="fieldErrors.status"
    >
      <NSelect v-model:value="fields.status" :options="statusOptions" />
    </NFormItem>

    <NButton type="primary" :loading="loading" @click="submit()">Создать</NButton>
  </NForm>
</template>
