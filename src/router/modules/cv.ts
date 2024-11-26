import { t } from '@/i18n/config'
import type { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/cv',
  name: 'cv',
  component: () => import('@/views/cv/index.vue'),
  meta: {
    title: t('title.cv.list')
  },
  children: [
    {
      path: '/cv/:id',
      name: 'detail_cv',
      component: () => import('@/views/cv/Detail.vue'),
      meta: {
        title: t('title.cv.detail')
      }
    }
  ]
}

export default route
