<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { NCard, NTag, NSpin, NAlert, NButton, NSpace, NText, NIcon } from 'naive-ui'
import { CreateOutline } from '@vicons/ionicons5'
import { productRepository } from '@/repositories/productRepository'
import { getDisplayPrice, statusLabel } from '@/services/priceDisplay'
import { STATUS_ON_ORDER } from '@/types/product'
import { useAsync } from '@/composables/useAsync'

const route = useRoute()
const { data: product, loading, error, execute } = useAsync(productRepository.getById)
onMounted(() => execute(route.params.id as string).catch(() => {}))
</script>

<template>
  <NAlert v-if="error" type="error" :title="error" style="margin-bottom: 16px" />
  <NSpin :show="loading">
    <NCard v-if="product" style="max-width: 560px">
      <template #header>
        <NSpace justify="space-between" align="center">
          <span style="font-size: 18px; font-weight: 600">{{ product.name }}</span>
          <RouterLink :to="{ name: 'update', params: { id: product.id } }">
            <NButton type="primary" size="small">
              <template #icon
                ><NIcon><CreateOutline /></NIcon
              ></template>
              Редактировать
            </NButton>
          </RouterLink>
        </NSpace>
      </template>

      <div style="display: grid; gap: 16px">
        <div>
          <NText
            depth="3"
            style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em"
            >Цена</NText
          >
          <div style="font-size: 20px; font-weight: 600; margin-top: 2px">
            {{ getDisplayPrice(product) }}
          </div>
        </div>

        <div>
          <NText
            depth="3"
            style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em"
            >Статус</NText
          >
          <div style="margin-top: 6px">
            <NTag
              :type="Number(product.status) === STATUS_ON_ORDER ? 'warning' : 'success'"
              size="medium"
              round
            >
              {{ statusLabel(product) }}
            </NTag>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px">
          <div>
            <NText
              depth="3"
              style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em"
              >Категория</NText
            >
            <div style="margin-top: 2px">{{ product.category_name || '—' }}</div>
          </div>
          <div>
            <NText
              depth="3"
              style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em"
              >Бренд</NText
            >
            <div style="margin-top: 2px">{{ product.brand_name || '—' }}</div>
          </div>
        </div>
      </div>
    </NCard>
  </NSpin>
</template>
