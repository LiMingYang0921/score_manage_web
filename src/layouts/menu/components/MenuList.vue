<template>
  <el-menu class="el-menu-vertical-demo" :collapse="store.state.menuIsCollapse" :default-active="defaultActive"
    @select="onOpenChange">
    <template v-for="item in menuList" :key="item.name">
      <template v-if="item.meta?.showInMenu !== false">
        <el-sub-menu v-if="item?.children" :index="item.path">
          <template #title>
            <el-icon>
              <Location />
            </el-icon>
            <span>{{ item.meta?.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="ite in item?.children" :key="ite.path" :index="ite.path">
              {{ ite.meta?.title }}
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item v-else :index="item.path">
          <el-icon>
            <icon-menu />
          </el-icon>
          <template #title>{{ item.meta?.title }}</template>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { AllRoutes, IMenubarList } from '@/router/index'
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { Menu as IconMenu, Location } from '@element-plus/icons-vue'
import request from '@/api/index'

const store = useStore()
const router = useRouter()
const route = useRoute()

const routerList = router.getRoutes()

const menuRouterList = reactive(
  AllRoutes.find((item) => item.name === 'home')?.children || []
)

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const onOpenChange = (d: string) => {
  router.push(d)
}

const menuList = ref<Array<IMenubarList>>([])
request.XHRMenuList().then((res) => {
  if (res.code === 200) {
    menuList.value = res.data ?? []
    store.commit('setUserInfo', res.data)
  }
  console.log('menuList', menuList.value)
})

const defaultActive = ref<string>(route.path)
</script>

<style scoped lang="scss">
:deep(.el-menu-item-group__title) {
  display: none;
}

:deep(.el-menu-vertical-demo:not(.el-menu--collapse)) {
  width: 200px;
  min-height: 400px;
}
</style>
