import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: 'user', component: () => import('@/views/user/index.vue') },
      { path: 'user/create', component: () => import('@/views/user/create.vue') },
    ],
  },
  { path: '/login', component: () => import('@/views/login/Index.vue') },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
export default router
