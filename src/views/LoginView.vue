<script setup lang="ts">
import { useLogin } from '@/composables/auth/useLogin.ts'

const { fields, submit, error, loading } = useLogin()
</script>

<template>
  <h1>Вход</h1>
  <div v-if="error" class="alert error">{{ error }}</div>

  <div class="form">
    <label>Логин <input v-model="fields.username" type="text" @keyup.enter="submit" /></label>
    <label>Пароль <input v-model="fields.password" type="password" @keyup.enter="submit" /></label>
    <button :disabled="loading" @click="submit">{{ loading ? 'Вход…' : 'Войти' }}</button>
  </div>
</template>
