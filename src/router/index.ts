import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'products', component: () => import('@/views/ProductsListView.vue') },
    {
      path: '/product/:id(\\d+)',
      name: 'product',
      component: () => import('@/views/ProductView.vue'),
    },
    { path: '/brand', name: 'brand', component: () => import('@/views/BrandMinMaxView.vue') },
    { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },
    {
      path: '/create',
      name: 'create',
      component: () => import('@/views/ProductCreateView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/update/:id(\\d+)',
      name: 'update',
      component: () => import('@/views/ProductUpdateView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router
