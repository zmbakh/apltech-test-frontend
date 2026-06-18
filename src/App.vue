<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push({ name: 'products' })
}
</script>

<template>
  <header class="topbar">
    <nav>
      <RouterLink :to="{ name: 'products' }">Товары</RouterLink>
      <RouterLink :to="{ name: 'brand' }">Мин/Макс по бренду</RouterLink>
      <RouterLink :to="{ name: 'create' }">Создать товар</RouterLink>
    </nav>
    <div class="auth">
      <template v-if="auth.isAuthenticated">
        <span class="user">{{ auth.username }}</span>
        <button @click="logout">Выйти</button>
      </template>
      <RouterLink v-else :to="{ name: 'login' }">Войти</RouterLink>
    </div>
  </header>

  <main class="container">
    <RouterView />
  </main>
</template>
