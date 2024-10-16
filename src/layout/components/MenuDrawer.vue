<template>
  <keep-alive>
    <component
      :is="componentName"
      v-model="systemStore.openMenuDrawer"
      title="Menu"
      direction="ltr"
      modal-class="menu-drawer"
      style="--el-menu-base-level-padding: 10px"
      class="h-full"
    >
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo h-full"
        :collapse="systemStore.collapsedMenu"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group>
            <template #title><span>Group One</span></template>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title><span>item four</span></template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <template #title>Navigator Two</template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <template #title>Navigator Three</template>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <template #title>Navigator Four</template>
        </el-menu-item>
      </el-menu>
    </component>
  </keep-alive>
</template>

<script lang="ts" setup>
import { useSystemStore } from '@/stores/modules/system'
import { onBeforeUnmount, onMounted, ref } from 'vue'

import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'

const systemStore = useSystemStore()

const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
// handle resize window then change container component's name
const componentName = ref('el-drawer')
const handleResize = () => {
  // systemStore.openMenuDrawer = false
  if (window.innerWidth < 768) {
    systemStore.collapsedMenu = false
    componentName.value = 'el-drawer'
  } else {
    componentName.value = 'div'
  }
}
onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style>
.menu-drawer {
  .el-menu-vertical-demo {
    opacity: 0.5;
    background-color: transparent;
  }
}
</style>
