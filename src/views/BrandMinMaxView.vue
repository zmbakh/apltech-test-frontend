<script setup lang="ts">
import { useBrandMinMaxView } from '@/composables/product/useBrandMinMaxView.ts'
import { NInput, NButton, NInputGroup, NAlert, NCard, NGrid, NGi } from 'naive-ui'

const { search, brand, result, loading, error } = useBrandMinMaxView()
</script>

<template>
  <h2 style="margin-top: 0">Мин/Макс цена по бренду</h2>

  <NInputGroup style="max-width: 480px">
    <NInput v-model:value="brand" placeholder="Например: Dell" @keyup.enter="search" />
    <NButton type="primary" :loading="loading" @click="search">Найти</NButton>
  </NInputGroup>

  <NAlert v-if="error" type="error" :title="error" style="margin-top: 16px" />

  <NGrid v-if="result" :cols="2" :x-gap="16" style="margin-top: 20px; max-width: 480px">
    <NGi>
      <NCard title="Самый дешёвый">
        <p style="margin: 0">ID: {{ result[0].min.id }}</p>
        <p style="margin: 8px 0 0">
          <strong>{{ result[0].min.price.toLocaleString('ru-RU') }} ₸</strong>
        </p>
      </NCard>
    </NGi>
    <NGi>
      <NCard title="Самый дорогой">
        <p style="margin: 0">ID: {{ result[1].max.id }}</p>
        <p style="margin: 8px 0 0">
          <strong>{{ result[1].max.price.toLocaleString('ru-RU') }} ₸</strong>
        </p>
      </NCard>
    </NGi>
  </NGrid>
</template>
