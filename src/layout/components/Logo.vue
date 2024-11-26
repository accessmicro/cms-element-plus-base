<template>
  <div class="flex h-[50px] cursor-pointer items-center justify-center" @click="handleClickLogo">
    <ElImage src="/logo.png" class="h-[28px] w-[28px] object-cover" />
    <span
      class="select-none pl-2 text-[22px] font-bold leading-none text-primary-5"
      v-if="!useSystemStore().collapsedMenu"
      >LG CNS</span
    >
  </div>
</template>

<script setup lang="ts">
import { useSystemStore } from '@/stores/modules/system'
import { useRouter } from 'vue-router'

const router = useRouter()

function handleClickLogo() {
  return router.push({
    path: '/'
  })
}
</script>

<style lang="scss"></style>
