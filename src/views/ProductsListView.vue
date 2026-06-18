<script setup lang="ts">
import { h, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { NDataTable, NTag, NSpin, NAlert, NButton, NIcon } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { CreateOutline } from '@vicons/ionicons5'
import { productRepository } from '@/repositories/productRepository'
import { getDisplayPrice, statusLabel } from '@/services/priceDisplay'
import { STATUS_ON_ORDER } from '@/types/product'
import type { Product } from '@/types/product'
import { useAsync } from '@/composables/useAsync'

const { data: products, loading, error, execute: load } = useAsync(productRepository.getAll)
onMounted(load)

const columns: DataTableColumns<Product> = [
  { title: 'ID', key: 'id', width: 70 },
  {
    title: 'Название',
    key: 'name',
    render: (row) =>
      h(RouterLink, { to: { name: 'product', params: { id: row.id } } }, () => row.name),
  },
  { title: 'Категория', key: 'category_name' },
  { title: 'Бренд', key: 'brand_name' },
  {
    title: 'Цена',
    key: 'price',
    render: (row) => getDisplayPrice(row),
  },
  {
    title: 'Статус',
    key: 'status',
    render: (row) =>
      h(
        NTag,
        {
          type: Number(row.status) === STATUS_ON_ORDER ? 'warning' : 'success',
          size: 'small',
          round: true,
        },
        () => statusLabel(row),
      ),
  },
  {
    title: '',
    key: 'actions',
    width: 60,
    render: (row) =>
      h(RouterLink, { to: { name: 'update', params: { id: row.id } } }, () =>
        h(
          NButton,
          { size: 'small', quaternary: true },
          { icon: () => h(NIcon, () => h(CreateOutline)) },
        ),
      ),
  },
]
</script>

<template>
  <h2 style="margin-top: 0">Товары</h2>
  <NAlert v-if="error" type="error" :title="error" style="margin-bottom: 16px" />
  <NSpin :show="loading">
    <NDataTable
      :columns="columns"
      :data="products ?? []"
      :row-key="(row: Product) => row.id"
      :bordered="true"
    />
  </NSpin>
</template>
