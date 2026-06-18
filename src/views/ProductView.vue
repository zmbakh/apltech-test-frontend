<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { productRepository } from '@/repositories/productRepository'
import { getDisplayPrice, statusLabel } from '@/services/priceDisplay'
import { useAsync } from '@/composables/useAsync'

const route = useRoute()
const { data: product, loading, error, execute } = useAsync(productRepository.getById)
onMounted(() => execute(route.params.id as string).catch(() => {}))
</script>

<template>
  <div v-if="error" class="alert error">{{ error }}</div>
  <p v-if="loading" class="muted">Загрузка…</p>

  <div v-if="product" class="card">
    <h1>{{ product.name }}</h1>
    <p><strong>Цена:</strong> {{ getDisplayPrice(product) }}</p>
    <p><strong>Категория:</strong> {{ product.category_name || '—' }}</p>
    <p><strong>Бренд:</strong> {{ product.brand_name || '—' }}</p>
    <p><strong>Статус:</strong> {{ statusLabel(product) }}</p>
    <RouterLink :to="{ name: 'update', params: { id: product.id } }">
      <button>Редактировать</button>
    </RouterLink>
  </div>
</template>
