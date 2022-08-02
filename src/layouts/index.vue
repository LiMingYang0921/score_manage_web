<template>
  <div class="layouts">
    <div class="menu">
      <Menu />
    </div>
    <div class="content">
      <Header />
      <div class="views">
        <div class="views_box beauty-scroll-crude">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Menu from './menu/index.vue'
import Header from './header/index.vue'
export default defineComponent({
  components: {
    Menu,
    Header
  }
})
</script>
<style lang="scss" scoped>
.layouts {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;

  .menu {
    height: 100vh;
    overflow-y: hidden;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;

    .views {
      box-sizing: border-box;
      width: 100%;
      height: calc(100vh - 50px);
      background: rgb(238, 240, 243);
      padding: 18px;

      .views_box {
        height: 100%;
        min-height: 50px;
        background: #fff;
        overflow: auto;
      }
    }
  }
}
</style>
