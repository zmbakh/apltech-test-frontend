<script setup lang="ts">
import { onMounted } from 'vue'
import { productRepository } from '@/repositories/productRepository'
import { getDisplayPrice, statusLabel } from '@/services/priceDisplay'
import { STATUS_ON_ORDER } from '@/types/product'
import { useAsync } from '@/composables/useAsync'

const { data: products, loading, error, execute: load } = useAsync(productRepository.getAll)
onMounted(load)
</script>

<template>
  <h1>Товары</h1>
  <div v-if="error" class="alert error">{{ error }}</div>
  <p v-if="loading" class="muted">Загрузка…</p>

  <table v-if="products">
    <thead>
      <tr>
        <th>ID</th>
        <th>Название</th>
        <th>Категория</th>
        <th>Бренд</th>
        <th>Цена</th>
        <th>Статус</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="p in products" :key="p.id">
        <td>{{ p.id }}</td>
        <td>
          <RouterLink :to="{ name: 'product', params: { id: p.id } }">{{ p.name }}</RouterLink>
        </td>
        <td>{{ p.category_name }}</td>
        <td>{{ p.brand_name }}</td>
        <td>{{ getDisplayPrice(p) }}</td>
        <td>
          <span class="badge" :class="Number(p.status) === STATUS_ON_ORDER ? 'order' : 'stock'">
            {{ statusLabel(p) }}
          </span>
        </td>
        <td><RouterLink :to="{ name: 'update', params: { id: p.id } }">✏️</RouterLink></td>
      </tr>
    </tbody>
  </table>
</template>
