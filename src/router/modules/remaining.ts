import type { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    meta: {
      rank: 103
    },
    component: () => import('@/views/login/index.vue'),
  }
]

export default route
