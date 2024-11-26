<template>
  <div ref="wrapperRef" class="h-full p-4">
    <div ref="contentWrapperRef" class="rounded bg-white p-3">
      <div ref="contentHeaderRef" v-if="isShowContentHeader" class="flex items-center">
        <div class="min-w-0 flex-1">
          <slot name="header">
            <h1 v-if="title" class="m-0 text-2xl font-medium text-system">{{ title }}</h1>
          </slot>
        </div>
        <div class="flex">
          <slot name="header-extra" />
        </div>
      </div>
      <div
        ref="contentRef"
        v-loading="loading"
        element-loading-custom-class="system-loading-mask"
        class="m-3 mx-0 mb-0 overflow-hidden"
        :style="getContentStyle"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties, ref, unref, useSlots } from 'vue'
import { useContentHeight } from '../hooks/web'

defineOptions({ name: 'PageWrapper' })

interface PageWrapperProps {
  title?: string
  loading?: boolean
  contentFullHeight?: boolean
  fixedHeight?: boolean
}

const props = withDefaults(defineProps<PageWrapperProps>(), { contentFullHeight: false })
const slots = useSlots()
const wrapperRef = ref(null)
const contentHeaderRef = ref(null)
const contentWrapperRef = ref(null)
const contentRef = ref(null)
const getIsContentFullHeight = computed(() => {
  return props.contentFullHeight
})

const { contentHeight } = useContentHeight(
  getIsContentFullHeight,
  wrapperRef,
  [contentHeaderRef],
  [contentRef, contentWrapperRef]
)

const getContentStyle = computed((): CSSProperties => {
  const { contentFullHeight, fixedHeight } = props
  if (!contentFullHeight) {
    return {}
  }

  const height = `${unref(contentHeight)}px`
  return { minHeight: height, ...(fixedHeight ? { height } : {}) }
})

const isShowContentHeader = computed(() => props.title || slots['header'] || slots['header-extra'])
</script>

<style lang="scss"></style>
