<template>
  <el-dropdown trigger="click" ref="dropdown" @visible-change="visibleChange">
    <span class="title">
      <a :class="{ chosen: queryValue?.length ? 'blue' : '' }">{{ title }}</a>
      <el-icon class="icon">
        <el-icon>
          <Search />
        </el-icon>
      </el-icon>
    </span>
    <template #dropdown>
      <div>
        <el-input class="input" v-model="searchInput" size="small" />
        <div class="bottom">
          <el-button type="primary" link @click="confirmClick"> 确认 </el-button>
          <el-button type="info" link @click="resetClick"> 重置 </el-button>
        </div>
      </div>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { Search } from '@element-plus/icons-vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: { Search },
  props: {
    name: {
      required: true,
      default: ''
    },
    queryValue: {
      required: true,
      type: String
    },
    queryLabel: {
      required: true,
      default: '',
      type: String
    }
  },
  setup (props, ctx) {
    const searchInput = ref('')
    let title = ref<string>(props.name)
    const dropdown = ref()
    const confirmClick = () => {
      if (searchInput.value) {
        title = searchInput
      } else {
        title.value = props.name
      }
      ctx.emit('setQuery', { label: props.queryLabel, value: searchInput.value })
      dropdown.value.handleClose()
    }
    const resetClick = () => {
      title.value = props.name
      ctx.emit('setQuery', { label: props.queryLabel, value: '' })
      dropdown.value.handleClose()
    }
    const iconDown = ref<boolean>(true)
    const visibleChange = (e: boolean) => {
      if (e) {
        iconDown.value = false
      } else {
        iconDown.value = true
      }
      searchInput.value = props.queryValue
    }
    return {
      title, iconDown, searchInput, dropdown, confirmClick, resetClick, visibleChange
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
    font-size: 12px;
  }
}

.input {
  padding: 10px;
}

.bottom {
  display: flex;
  flex-direction: row-reverse;
  border-top: 1px solid #ebeef5;
  font-size: 13px;
  padding: 8px;
}
</style>
