<template>
  <div class="header">
    <div class="collapse">
      <el-icon @click="changeMenuStateClick">
        <Expand v-show="store.state.menuIsCollapse" />
        <Fold v-show="!store.state.menuIsCollapse" />
      </el-icon>
    </div>
    <Avatar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { Expand, Fold } from '@element-plus/icons-vue'
import Avatar from './components/Avatar.vue'
export default defineComponent({
  components: { Expand, Fold, Avatar },
  setup () {
    const store = useStore()
    const changeMenuStateClick = () => {
      store.commit('setMenuIsCollapse')
    }
    return { changeMenuStateClick, store }
  }
})
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding: 0 18px;
  box-sizing: border-box;

  .collapse {
    font-size: 18px;
  }
}
</style>
