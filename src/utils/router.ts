import { constantRoutes } from '@/router'
import { type RouteRecordRaw } from 'vue-router'

function formatTwoStageRoutes(routesList: RouteRecordRaw[]) {
  if (routesList.length === 0) return routesList
  const newRoutesList: RouteRecordRaw[] = []
  routesList.forEach((v: RouteRecordRaw) => {
    if (v.path === '/') {
      newRoutesList.push({
        component: v?.component,
        name: v?.name,
        path: v?.path,
        redirect: v?.redirect,
        meta: v?.meta || {},
        children: []
      })
    } else {
      newRoutesList?.[0]?.children?.push({ ...v })
    }
  })
  return newRoutesList
}

function formatFlatteningRoutes(routesList: RouteRecordRaw[]) {
  if (routesList.length === 0) return routesList
  let hierarchyList = buildHierarchyTree(routesList)
  for (let i = 0; i < hierarchyList.length; i++) {
    if (hierarchyList[i].children) {
      hierarchyList = hierarchyList
        .slice(0, i + 1)
        .concat(hierarchyList[i].children, hierarchyList.slice(i + 1))
    }
  }
  return hierarchyList
}

function buildHierarchyTree(tree: any[], pathList = []): any {
  if (!Array.isArray(tree)) {
    console.warn('tree must be an array')
    return []
  }
  if (!tree || tree.length === 0) return []
  for (const [key, node] of tree.entries()) {
    node.id = key
    node.parentId = pathList.length ? pathList[pathList.length - 1] : null
    node.pathList = [...pathList, node.id]
    const hasChildren = node.children && node.children.length > 0
    if (hasChildren) {
      buildHierarchyTree(node.children, node.pathList)
    }
  }
  return tree
}

function getBreadcrumbList(route: any) {
  const allRoutes = [...constantRoutes, ...(constantRoutes[0].children || [])]
  const { path: currentPath } = route.matched[route.matched.length - 1]
  const listRouteMatched = allRoutes
    .filter((v) => currentPath.startsWith(v.path))
    .sort((a, b) => a.path.length - b.path.length)
  return listRouteMatched
}

export { formatTwoStageRoutes, formatFlatteningRoutes, buildHierarchyTree, getBreadcrumbList }
