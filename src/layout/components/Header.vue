<script setup lang="ts">
import { useSystemStore } from '@/stores/modules/system'
import { Fold, Expand } from '@element-plus/icons-vue'
import { ElSelect } from 'element-plus'
import { watchEffect } from 'vue'
import SwitchLangBtn from './SwitchLangBtn.vue'
import IconMenu from '@/assets/icons/IconMenu.vue'

// handle open menu drawer
const systemStore = useSystemStore()

// watch theme change
watchEffect(() => {
  document.documentElement.className = systemStore.theme
})
</script>

<template>
  <div class="header-container flex items-center">
    <div class="header-left">
      <div
        @click="systemStore.togleMenu"
        class="l-0 r-0 absolute flex cursor-pointer items-center gap-2 md:!hidden"
      >
        <el-icon type="primary">
          <IconMenu />
        </el-icon>
        Menu
      </div>
      <div
        @click="systemStore.togleCollapsedMenu"
        class="l-0 r-0 absolute hidden cursor-pointer items-center gap-2 md:!flex"
      >
        <template v-if="systemStore.collapsedMenu">
          <el-icon>
            <Expand />
          </el-icon>
          {{ $t('collapse') }}
        </template>
        <template v-else>
          <el-icon>
            <Fold />
          </el-icon>
          {{ $t('expand') }}
        </template>
      </div>
    </div>
    <div class="header-center">
      <h1 class="w-full px-5 text-center">{{ $t('hello') }}</h1>
    </div>
    <div class="header-right">
      <SwitchLangBtn class="mr-2" />
      <ElSelect v-model="systemStore.theme" placeholder="Select theme" class="flex-[100px]">
        <el-option label="Light" value="light"></el-option>
        <el-option label="Dark" value="dark"></el-option>
        <el-option label="Green" value="green"></el-option>
      </ElSelect>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-container {
  padding: 0 10px;
  height: 40px;

  .header-left,
  .header-right {
    @apply flex min-w-[200px] max-w-[300px] items-center;
  }
  .header-center {
    flex: 1;
  }
}
</style>
