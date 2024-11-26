<template>
  <div class="breadcrumb-navigation">
    <ElBreadcrumb separator="/">
      <ElBreadcrumbItem
        v-for="(item, index) in breadcrumbList"
        :to="{ path: toPath(item) }"
        :key="item.path"
      >
        <div class="flex items-center">
          <ElIcon v-if="item.meta?.icon" class="mr-1" size="medium">
            <component :is="item.meta.icon" class="icon" />
          </ElIcon>
          <ElText class="font-medium" :type="index !== breadcrumbList.length - 1 ? '' : 'primary'"
            >{{ item.meta?.title || '...' }}
          </ElText>
        </div>
      </ElBreadcrumbItem>
    </ElBreadcrumb>
  </div>
</template>

<script setup lang="ts">
import { getBreadcrumbList } from '@/utils'
import { ElBreadcrumb, ElBreadcrumbItem, ElIcon, ElText } from 'element-plus'
import { ref, watch } from 'vue'
import { useRoute, type RouteRecordRaw } from 'vue-router'

const breadcrumbList = ref<RouteRecordRaw[]>([])
const route = useRoute()

function toPath(item: RouteRecordRaw) {
  return item.path
    .split('/')
    .map((path) => {
      if (path.startsWith(':')) {
        return route.params[path.slice(1)]
      }
      return path
    })
    .join('/')
}

watch(
  route,
  (to) => {
    breadcrumbList.value = getBreadcrumbList(to)
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss">
.breadcrumb-navigation {
  .icon path {
    @apply fill-primary;
  }
}
</style>
