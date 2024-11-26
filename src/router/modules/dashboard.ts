export default {
  path: '/dashboard',
  name: 'dashboard',
  component: () => import('../../views/dashboard/index.vue'),
  meta: {
    title: 'Dashboard'
  }
}
