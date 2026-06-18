<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NMenu,
  NButton,
  NText,
  NSpace,
} from 'naive-ui'
import type { MenuOption } from 'naive-ui'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const menuOptions: MenuOption[] = [
  { label: 'Товары', key: 'products' },
  { label: 'Мин/Макс по бренду', key: 'brand' },
  { label: 'Создать товар', key: 'create' },
]

const activeKey = computed(() => {
  const name = route.name as string
  if (name === 'product' || name === 'update') return 'products'
  return name
})

const handleMenuSelect = (key: string) => {
  router.push({ name: key })
}

const logout = () => {
  auth.logout()
  router.push({ name: 'products' })
}
</script>

<template>
  <NConfigProvider>
    <NLayout style="min-height: 100vh">
      <NLayoutHeader
        bordered
        style="
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          position: sticky;
          top: 0;
          z-index: 100;
        "
      >
        <NMenu
          mode="horizontal"
          :value="activeKey"
          :options="menuOptions"
          style="flex: 1; border-bottom: none"
          @update:value="handleMenuSelect"
        />
        <NSpace align="center">
          <template v-if="auth.isAuthenticated">
            <NText depth="3">{{ auth.username }}</NText>
            <NButton size="small" @click="logout">Выйти</NButton>
          </template>
          <NButton v-else size="small" @click="router.push({ name: 'login' })">Войти</NButton>
        </NSpace>
      </NLayoutHeader>
      <NLayoutContent style="padding: 24px">
        <div style="max-width: 960px; margin: 0 auto">
          <RouterView />
        </div>
      </NLayoutContent>
    </NLayout>
  </NConfigProvider>
</template>
