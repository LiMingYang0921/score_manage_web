import { reactive, ref } from 'vue'
import { IPaginationData, ISort } from '@/components/table/interface'
import request from '@/api/index'

const useTableList = (url: string) => {
  const loading = ref<boolean>(false)
  const tableData = ref<Array<object>>([])
  const paginationData = reactive<IPaginationData>({
    page: 1,
    limit: 10,
    total: 0
  })
  interface IQuery {
    role: Array<string | number>,
    name: string
  }
  interface IQueryItem {
    label: 'role',
    value: any
  }
  const query = reactive<IQuery>({
    role: [],
    name: ''
  })
  const sort = reactive<ISort>({
    order: '',
    prop: ''
  })
  const getTableList = () => {
    loading.value = true
    const data = {
      pagination: {
        page: paginationData.page,
        limit: paginationData.limit
      },
      sort,
      query
    }
    request.XHRGetUserList(data, url).then((res: any) => {
      if (res.code === 200) {
        tableData.value = res.data ?? []
        paginationData.total = res.total ?? 0
      }
    }).finally(() => {
      loading.value = false
    })
  }
  getTableList()
  const paginationDataChange = (data: IPaginationData) => {
    paginationData.page = data.page
    paginationData.limit = data.limit
    getTableList()
  }

  const sortChange = (column: any) => {
    sort.order = column.order
    sort.prop = column.prop
    getTableList()
  }

  const setQuery = (e: IQueryItem) => {
    query[e.label] = e.value
    getTableList()
  }
  return { loading, tableData, paginationData, query, getTableList, paginationDataChange, sortChange, setQuery }
}

export { useTableList }
