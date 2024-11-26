<template>
  <PageWrapper title="Example" content-full-height>
    <template #default="{ minHeight }">
      <ElButton @click="openDrawer">Open Drawer</ElButton>
      <ElButton @click="openDrawer2">Open Drawer</ElButton>
      <ElButton @click="openDialog">Open Dialog</ElButton>
      <ExampleDrawer @register="register1" />
      <ExampleDialog @register="register2" @confirm="handleConfirm" />
      <ExampleTable :minHeight="minHeight" />
    </template>
  </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from '@/components/PageWrapper.vue'
import ExampleDrawer from './ExampleDrawer.vue'
import ExampleDialog from './ExampleDialog.vue'
import { useDrawer } from '@/components/drawer'
import { useDialog } from '@/components/dialog'
import { onMounted } from 'vue'
import ExampleTable from './ExampleTable.vue'

const [register1, { openDrawer: openDrawer1, setDrawerProps: setDrawerProps1 }] = useDrawer()
const [register2, { openDialog: openDialog1, setDialogProps: setDialogProps1 }] = useDialog()

onMounted(() => {
  setDrawerProps1({
    loading: false,
    hiddenOverlay: true
  })
  setDialogProps1({
    loading: false
  })
})

const handleConfirm = (data: any) => {
  console.log(data.value)
}

const openDrawer = () => {
  openDrawer1(true, {
    data: 'test'
  })
}

const openDrawer2 = () => {
  openDrawer1(true, {
    data: 'asdsad'
  })
}

const openDialog = () => {
  openDialog1(true, {
    data: 'test'
  })
}
</script>

<style></style>
