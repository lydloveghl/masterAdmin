import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/index', component: Layout },
  { path: '/login', component: () => import('@/views/login/Index.vue') },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
