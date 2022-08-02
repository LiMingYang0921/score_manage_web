<template>
  <div class="user">
    <el-avatar class="avatar" :size="30" :src="avatar" />
    <el-dropdown>
      <span>
        {{ username }}
        <el-icon>
          <ArrowDown />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logOutClick">退出登入</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { logout } from '@/utils/useUser'
import { ArrowDown } from '@element-plus/icons-vue'
import request from '@/api/index'

const getUserInfo = () => {
  const store = useStore()
  const userInfo = reactive({
    avatar: '',
    username: ''
  })
  request.XHRUserInfo().then((res) => {
    if (res.code === 200) {
      const { avatar, username } = res.data
      userInfo.avatar = avatar
      userInfo.username = username
      store.commit('setUserInfo', res.data)
    }
  })
  return { userInfo }
}

export default defineComponent({
  components: { ArrowDown },
  setup () {
    const { userInfo } = getUserInfo()
    const logOutClick = () => {
      logout()
    }
    return { ...toRefs(userInfo), logOutClick }
  }
})
</script>
<style lang="scss" scoped>
.user {
  display: flex;
  align-items: center;

  .avatar {
    margin-right: 10px;
  }
}
</style>
