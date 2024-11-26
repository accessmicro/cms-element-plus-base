import { HomeFilled } from '@element-plus/icons-vue'
import type { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/',
  name: 'home',
  redirect: '/dashboard',
  component: () => import('../../layout/index.vue'),
  meta: {
    title: 'Home',
    icon: HomeFilled
  },
  children: []
}
export default route
