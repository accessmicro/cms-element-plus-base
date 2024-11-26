<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { ElDivider } from 'element-plus'

const LANG = {
  en: 'en',
  vi: 'vi'
}

const { locale } = useI18n()
const lang = ref(locale.value)

function handleChangeLang(language: string) {
  if (language === lang.value) return
  locale.value = language
  localStorage.setItem('lang', language)
  lang.value = language
}
</script>

<template>
  <div :bind="$attrs">
    <span
      v-for="(item, index) in Object.keys(LANG)"
      :key="item"
      class="user-select-none cursor-pointer font-medium italic"
      :class="{ 'text-primary-7': !(lang === item) }"
      @click="() => handleChangeLang(item)"
    >
      <ElDivider direction="vertical" class="!border-l-primary-8" v-if="!!index" />
      {{ item }}
    </span>
  </div>
</template>

<style scoped lang="scss"></style>
