<template>
  <keep-alive>
    <component
      :is="'div'"
      direction="ltr"
      class="left-sidebar"
      style="--el-menu-base-level-padding: 10px"
    >
      <ElMenu
        class="menu"
        :collapse="systemStore.collapsedMenu"
        router
        :default-active="route.path"
        :popper-offset="2"
        unique-opened
        :hide-timeout="0"
        :show-timeout="0"
        :collapse-transition="false"
      >
        <ElMenuItem index="/dashboard">
          <ElIcon>
            <setting />
          </ElIcon>
          <template #title>Navigator Four</template>
        </ElMenuItem>
        <el-sub-menu>
          <template #title>
            <ElIcon>
              <location />
            </ElIcon>
            <span>Navigator One</span>
          </template>
          <ElMenuItemGroup>
            <ElMenuItem index="/cv">item two</ElMenuItem>
          </ElMenuItemGroup>
        </el-sub-menu>
      </ElMenu>
    </component>
  </keep-alive>
</template>

<script lang="ts" setup>
import { useSystemStore } from '@/stores/modules/system'

import { Location, Setting } from '@element-plus/icons-vue'
import { ElIcon, ElMenu, ElMenuItem, ElMenuItemGroup } from 'element-plus'
import { useRoute } from 'vue-router'

const systemStore = useSystemStore()
const route = useRoute()
</script>

<style lang="scss">
.left-sidebar {
  background-color: var(--el-color-primary);

  .menu {
    --el-menu-active-color: var(--el-color-primary-light-2);
    --el-menu-text-color: var(--el-color-primary-light-7);
    --el-menu-hover-text-color: var(--el-color-primary-light-2);
    --el-menu-bg-color: var(--el-color-primary);
    --el-menu-hover-bg-color: var(--el-color-primary-light-2);
    --el-menu-item-hover-fill: var(--el-color-primary-light-7);
    --el-menu-border-color: none;
    background-color: unset;
    &:not(.el-menu--collapse) {
      width: 220px;
    }
  }

  .el-menu-item {
    &.is-active {
      @apply bg-primary-7 font-medium;
    }
  }

  .el-sub-menu {
    @apply relative;
    &.is-active {
      &::before {
        content: '';
        @apply absolute left-0 z-[1] h-full w-[2px] bg-primary-7;
      }
    }
    &.is-opened {
      @apply relative bg-primary-dark;
      &::before {
        content: '';
        @apply absolute left-0 z-[1] h-full w-[2px] bg-primary-7;
      }
      .el-menu.el-menu--inline {
        @apply bg-transparent;
      }
    }
  }

  .el-menu--collapse {
    .el-sub-menu {
      @apply h-[44px];

      .el-sub-menu__title {
        @apply h-[44px];
      }
      &.is-active {
        .el-sub-menu__title {
          @apply bg-primary-7;
        }
      }
    }
    .el-menu-item {
      @apply h-[44px];
    }
  }
}
.el-menu--popup {
  .el-menu-item {
    &.is-active {
      @apply bg-primary-7 font-medium;
    }
  }
}
</style>
