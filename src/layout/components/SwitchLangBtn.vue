<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const { locale } = useI18n()
const lang = ref(locale.value)

function onChangeLang(lang: string) {
  locale.value = lang
  localStorage.setItem('lang', lang)
}
</script>

<template>
  <el-switch
    @change="onChangeLang"
    v-model="lang"
    active-value="en"
    inactive-value="vi"
    inline-prompt
    active-text="en"
    inactive-text="vi"
    class="switch-lang-btn"
  />
</template>

<style scoped lang="scss">
.switch-lang-btn {
  --el-switch-off-color: red;

  :deep(.el-switch__core) {
    .el-switch__inner {
      .is-text {
        color: yellow;
      }
    }
  }
}
</style>
