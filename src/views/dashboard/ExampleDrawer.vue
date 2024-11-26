<script setup lang="ts">
import { useDrawerInner } from '@/components/drawer'
import BaseDrawer from '@/components/drawer/src/BaseDrawer.vue'
import { ElButton } from 'element-plus'
import { ref } from 'vue'

defineOptions({ name: 'DrawerDemo1' })

const value = ref()

const [register] = useDrawerInner((data) => {
  value.value = data
})
</script>

<template>
  <BaseDrawer @register="register" title="Drawer">
    <div>{{ value }}</div>
    <template #footer="{ onClose }">
      <div>
        <ElButton @click="onClose">Close</ElButton>
      </div>
    </template>
  </BaseDrawer>
</template>
<style lang="scss" scoped></style>
