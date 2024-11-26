<template>
  <section class="flex min-h-screen items-center bg-white pb-[200px] dark:bg-gray-900">
    <div class="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
      <div class="mx-auto max-w-screen-sm text-center">
        <h1 class="mb-4 text-7xl font-extrabold tracking-tight text-primary-1 lg:text-9xl">404</h1>
        <p class="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Something's missing.
        </p>
        <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
          Sorry, we can't find that page. You'll find lots to explore on the home page.
        </p>
        <ElButton type="primary">
          <ElLink href="/" class="!text-white" :underline="false">Back to Homepage</ElLink>
        </ElButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useTitle } from '@vueuse/core'
import { ElButton, ElLink } from 'element-plus'

useTitle('404 | Not Found')
</script>

<style lang="scss"></style>
