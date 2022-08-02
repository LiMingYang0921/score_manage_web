<template>
  <el-dropdown trigger="click" ref="dropdown" @visible-change="visibleChange">
    <span class="title">
      <a :class="{ chosen: queryValue?.length ? 'blue' : '' }">{{ title }}</a>
      <el-icon class="icon">
        <ArrowDown v-show="iconDown" />
        <ArrowUp v-show="!iconDown" />
      </el-icon>
    </span>
    <template #dropdown>
      <div>
        <el-checkbox-group class="check_group" v-model="checkList" @change="change">
          <el-checkbox class="el-checkbox " v-for="item in filterList" :label="item.value" :key="item.value">
            {{ item.text }}
          </el-checkbox>
        </el-checkbox-group>
        <div class="bottom">
          <el-button type="primary" link @click="confirmClick"> 确认 </el-button>
          <el-button type="info" link @click="resetClick"> 重置 </el-button>
        </div>
      </div>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { defineComponent, PropType, ref } from 'vue'
import { IFilterList } from '@/utils/data'

export default defineComponent({
  components: { ArrowDown, ArrowUp },
  props: {
    name: {
      required: true,
      default: ''
    },
    filterList: {
      required: true,
      type: Array as PropType<Array<IFilterList>>
    },
    queryValue: {
      required: true,
      type: Array as PropType<Array<number | string>>
    },
    queryLabel: {
      required: true,
      default: '',
      type: String
    },
    radio: {
      type: Boolean,
      require: false,
      default: false
    }
  },
  setup (props, ctx) {
    const checkList = ref()
    const title = ref<string | undefined>(props.name)
    const change = () => {
      if (props.radio) {
        const len = checkList.value.length
        if (len > 1) {
          checkList.value = [checkList.value[len - 1]]
        }
      }
    }
    const dropdown = ref()
    const confirmClick = () => {
      if (checkList.value?.length === 1) {
        title.value = props.filterList.find((item) => {
          return item.value === checkList.value[0]
        })?.text
      } else {
        title.value = props.name
      }
      ctx.emit('setQuery', { label: props.queryLabel, value: checkList.value })
      dropdown.value.handleClose()
    }
    const resetClick = () => {
      title.value = props.name
      ctx.emit('setQuery', { label: props.queryLabel, value: [] })
      dropdown.value.handleClose()
    }
    const iconDown = ref<boolean>(true)
    const visibleChange = (e: boolean) => {
      if (e) {
        iconDown.value = false
      } else {
        iconDown.value = true
      }
      checkList.value = props.queryValue
    }
    return {
      title, iconDown, checkList, change, dropdown, confirmClick, resetClick, visibleChange
    }
  }
})
</script>
<style lang="scss">
.title {
  margin-top: 2px;

  .chosen {
    color: var(--el-color-primary);
  }

  .icon {
    position: relative;
    top: 4px;
  }
}

.check_group {
  display: flex;
  flex-direction: column;
  padding: 10px;

  .el-checkbox {
    margin: 0;
    padding-right: 8px;
  }
}

.bottom {
  display: flex;
  flex-direction: row-reverse;
  border-top: 1px solid #ebeef5;
  font-size: 13px;
  padding: 8px;
}
</style>
