<template>
  <div class="header-container flex items-center justify-between">
    <div class="header-left">
      <template v-if="!isShowSidebar">
        <ElButton
          type="default"
          :icon="Menu"
          class="!border-none !bg-primary-9"
          @click="() => systemStore.toggleMenuDrawer()"
        ></ElButton>
        <ElDivider direction="vertical" />
      </template>
      <BreadcrumbNavigation />
    </div>
    <div class="header-right">
      <ElSpace size="large">
        <ElButton type="text" @click="handleToggleFullScreen">
          <ElIcon :size="18">
            <FullScreen v-if="!isFullscreen" />
            <IconExitFullscreen v-else />
          </ElIcon>
        </ElButton>
        <HeaderNotice />
        <ElDropdown
          placement="bottom-end"
          size="medium"
          trigger="click"
          :show-arrow="false"
          :popper-options="{
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 5]
                }
              }
            ]
          }"
        >
          <ElAvatar size="small" alt="avatar" class="cursor-pointer">
            <ElIcon>
              <UserFilled />
            </ElIcon>
          </ElAvatar>
          <template #dropdown>
            <ThemeSelector />
            <ElDropdownMenu>
              <ElDropdownItem :icon="LogoutIcon" @click="handleLogout">Logout</ElDropdownItem>
            </ElDropdownMenu>
          </template>
        </ElDropdown>
      </ElSpace>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSystemStore } from '@/stores/modules/system'
import {
  ElAvatar,
  ElDropdownItem,
  ElDropdown,
  ElDropdownMenu,
  ElIcon,
  ElButton,
  ElDivider,
  ElSpace
} from 'element-plus'
import { computed, ref, watchEffect } from 'vue'
import { UserFilled, SwitchButton as LogoutIcon, Menu, FullScreen } from '@element-plus/icons-vue'
import ThemeSelector from './ThemeSelector.vue'
import BreadcrumbNavigation from './BreadcrumbNavigation.vue'
import { useFullscreen, useWindowSize } from '@vueuse/core'
import { SIZE_SCREEN } from '@/constants'
import HeaderNotice from './HeaderNotice.vue'
import IconExitFullscreen from '@/assets/icons/IconExitFullscreen.vue'

const { isFullscreen, toggle: handleToggleFullScreen } = useFullscreen()
const systemStore = useSystemStore()
const windowSize = ref(useWindowSize())
const isShowSidebar = computed(() => windowSize.value.width > SIZE_SCREEN.lg)

// watch theme change
watchEffect(() => {
  document.documentElement.className = systemStore.theme
})

const handleLogout = async () => {
  // TODO
  console.log('logout')
}
</script>

<style lang="scss">
.header-container {
  @apply w-full;

  .header-left,
  .header-right {
    @apply flex items-center;
  }
}

.el-popper__arrow {
  &::before {
    content: unset;
  }
}
</style>
