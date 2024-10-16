<script setup lang="ts">
import 'element-plus/dist/index.css'
import { RouterView } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
import { useI18n } from 'vue-i18n'
import vi from 'element-plus/es/locale/lang/vi'
import en from 'element-plus/es/locale/lang/en'
import { computed } from 'vue'

const { locale } = useI18n()

const lang = computed(() => {
  return locale.value === 'vi' ? vi : en
})
</script>

<template>
  <el-config-provider :locale="lang">
    <router-view />
  </el-config-provider>
</template>

<style scoped></style>
