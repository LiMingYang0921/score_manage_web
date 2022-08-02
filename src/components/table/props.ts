import { PropType } from 'vue'
import { IPaginationData, ITableColumn } from './interface'
export const props = {
  loading: {
    require: true,
    type: Boolean
  },
  tableData: Array,
  tableColumn: Array as PropType<Array<ITableColumn>>,
  border: Boolean,
  height: [Number, String],
  paginationData: {
    require: true,
    type: Object as PropType<IPaginationData>,
    default: function () {
      return {
        page: 1,
        limit: 10
      }
    }
  },
  limitList: {
    require: false,
    default: () => [10, 20, 30]
  }
}
