<template>
  <div class="header-notice flex h-fit items-center">
    <ElBadge is-dot class="translate-y-[3px]">
      <ElIcon :size="20">
        <Bell />
      </ElIcon>
    </ElBadge>
  </div>
</template>

<script setup lang="ts">
import { Bell } from '@element-plus/icons-vue'
import { ElBadge, ElIcon } from 'element-plus'
</script>

<style lang="scss"></style>
