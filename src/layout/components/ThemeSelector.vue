<template>
  <div class="theme-selector">
    <ElSegmented
      v-model="indexTheme"
      :options="THEME.map((item, index) => index)"
      :style="{ '--el-segmented-item-selected-bg-color': THEME[indexTheme].primary }"
      @change="handleChangeTheme"
    >
      <template #default="{ item }">
        {{ THEME[item as any].name }}
      </template>
    </ElSegmented>
  </div>
</template>

<script setup lang="ts">
import { LOCAL_STORAGE, THEME } from '@/constants'
import type { ThemeItemType } from '@/models'
import { setThemeColor, type ThemeType } from '@klweb/theme-chalk'
import { ElSegmented } from 'element-plus'
import { onMounted, ref } from 'vue'

const indexTheme = ref(+(localStorage.getItem(LOCAL_STORAGE.theme) || 0))

function handleChangeTheme(item: number) {
  const theme = THEME[item]
  localStorage.setItem(LOCAL_STORAGE.theme, item.toString())
  setTheme(theme)
}

function setTheme(value: ThemeItemType) {
  Object.keys(value).forEach((key: string) => {
    key !== 'name' && setThemeColor(key as ThemeType, (value as any)[key])
  })
}

onMounted(() => {
  const defaultTheme = THEME[indexTheme.value]
  setTheme(defaultTheme)
})
</script>

<style lang="scss"></style>
