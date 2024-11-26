<script setup lang="ts">
import 'element-plus/dist/index.css'
import { RouterView } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
import { useI18n } from 'vue-i18n'
import vi from 'element-plus/es/locale/lang/vi'
import en from 'element-plus/es/locale/lang/en'
import { computed, onMounted } from 'vue'
import { LOCAL_STORAGE, LocalesEnum, THEME } from './constants'
import { setThemeColor, type ThemeType } from '@klweb/theme-chalk'
import type { ThemeItemType } from '@/models'

const { locale } = useI18n()

const lang = computed(() => {
  return locale.value === LocalesEnum.vi ? vi : en
})

function setTheme(value: ThemeItemType) {
  Object.keys(value).forEach((key: string) => {
    key !== 'name' && setThemeColor(key as ThemeType, (value as any)[key])
  })
}

onMounted(() => {
  const defaultTheme = THEME[+(localStorage.getItem(LOCAL_STORAGE.theme) || 0)]
  setTheme(defaultTheme)
})
</script>

<template>
  <ElConfigProvider :locale="lang" size="default">
    <RouterView />
  </ElConfigProvider>
</template>

<style scoped></style>
