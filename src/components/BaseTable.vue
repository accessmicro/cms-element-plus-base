<template> 
    <div class="table-container bg-white rounded-lg p-4 h-full w-full">
      <div class="action-buttons" v-if="hasPagination">
          <div class="action-buttons__left">
              <el-select @change="handlePageSizeChange()" class="dropdown-select__pagesize" v-model="pageSize" placeholder="Select">
                  <el-option
                      v-for="item in pageSizes"
                      :key="item"
                      :label="item"
                      :value="item"
                  />
              </el-select>
              <div>
                  <span class="action-buttons__left--text">{{ totalItems }}</span><span class="font-normal text-sm"> Items</span> 
              </div>
              <div>
                  <span class="action-buttons__left--text">{{ currentPage }}</span><span class="font-normal text-sm">/{{ totalPages }} Pages</span>
              </div>
          </div>
          <div>
              <slot name="action-buttons"></slot>
          </div>
      </div>
      <el-table   
            v-bind="$attrs"
            :data="dataTable"
            :default-sort="defaultSort"
            :header-cell-style="{ backgroundColor: '#F0EFFB', color: '#615D89', fontSize: '13px'}"
            :highlight-current-row="highlightCurrentRow"
            @selection-change="handleSelectionChange"
            @sort-change="handleSortChange"
            ref="tableRef"
            scrollbar-always-on
            :empty-text="emptyText"
            >
            <el-table-column v-if="selectConfig.show" type="selection" :selectable="selectable" :width="selectConfig.width" fixed></el-table-column>
            <el-table-column 
                v-for="(column, columnIndex) in columns" 
                :key="columnIndex"
                v-bind="column"
            >
                <template #header="scope">
                  <div class="flex justify-center items-center px-4" :class="{'flex justify-between cursor-pointer': column.sortable}">
                    <span class="font-semibold flex-grow text-center">{{ scope.column.label }}</span>
                    <span v-if="column.sortable" class="flex flex-col items-center">
                        <i :class="{'default': column.prop !== columnId || (column.prop === columnId && currentSortOrder === ''), 
                                    'ascending': currentSortOrder === 'ascending' && column.prop === columnId,
                                    'descending': currentSortOrder === 'descending' && column.prop === columnId,
                        }"></i>
                    </span>
                  </div>
                </template>
                <template v-slot="scope" v-if="!column.formatter">
                    <slot :name="column.prop" :scope="scope">{{ scope.row[column.prop] }}</slot>
                </template>
            </el-table-column>
      </el-table>
      <div class="pagination-wrapper" v-if="hasPagination">
          <el-pagination
              :current-page="currentPage"
              :page-size="pageSize"
              :total="totalItems"
              @current-change="handleCurrentPageChange"
              layout="prev, pager, next"
              prev-text="Previous"
              next-text="Next"
          />
      </div>
    </div>
</template>
<script setup lang="ts">
import { DefaultTableCurentPageSize, DefaultTableCurrentPage, DefaultTablePageSizeOptions, SortOrder, UrlQueryVariables } from '@/constants';
import type { TableColumnInstance, TableInstance , ElTable } from 'element-plus';
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const emit = defineEmits(['pageSizeChange', 'currentPageChange', 'selectionChange', 'sortChange', 'onChange'])
type Nullable<T> = T | null
type SelectConfig = {
  show: boolean
  width: number
  currentSelectId? : (number|string)[]
}
type DefaultSort = {
  prop: string,
  order: string
}

export type ColumnType = Partial<TableColumnInstance>
export type TableNestedRef = {
  $refs : {
    tableRef : TableInstance
  }
}

function isValidPaginableParam (param: Nullable<string>) {
  if(!param || isNaN(+param)) {
    return false
  }
  return _.gt(+param, 0) // is positive value?
}

function convertPaginableParam (param: Nullable<string>) {
  if(!param || !isValidPaginableParam(param)) return
  return +param
}

const tableRef = ref<TableInstance>()
interface Props {
  selectConfig?: SelectConfig; 
  columns: Array<any>;
  dataTable: Array<any>;
  totalItems?: number
  rowKey : string,
  defaultSort?: DefaultSort
  selectable?: (row: any) => boolean 
  syncWithQuery?:boolean
  hasPagination?: boolean
  highlightCurrentRow?: boolean
  emptyText?: string,
}

const props = withDefaults(defineProps<Props>(), {
  selectConfig: () => ({ show: false, width: 56}),
  columns: () => [],
  totalItems: 0,
  syncWithQuery: false,
  highlightCurrentRow: false,
  emptyText: 'No Data',
  hasPagination: true,
});

const route = useRoute()

const currentSortOrder = ref<string|undefined>('')
const currentPage = ref(convertPaginableParam(route.query?.page as Nullable<string>) ?? DefaultTableCurrentPage);
const pageSizes   = ref(DefaultTablePageSizeOptions);
const pageSize = ref(convertPaginableParam(route.query?.pageSize as Nullable<string>) ??  DefaultTableCurentPageSize);
const totalPages = computed(() => {
    return Math.ceil(props.totalItems / pageSize.value);
})

const router = useRouter()

