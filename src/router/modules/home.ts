import { home } from '../enums'

export default {
  path: '/',
  name: 'home',
  component: () => import('../../layout/index.vue'),
  meta: {
    rank: home
  },
  children: [
    {
      path: '/welcome',
      name: 'Welcome',
      component: () => import('../../views/Welcome.vue')
    }
  ]
}
