<template>
  <div class="box">
    <div class="text">
      <h2 class="text1">
        海绵宝宝说：“嘿，痞老板，给我站住。你不能进去偷蟹黄堡的秘方”
      </h2>
      <h6 class="text2">“你最好点击下面赶紧回去”</h6>
      <el-button type="primary" round class="button" @click="goHomeClick">回首页</el-button>
    </div>
    <img src="@/assets/images/403.gif" alt="" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: '403',
  setup () {
    const router = useRouter()
    const goHomeClick = () => {
      router.push('/')
    }
    return {
      goHomeClick
    }
  }
})
</script>

<style lang='scss' scoped>
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .text {
    padding: 0 20px;

    .text1 {
      font-weight: 600;
      font-size: 40px;
      line-height: 2em;
    }

    .text2 {
      font-weight: 600;
      font-size: 20px;
      line-height: 2em;
    }

    .button {
      margin-top: 0.5em;
    }
  }

}
</style>