onBeforeMount(()=>{
  if (props.syncWithQuery) {
    const query = router?.currentRoute?.value?.query || {}
    currentPage.value = query.currentPage ? Number(query.currentPage) || DefaultTableCurrentPage : DefaultTableCurrentPage;
    pageSize.value = query.pageSize ? Number(query.pageSize) || DefaultTableCurentPageSize : DefaultTableCurentPageSize;
  }
})

const handleUpdateQuery = () => {
  if (!props.syncWithQuery) {
    return;
  }
  const query = router?.currentRoute?.value?.query || {}
  router.push({
    query: {
      ...query, [UrlQueryVariables.currentPage]: currentPage.value, [UrlQueryVariables.pageSize]: pageSize.value,
      [UrlQueryVariables.sortBy]: columnId.value||"", [UrlQueryVariables.sortOrder]: SortOrder[currentSortOrder.value||""] || ''
    }
  })
}

interface SortChangeEvent {
    // column: any; 
    prop: string;  
    order?: string; 
}

const columnId = ref<string>('');
const handleSortChange = ({ prop }: SortChangeEvent) => {
  tableRef.value?.clearSort();
  if(columnId.value !== prop) {
    currentSortOrder.value = ''
  }
  if(currentSortOrder.value === '') {
    currentSortOrder.value = 'ascending'
  } else if(currentSortOrder.value === 'ascending') {
    currentSortOrder.value = 'descending'
  } else {
    currentSortOrder.value = ''
  }
  columnId.value = prop;
  emit('sortChange', {sortField: columnId.value, sortOrder: currentSortOrder.value})
  handleUpdateQuery()
};

const handleCurrentPageChange = (newPage: number) => {
  currentPage.value = newPage; 
  emit('currentPageChange', { currentPage: currentPage.value, pageSize: pageSize.value }) //change current page
  handleUpdateQuery()
};

const handleSelectionChange = (selection: Array<any>) => {
  emit('selectionChange', selection) //change page size
}

const handlePageSizeChange = () => {
  currentPage.value = 1;
  emit('pageSizeChange', pageSize.value)
  handleUpdateQuery()
}

function toggleSelection(){
  if(props.selectConfig.currentSelectId){
      props.selectConfig.currentSelectId.forEach(rowId => {
        const exited = props.dataTable.find(item => item[props.rowKey] === rowId)
        if(exited){
          tableRef.value?.toggleRowSelection(exited, true)
        }
      })
  }
}

watch(()=>props.selectConfig.currentSelectId, () => {
  toggleSelection()
}, {flush : 'post'})

watch(()=>props.dataTable, () => {
  toggleSelection()
} , {flush : 'post'})

onMounted(()=>{
  toggleSelection()
  if(props.defaultSort?.prop && props.defaultSort?.order){
    columnId.value = props.defaultSort.prop;
    currentSortOrder.value = props.defaultSort.order;
    // const prop: string = props.defaultSort.prop;
    // const order: string = props.defaultSort.order;
    // handleSortChange({prop, order})
  }
})

defineExpose({
  api: tableRef
})

</script>

<style scoped lang="scss">
.table-container {
  .pagination-wrapper {
    display: flex;
    justify-content: center;
    min-height: 32px;
    max-height: 32px;
    margin-top: 10px;
  }
  .action-buttons {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    min-height: 32px;
    max-height: 32px;
    .dropdown-select__pagesize {
      width: 80px;
      height: 32px;
    }
    &__left {
      display: flex;
      align-items: center;
      column-gap: 8px;
      &--text {
        color: #6e62e5;
        font-weight: 700;
        font-size: 13px;
      }
      &--textsecond {
        font-weight: 400;
        font-size: 14px;
      }
    }
  }
  .default {
    content: url('@/assets/icons/sort.svg'); 
  }

  .ascending {
    content: url('@/assets/icons/icon-sort-ascending.svg'); 
    margin-bottom: 1px;
  }

  .descending {
    content: url('@/assets/icons/icon-sort-descending.svg'); 
    margin-top: 1px;
  }

  .el-table {
    border-top-left-radius: 4px;
  }
}

:deep(.el-table) {
  --el-table-row-hover-bg-color: var(--el-color-primary-light-8);
    width: 100%;
    height: calc(100% - 80px);
}

:deep(.el-table .cell) {
    padding: 0;
}

:deep(.el-table .caret-wrapper) {
    display: none;
}

:deep(th:not(.el-table-column--selection)) {
    border-right: 1px solid #EAEAEF !important;
}

:deep(.el-table__body td.el-table__cell) {
    padding-left: 6px;
    padding-right: 6px;
}

:deep(.el-table__body tr .el-table-column--selection) {
    text-align: center;
}

:deep(.el-table__header .el-table-column--selection) {
    text-align: center;
    height: 100%;
    border-right: none;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
    background-color: #6E62E5;
    border-color: #6E62E5;
}

:deep(.el-checkbox__input .el-checkbox__inner) {
    width: 16px;
    height: 16px;
}

:deep(.el-checkbox__input.is-indeterminate .el-checkbox__inner) {
    background-color: #6E62E5;
    border-color: #6E62E5;
}

:deep(.el-checkbox__inner:after) {
    left: 5px;
}

:deep(.el-table-fixed-column--*) {
  background-color: #EAEAEF
}
</style>
