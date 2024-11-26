<script setup lang="ts">
import { useDialogInner } from '@/components/dialog'
import BaseDialog from '@/components/dialog/src/BaseDialog.vue'
import { ref } from 'vue'

defineOptions({ name: 'DialogDemo1' })
const emit = defineEmits(['confirm'])

const value = ref()

const [register] = useDialogInner((data) => {
  value.value = data
})

const handleConfirm = () => {
  emit('confirm', value)
}
</script>

<template>
  <BaseDialog @register="register" @confirm="handleConfirm" title="Dialog">
    <div>{{ value }}</div>
  </BaseDialog>
</template>
<style lang="scss" scoped></style>
