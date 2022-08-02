<template>
  <div class="menu_manage">
    <el-input v-model="input" placeholder="Please input" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup () {
    const input = ref<string>('')
    return { input }
  }
})
</script>
<style lang="scss" scoped>
</style>
