<template>
  <div>
    <BaseTable
      :columns="columns"
      :data-table="dataTable"
      :row-key="'nghiem'"
      :height="props.minHeight - 150"
      :select-config="{
        show: true,
        width: 50,
      }"
    >
      <template #action="">
        <ElButton type="text" size="mini">Edit</ElButton>
        <ElButton type="text" size="mini">Delete</ElButton>
      </template>
  </BaseTable>
  </div>
</template>

<script setup lang="ts">
import BaseTable from '@/components/BaseTable.vue';
const props = defineProps<{
  minHeight: number
}>()
const columns = [
  {
    label: 'Name',
    prop: 'name',
    width: 200
  },
  {
    label: 'Age',
    prop: 'age',
    width: 200
  },
  {
    label: 'Address',
    prop: 'address',
  },
  {
    label: 'Action',
    prop: 'action',
    align: 'center',
    width: 200,
  },

]
const dataTable = Array.from({ length: 100 }, (_, i) => ({
  name: `Nghiem ${i}`,
  age: 20 + i,
  address: `Address ${i}`
}))

</script>

<style scoped>

</style>