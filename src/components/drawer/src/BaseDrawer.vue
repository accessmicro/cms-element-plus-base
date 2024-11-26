<template>
  <ElDrawer
    class="base-drawer"
    :class="{
      'hidden-overlay': getProps.hiddenOverlay
    }"
    @update:modelValue="onClose"
    native-scrollbar
    v-bind="getBindValues"
    v-model:modelValue="showRef"
    :size="drawerSize"
    :close-on-click-modal="getProps.closeOnClickModal"
  >
    <template #header v-if="!!slots.header">
      <slot name="header" />
    </template>
    <div class="base-drawer_content" v-loading="getLoading">
      <div v-if="getProps.resizable" class="resize-area" @mousedown.prevent="startResize" />
      <slot />
    </div>
    <template #footer>
      <div
        v-loading="getLoading"
        class="w-full"
        :class="{
          'hidden-default': !getProps.isDefaultFooter
        }"
      >
        <slot name="footer" :onClose="onClose">
          <div v-if="getProps.isDefaultFooter" class="flex w-full">
            <BaseActionButton :list="actionButtons" />
          </div>
        </slot>
      </div>
    </template>
  </ElDrawer>
</template>
<script setup lang="ts">
import { computed, getCurrentInstance, onUnmounted, ref, toRaw, unref, useAttrs } from 'vue'
import type { BaseDrawerProps, DrawerInstance } from './types'
import { ElDrawer } from 'element-plus'
import { deepMerge } from '@/utils'
import { t } from '@/i18n/config'
import BaseActionButton, { type IBaseActionButtonProps } from '@/components/BaseActionButton.vue'
import { basicProps } from './props'
import { useWindowSize } from '@vueuse/core'

defineOptions({ name: 'BDrawer' })

const props = defineProps(basicProps)
const emit = defineEmits(['register', 'submit', 'update:modelValue'])
const slots = defineSlots<{
  header: () => any
  default: () => any
  footer: (props: { onClose: () => void }) => any
}>()
const windowSize = useWindowSize()
const rangeDrawerSize = computed(() => {
  const minSize = props.minWidth ?? windowSize.width.value * 0.3
  return {
    max: windowSize.width.value - 100,
    min: minSize
  }
})

const attrs = useAttrs()
const showRef = ref(false)
const propsRef = ref<Partial<Nullable<BaseDrawerProps>>>(null)

const drawerInstance: DrawerInstance = { setDrawerProps: setDrawerProps }

const instance = getCurrentInstance()

instance && emit('register', drawerInstance, instance.uid)

const getMergeProps = computed((): BaseDrawerProps => {
  return deepMerge(toRaw(props), unref(propsRef))
})

const getProps = computed((): BaseDrawerProps => {
  const opt = { ...attrs, ...unref(getMergeProps), show: unref(showRef) }
  return opt as BaseDrawerProps
})
const initialSize = ref(getProps.value.width || 600)
const drawerSize = ref(getProps.value.width || 600)
const drawerSizeStyle = computed(() => {
  return unref(drawerSize) + 'px'
})
const isResizing = ref(false)
const startX = ref(0)
const timerId = ref<any>(null)

const getBindValues = computed((): BaseDrawerProps => {
  const { width } = unref(getMergeProps)
  return {
    ...unref(getProps)
    // width: !resizable ? width : undefined
  }
})

const getLoading = computed(() => {
  return !!unref(getProps)?.loading
})

function setDrawerProps(props: Partial<BaseDrawerProps>): void {
  propsRef.value = deepMerge(unref(propsRef) || {}, props)
  if (Reflect.has(props, 'modelValue')) {
    showRef.value = !!props.modelValue
  }
}

const onClose = () => {
  showRef.value = false
  emit('update:modelValue', false)
}

const onSubmit = () => {
  emit('submit')
}

const startResize = (event: MouseEvent) => {
  isResizing.value = true
  startX.value = event.clientX
  initialSize.value = drawerSize.value
  document.addEventListener('mousemove', handleResize)
  document.addEventListener('mouseleave', stopResize)
}

const handleResize = (e: MouseEvent) => {
  if (timerId.value) {
    clearTimeout(timerId.value)
  }
  if (!isResizing.value) return
  const deltaX = startX.value - e.clientX
  const newWidth = deltaX + +initialSize.value

  if (newWidth >= unref(rangeDrawerSize).max || newWidth <= unref(rangeDrawerSize).min) {
    return (isResizing.value = false)
  }

  drawerSize.value = newWidth
  timerId.value = setTimeout(() => {
    isResizing.value = false
  }, 100)
}

const stopResize = () => {
  isResizing.value = false
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseleave', stopResize)
}

onUnmounted(() => {
  stopResize()
  timerId.value && clearTimeout(timerId.value)
})

const actionButtons = ref<IBaseActionButtonProps['list']>([
  {
    label: t('common.cancel'),
    key: 'cancel',
    onClick: onClose
  },
  {
    label: t('common.saveInfo'),
    key: 'save',
    type: 'primary',
    onClick: onSubmit
  }
])
</script>
<style lang="scss">
.el-overlay:has(.base-drawer.hidden-overlay) {
  width: v-bind(drawerSizeStyle);
  left: unset;
  transition:
    all 0.3s,
    background-color 0s,
    width 0s;
  background-color: #ffffff00;
  overflow: visible;
}
.base-drawer {
  transition:
    all 0.3s,
    width 0s;
  box-shadow: -5px 0px 16px -6px #00000075;
  .resize-area {
    @apply fixed top-1/2 z-[2003] h-full w-[10px] -translate-x-[25px] -translate-y-1/2 cursor-ew-resize rounded-[300px] bg-primary opacity-0;
  }

  .el-drawer__header {
    @apply mb-3;
    .el-drawer__title {
      @apply text-black;
    }
  }

  .el-drawer__body {
    @apply p-0;
  }

  &_content {
    @apply px-5 py-3;
  }
  .el-drawer__footer {
    &:has(.hidden-default:empty) {
      display: none;
    }
  }
}
</style>
