import { createRouter, createWebHistory, type Router, type RouteRecordRaw } from 'vue-router'
import { buildHierarchyTree, formatFlatteningRoutes, formatTwoStageRoutes } from '@/utils'
import remainingRouter from './modules/remaining'

const modules: Record<string, any> = import.meta.glob(
  ['./modules/**/*.ts', '!./modules/**/remaining.ts'],
  {
    eager: true
  }
)

const routes: any[] = []

Object.keys(modules).forEach((key) => {
  routes.push(modules[key].default)
})

export const constantRoutes: Array<RouteRecordRaw> = formatTwoStageRoutes(
  formatFlatteningRoutes(buildHierarchyTree(routes.flat(Infinity)))
)

export const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes.concat(...(remainingRouter as any))
})

export default router
