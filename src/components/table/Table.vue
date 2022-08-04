<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div class="table_page">
    <div class="table_box">
      <el-table v-loading="loading" :style="{ minWidth: `${tableMinWidth}px` }" :data="tableData"
        :border="border" :height="height" @selection-change="selectionChange" @select="select" @select-all="selectAll"
        @sort-change="sortChange">
        <template v-for="(item, index) in tableColumn" :key="index">
          <el-table-column v-if="item.type === 'selection' || item.type === 'index'" :type="item.type"
            :label="item.label" :width="item.width" :min-width="item.minWidth" :sortable="item.sortable"
            :sort-method="item.sortMethod" :align="item.align" :class-name="item.className">
          </el-table-column>
          <el-table-column v-else-if="item.type === 'expand'" :prop="item.prop" :type="item.type" :label="item.label"
            :width="item.width" :min-width="item.minWidth" :sortable="item.sortable" :sort-method="item.sortMethod"
            :align="item.align" :class-name="item.className">
            <template #default="scope">
              <slot name="expand" :scope="scope"></slot>
            </template>
          </el-table-column>
          <el-table-column v-if="item.headerSlot || item.slot" :prop="item.prop" :type="item.type" :label="item.label"
            :width="item.width" :min-width="item.minWidth" :sortable="item.sortable" :sort-method="item.sortMethod"
            :align="item.align" :class-name="item.className" :formatter="item.formatter">
            <template v-if="item.headerSlot" #header="scope">
              <slot :name="item.headerSlot" :scope="scope"></slot>
            </template>
            <template v-if="item.slot" #default="scope">
              <slot :name="item.slot" :scope="scope" />
            </template>
          </el-table-column>
          <el-table-column v-else :prop="item.prop" :type="item.type" :label="item.label" :width="item.width"
            :min-width="item.minWidth" :sortable="item.sortable" :sort-method="item.sortMethod" :align="item.align"
            :class-name="item.className" :formatter="item.formatter">
            <template v-if="item.slot" #default="scope">
              <slot :name="item.slot" :scope="scope" />
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <div class="placeholder" />
      <el-pagination class="el_pagination" ref="elPagination" :currentPage="paginationData.page"
        :page-size="paginationData.limit" :total="paginationData.total" :page-sizes="limitList" :background="true"
        layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, ExtractPropTypes, SetupContext } from 'vue'
import { IPaginationData } from './interface'
import { props } from './props'
type ComponentProps = ExtractPropTypes<typeof props>
const usePaginationChange = (paginationData: IPaginationData, ctx: SetupContext) => {
  const handleCurrentChange = (val: number) => {
    ctx.emit('paginationDataChange', {
      page: val,
      limit: paginationData.limit
    })
  }
  const handleSizeChange = (val: number) => {
    ctx.emit('paginationDataChange', {
      page: paginationData.page,
      limit: val
    })
  }
  return { handleSizeChange, handleCurrentChange }
}
const useSelect = (ctx: SetupContext) => {
  const select = (selection: object[], row: object) => {
    ctx.emit('select', selection, row)
  }
  const selectAll = (selection: object[]) => {
    ctx.emit('select-all', selection)
  }
  const selectionChange = (selection: object[]) => {
    ctx.emit('selection-change', selection)
  }
  return { select, selectAll, selectionChange }
}
const useSortChange = (ctx: SetupContext) => {
  const sortChange = (column: any) => {
    ctx.emit('sort-change', column)
  }
  return { sortChange }
}
export default defineComponent({
  props,
  setup (props: ComponentProps, ctx: SetupContext) {
    const slots = ctx.slots
    const elPagination = ref()
    const tableMinWidth = ref<number>(0)
    onMounted(() => {
      tableMinWidth.value = elPagination?.value?.$el.clientWidth || 0
    })
    const { handleCurrentChange, handleSizeChange } = usePaginationChange(props.paginationData, ctx)
    const { select, selectAll, selectionChange } = useSelect(ctx)
    const { sortChange } = useSortChange(ctx)

    return {
      slots, elPagination, tableMinWidth, handleSizeChange, handleCurrentChange, select, selectAll, selectionChange, sortChange
    }
  }
})
</script>
<style lang="scss" scoped>
.table_page {
  display: flex;
  flex-direction: column;

  .pagination {
    display: flex;

    .placeholder {
      width: 1px;
      flex: 1;
    }

    .el_pagination {
      margin: 18px;
    }
  }
}
</style>
