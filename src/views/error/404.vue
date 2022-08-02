<template>
  <div class="box">
    <img src="@/assets/images/404.png" alt="" />
    <div class="text">
      <h2 class="text1">伙计，你好像走错路了，这里是派大星的大脑，这里什么都没有，更没有蟹黄堡秘方</h2>
      <h6 class="text2">
        你最好检查一下你输入的网址是否正确，或者点击下方按钮返回首页。
      </h6>
      <el-button type="primary" round class="button" @click="goHomeClick">回首页</el-button>
    </div>
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
  padding: 0 20px;

  img {
    width: 30vw;
  }

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
