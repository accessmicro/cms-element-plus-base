import { about } from '../enums'

export default {
  path: '/about',
  name: 'about',
  meta: {
    rank: about
  },
  component: () => import('../../views/AboutView.vue')
}
