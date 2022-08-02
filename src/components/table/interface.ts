interface IPaginationData {
  page: number,
  limit: number,
  total?: number,
}

interface ITableColumn {
  label?: string,
  prop?: string,
  type?: string,
  index?: string | ((index: number) => void),
  columnKey?: string,
  width?: string | number,
  minWidth?: string | number,
  fixed?: string | boolean,
  sortable?: boolean | 'custom',
  sortMethod?: (a: number, b: number) => number,
  align?: 'left' | 'center' | 'right',
  className?: string,
  headerSlot?: string,
  slot?: string,
  formatter?: (row: any, column: any, cellValue: any, index: number) => string | number | undefined
}

interface ISort {
  order: 'ascending' | 'descending' | '',
  prop: string
}

export { IPaginationData, ITableColumn, ISort }
