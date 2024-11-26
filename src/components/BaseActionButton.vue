<template>
  <ElSpace class="base-button-action w-full" :class="wrapperClass">
    <ElButton v-for="(item, _index) in shownButtons" v-bind="item" :key="item.key">{{
      item.label
    }}</ElButton>
  </ElSpace>
</template>

<script setup lang="ts">
import { ElButton, ElSpace } from 'element-plus'
import { computed } from 'vue'

export interface IBaseActionButtonProps {
  list: Array<
    InstanceType<typeof ElButton>['$props'] & { label: string; hide?: boolean; key: string }
  >
  align?: 'center' | 'start' | 'end'
}

const props = withDefaults(defineProps<IBaseActionButtonProps>(), {
  list: () => [],
  align: 'end'
})

const shownButtons = computed(() => {
  return props.list.filter((btn) => !btn.hide)
})

const wrapperClass = computed(() => {
  const { align } = props
  return {
    'justify-start': align == 'start',
    'justify-end': align == 'end',
    'justify-center': align == 'center'
  }
})
</script>

<style lang="scss"></style>
