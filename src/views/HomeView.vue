<template>
  <div class="about flex flex-col items-center justify-center gap-2">
    <h1>This is an home page</h1>
    <ElButton type="primary">Primary</ElButton>
    <el-date-picker type="datetime" :placeholder="$t('select_datetime')" />
  </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'
</script>

<style>
@media (min-width: 1024px) {
}
</style>
