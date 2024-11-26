<template>
  <ElContainer class="common-layout" :class="!isShowSidebar && 'drawer-sidebar'">
    <ElContainer>
      <div
        v-if="!isShowSidebar && isOpenMenuDrawer"
        class="menu-drawer-overlay"
        @click="systemStore.toggleMenuDrawer(false)"
      />
      <ElAside width="auto" class="flex flex-col" :style="styleLeftSidebar">
        <div class="flex-1">
          <Logo />
          <LeftSidebar />
        </div>
        <div
          v-if="isShowSidebar"
          class="toggle-sidebar-btn mb-[6px] flex cursor-pointer items-center pl-[10px]"
          :class="systemStore.collapsedMenu ? 'h-[44px]' : 'h-[56px]'"
          @click="systemStore.toggleCollapsedMenu"
        >
          <ElIcon
            type="primary"
            class="m-1 transition-transform duration-300 ease-out"
            :class="{ 'rotate-180': systemStore.collapsedMenu }"
          >
            <DArrowLeft />
          </ElIcon>
          <span v-if="!systemStore.collapsedMenu" class="pl-[10px]">{{ t('collapse') }}</span>
        </div>
      </ElAside>
      <ElContainer>
        <ElHeader>
          <Header />
        </ElHeader>
        <ElMain>
          <RouterView v-slot="{ Component }">
            <Transition name="fade">
              <component :is="Component" />
            </Transition>
          </RouterView>
        </ElMain>
      </ElContainer>
    </ElContainer>
  </ElContainer>
</template>
<script setup lang="ts">
import LeftSidebar from './components/LeftSidebar.vue'
import Header from './components/Header.vue'
import { ElContainer, ElHeader, ElIcon, ElMain } from 'element-plus'
import { DArrowLeft } from '@element-plus/icons-vue'
import { t } from '@/i18n/config'
import { useSystemStore } from '@/stores/modules/system'
import { useWindowSize } from '@vueuse/core'
import { computed, reactive, ref, watch, type CSSProperties } from 'vue'
import { SIZE_SCREEN } from '@/constants'
import { storeToRefs } from 'pinia'
import Logo from './components/Logo.vue'

const systemStore = useSystemStore()
const { isOpenMenuDrawer } = storeToRefs(systemStore)
const windowSize = reactive(useWindowSize())
const isShowSidebar = computed(() => windowSize.width > SIZE_SCREEN.lg)
const styleLeftSidebar = ref<CSSProperties>({})

watch(
  isShowSidebar,
  (newIsShowSideBar) => {
    if (!newIsShowSideBar) {
      styleLeftSidebar.value = {
        position: 'fixed',
        left: '-100%',
        zIndex: 1,
        transition: 'left 0.3s'
      }
      systemStore.toggleCollapsedMenu(false)
    } else {
      styleLeftSidebar.value = {}
      systemStore.toggleMenuDrawer(false)
    }
  },
  {
    immediate: true
  }
)

watch(
  isOpenMenuDrawer,
  (newVal) => {
    if (newVal) {
      styleLeftSidebar.value = {
        ...styleLeftSidebar.value,
        left: '0'
      }
    } else {
      styleLeftSidebar.value = {
        ...styleLeftSidebar.value,
        left: '-100%'
      }
    }
  },
  {
    immediate: true
  }
)
</script>
<style lang="scss">
.common-layout {
  @apply min-h-screen;

  .toggle-sidebar-btn {
    @apply border-0 border-t-1 border-solid border-t-primary-4 text-primary-7 hover:border-primary-2 hover:bg-primary-2;
  }

  .el-header,
  .el-footer {
    @apply h-auto bg-primary-9 p-0 text-primary;
  }

  .el-header {
    z-index: $zIndexHeader;
    @apply sticky top-0 flex h-[40px] w-full items-center border-b-1 border-b-primary-8 bg-[#ffffff79] px-6 backdrop-blur-md;
  }

  .el-footer {
    @apply px-6 py-2;
  }

  .el-aside {
    z-index: $zIndexHeader + 1 !important;
    @apply sticky bottom-0 left-0 top-0 h-screen bg-primary;
  }

  .el-main {
    color: var(--el-text-color-primary);
    @apply bg-primary-9 p-0;
  }
  .menu-drawer-overlay {
    z-index: $zIndexHeader + 1;
    @apply fixed inset-0 bg-primary-7 opacity-70;
  }
}
</style>
