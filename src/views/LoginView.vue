<script setup lang="ts">
import { useLogin } from '@/composables/auth/useLogin.ts'
import { NCard, NForm, NFormItem, NInput, NButton, NAlert } from 'naive-ui'

const { fields, submit, error, loading } = useLogin()
</script>

<template>
  <div style="max-width: 400px; margin: 60px auto">
    <NCard title="Вход в систему">
      <NAlert v-if="error" type="error" :title="error" style="margin-bottom: 16px" />
      <NForm>
        <NFormItem label="Логин">
          <NInput v-model:value="fields.username" @keyup.enter="submit" />
        </NFormItem>
        <NFormItem label="Пароль">
          <NInput
            v-model:value="fields.password"
            type="password"
            show-password-on="click"
            @keyup.enter="submit"
          />
        </NFormItem>
        <NButton type="primary" :loading="loading" block @click="submit">Войти</NButton>
      </NForm>
    </NCard>
  </div>
</template>
