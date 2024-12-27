import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
const routes = [
  {
    path: '/',
    component: Layout,
    name: 'layout',
    // children: [
    //   {
    //     path: 'user',
    //     component: () => import('@/views/user/index.vue'),
    //     meta: { name1: '用户管理', name2: '用户列表' },
    //   },
    //   {
    //     path: 'user/create',
    //     component: () => import('@/views/user/create.vue'),
    //     meta: { name1: '用户管理', name2: '用户创建' },
    //   },
    //   {
    //     path: 'role',
    //     component: () => import('@/views/role/roleList.vue'),
    //     meta: { name1: '角色管理', name2: '角色列表' },
    //   },
    //   {
    //     path: 'role/create',
    //     component: () => import('@/views/role/roleCreate.vue'),
    //     meta: { name1: '角色管理', name2: '角色创建' },
    //   },
    //   {
    //     path: 'auth',
    //     component: () => import('@/views/auth/AuthList.vue'),
    //     meta: { name1: '权限管理', name2: '权限列表' },
    //   },
    //   {
    //     path: 'auth/create',
    //     component: () => import('@/views/auth/CreateAuth.vue'),
    //     meta: { name1: '权限管理', name2: '权限创建' },
    //   },
    //   {
    //     path: 'analysis',
    //     component: () => import('@/views/index/analysis.vue'),
    //     meta: { name1: '后台首页', name2: '数据分析' },
    //   },
    //   {
    //     path: '/bigdata',
    //     component: () => import('@/views/index/bigData.vue'),
    //     meta: { name1: '后台首页', name2: '大屏数据可视化' },
    //   },
    //   {
    //     path: '/fsdy/film',
    //     component: () => import('@/views/fsdy/film/index.vue'),
    //     meta: { name1: '锋神电影', name2: '电影管理' },
    //   },
    //   {
    //     path: '/fsdy/cinema',
    //     component: () => import('@/views/fsdy/cinema/index.vue'),
    //     meta: { name1: '锋神电影', name2: '影院管理' },
    //   },
    //   {
    //     path: '/fsdy/music',
    //     component: () => import('@/views/fsdy/music/index.vue'),
    //     meta: { name1: '锋神电影', name2: '音乐管理' },
    //   },
    //   {
    //     path: '/ftwm/store',
    //     component: () => import('@/views/ftwm/store/index.vue'),
    //     meta: { name1: '锋团外卖', name2: '门店管理' },
    //   },
    //   {
    //     path: '/ftwm/goods',
    //     component: () => import('@/views/ftwm/goods/index.vue'),
    //     meta: { name1: '锋团外卖', name2: '门店管理' },
    //   },
    //   {
    //     path: '/dcm/user',
    //     component: () => import('@/views/dcm/user.vue'),
    //     meta: { name1: '堵车么', name2: '用户管理' },
    //   },
    //   {
    //     path: '/dcm/road',
    //     component: () => import('@/views/dcm/road.vue'),
    //     meta: { name1: '堵车么', name2: '路况信息' },
    //   },
    //   {
    //     path: '/order',
    //     component: () => import('@/views/order/index.vue'),
    //     meta: { name1: '订单管理', name2: '订单列表' },
    //   },
    // ],
  },
  { path: '/login', component: () => import('@/views/login/Index.vue') },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
export default router
