<script setup lang="ts">
import { computed, getCurrentInstance, ref, toRaw, unref, useAttrs } from 'vue'
import { deepMerge } from '@/utils'
import { basicProps } from './props'
import type { BaseDialogProps, DialogInstance } from './types'

defineOptions({ name: 'BModal' })

const props = defineProps(basicProps)
const emit = defineEmits(['register', 'confirm', 'update:modelValue'])
const attrs = useAttrs()
const showRef = ref(false)
const propsRef = ref<Partial<Nullable<BaseDialogProps>>>(null)

const setDialogProps = (props: Partial<BaseDialogProps>): void => {
  propsRef.value = deepMerge(unref(propsRef) || {}, props)
  if (Reflect.has(props, 'modelValue')) {
    showRef.value = Boolean(props.modelValue)
  }
}

const dialogInstance: DialogInstance = { setDialogProps: setDialogProps }

const instance = getCurrentInstance()

instance && emit('register', dialogInstance, instance.uid)

const getMergeProps = computed((): BaseDialogProps => {
  return deepMerge(toRaw(props), unref(propsRef))
})

const getProps = computed((): BaseDialogProps => {
  const opt = {
    width: '500px',
    closable: true,
    ...unref(getMergeProps),
    ...attrs,
    modelValue: unref(showRef)
  }
  return opt as BaseDialogProps
})

const getLoading = computed(() => {
  return Boolean(unref(getProps)?.loading)
})

const onClose = () => {
  showRef.value = false
  emit('update:modelValue', false)
}

const onConfirm = () => {
  emit('confirm')
}
</script>
<template>
  <ElDialog
    class="base-dialog"
    @update:modelValue="onClose"
    v-bind="getProps"
    v-model:modelValue="showRef"
  >
    <template #header v-if="$slots.header"> <slot name="header" /> </template>
    <div v-loading="getLoading"><slot /></div>
    <template #footer>
      <div v-loading="getLoading">
        <slot name="footer" :onClose="onClose">
          <ElSpace justify="end">
            <ElButton @click="onClose">{{ $t('common.close') }}</ElButton>
            <ElButton type="primary" @click="onConfirm">{{ $t('common.confirm') }}</ElButton>
          </ElSpace>
        </slot>
      </div>
    </template>
  </ElDialog>
</template>
<style lang="scss"></style>
