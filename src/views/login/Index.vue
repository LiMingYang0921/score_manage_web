<template>
  <div class="page">
    <div class="model">
      <keep-alive>
        <component
          :is="currentTabComponent"
          @goRegister="goRegister"
          @goLogin="goLogin"
        />
      </keep-alive>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, markRaw } from 'vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
export default defineComponent({
  components: { Login, Register },
  setup () {
    const currentTabComponentList = [
      { name: Login, component: markRaw(Login) },
      { name: Register, component: markRaw(Register) }
    ]
    const currentTabComponent = ref(currentTabComponentList[0].component)
    const goRegister = () => {
      currentTabComponent.value = currentTabComponentList[1].component
    }
    const goLogin = () => {
      currentTabComponent.value = currentTabComponentList[0].component
    }
    return { currentTabComponent, goRegister, goLogin }
  }
})
</script>

<style lang="scss" scoped>

.page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;
  background-color: rgb(249, 252, 255);
  margin: 0;
  padding: 0;
  .model {
    width: 500px;
    padding: 50px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 10px 3px #c7c9cb4d;
  }
}
</style>
