<script setup lang="ts">
import { useProductCreate } from '@/composables/product/useProductCreate.js'

const { fields, submit, error, fieldErrors, loading } = useProductCreate()

defineExpose({
  error,
})
</script>

<template>
  <div class="form">
    <label>
      Название *
      <input v-model="fields.name" type="text" />
      <span v-if="fieldErrors?.name" class="field-error">{{ fieldErrors.name }}</span>
    </label>

    <label>
      Категория
      <input v-model="fields.category_name" type="text" />
      <span v-if="fieldErrors?.category_name" class="field-error">{{
        fieldErrors.category_name
      }}</span>
    </label>

    <label>
      Бренд
      <input v-model="fields.brand_name" type="text" />
      <span v-if="fieldErrors?.brand_name" class="field-error">{{ fieldErrors.brand_name }}</span>
    </label>

    <label>
      Цена *
      <input v-model.number="fields.price" type="number" min="1" />
      <span v-if="fieldErrors?.price" class="field-error">{{ fieldErrors.price }}</span>
    </label>

    <label>
      РРЦ
      <input v-model.number="fields.rrp_price" type="number" min="1" />
      <span v-if="fieldErrors?.rrp_price" class="field-error">{{ fieldErrors.rrp_price }}</span>
    </label>

    <label>
      Статус
      <select v-model.number="fields.status">
        <option :value="1">В наличии</option>
        <option :value="2">Под заказ</option>
      </select>
      <span v-if="fieldErrors?.status" class="field-error">{{ fieldErrors.status }}</span>
    </label>

    <button :disabled="loading" @click="submit()">
      {{ loading ? 'Сохранение…' : 'Создать' }}
    </button>
  </div>
</template>
