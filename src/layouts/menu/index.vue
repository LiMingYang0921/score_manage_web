<template>
  <div class="menu_box">
    <div class="title">
      <div class="logo"><img src="@/assets/logo.png" alt="" /></div>
      <h1 v-show="!isCollapse">后台管理系统</h1>
    </div>
    <MenuList />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from 'vue'
import { useStore } from 'vuex'
import MenuList from './components/MenuList.vue'
export default defineComponent({
  components: { MenuList },
  setup () {
    const store = useStore()
    const isCollapse = ref(false)
    watch(() => store.state.menuIsCollapse, (newValue) => {
      if (newValue) {
        isCollapse.value = true
      } else {
        setTimeout(() => {
          isCollapse.value = false
        }, 300)
      }
    })

    return { store, isCollapse }
  }
})
</script>
<style lang="scss" scoped>
.menu_box {
  display: flex;
  flex-direction: column;

  .title {
    display: flex;
    align-items: center;
    min-height: 50px;

    .logo {
      width: 64px;
      display: flex;
      justify-content: center;

      img {
        width: 32px;
        height: 32px;
      }
    }

    h1 {
      max-width: calc(200px - 64px);
    }
  }
}
</style>
