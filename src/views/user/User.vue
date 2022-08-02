<template>
  <div class="user">
    <Table :loading="loading" :tableData="tableData" :tableColumn="tableColumn" :paginationData="paginationData"
      :selection="true" @paginationDataChange="paginationDataChange" @sort-change="sortChange">
      <template v-slot:nameHeader="{}">
        <TableSearch name="姓名" :queryValue="query.name" queryLabel="name" @setQuery="setQuery" />
      </template>
      <template v-slot:nameSlot="{ scope }">
        <a href="">{{ scope.row.name }}</a>
      </template>
      <template v-slot:roleHeader="{}">
        <TableFilter name="角色" :filterList="roleList" :queryValue="query.role" :radio="true" queryLabel="role"
          @setQuery="setQuery" />
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

import Table from '@/components/table/Table.vue'
import TableFilter from '@/components/table_filter/TableFilter.vue'
import TableSearch from '@/components/table_search/TableSearch.vue'
import { ITableColumn } from '@/components/table/interface'
import { roleList } from '@/utils/data'
import { useTableList } from '@/utils/useTableList'

const formatter = (row: any, column: any, cellValue: any, index: number) => {
  const text = roleList.find((item) => {
    return item.value === cellValue
  })?.text
  return text
}

export default defineComponent({
  components: { Table, TableFilter, TableSearch },
  setup () {
    const tableColumn = reactive<Array<ITableColumn>>([
      {
        label: '姓名',
        prop: 'name',
        slot: 'nameSlot',
        headerSlot: 'nameHeader'
      },
      {
        label: '手机号',
        prop: 'phone'
      },
      {
        label: '邮箱',
        prop: 'email'
      },
      {
        label: '身份证号',
        prop: 'IDCard'
      },
      {
        label: '地址',
        prop: 'address'
      },
      {
        label: '出生日期',
        prop: 'registrationTime',
        sortable: 'custom'
      },
      {
        label: '角色',
        prop: 'role',
        headerSlot: 'roleHeader',
        formatter
      }
    ])

    const { loading, tableData, paginationData, query, getTableList, paginationDataChange, sortChange, setQuery } = useTableList('/user/list')

    return {
      tableData,
      tableColumn,
      paginationData,
      loading,
      query,
      roleList,
      paginationDataChange,
      sortChange,
      setQuery
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
