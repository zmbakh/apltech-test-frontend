<script setup lang="ts">
import { useBrandMinMaxView } from '@/composables/product/useBrandMinMaxView.ts'

const { search, brand, result, loading, error } = useBrandMinMaxView()
</script>

<template>
  <h1>Мин/Макс цена по бренду</h1>

  <div
    class="form"
    style="grid-template-columns: 1fr auto; display: grid; gap: 10px; max-width: 480px"
  >
    <input v-model="brand" type="text" placeholder="Например: Dell" @keyup.enter="search" />
    <button :disabled="loading" @click="search">Найти</button>
  </div>

  <div v-if="error" class="alert error" style="margin-top: 16px">{{ error }}</div>

  <div v-if="result" style="display: flex; gap: 16px; margin-top: 20px">
    <div class="card">
      <h3>Самый дешёвый</h3>
      <p>ID: {{ result[0].min.id }}</p>
      <p>
        <strong>{{ result[0].min.price.toLocaleString('ru-RU') }} ₸</strong>
      </p>
    </div>
    <div class="card">
      <h3>Самый дорогой</h3>
      <p>ID: {{ result[1].max.id }}</p>
      <p>
        <strong>{{ result[1].max.price.toLocaleString('ru-RU') }} ₸</strong>
      </p>
    </div>
  </div>
</template>
