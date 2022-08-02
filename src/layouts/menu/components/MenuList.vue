<template>
  <el-menu class="el-menu-vertical-demo" :collapse="store.state.menuIsCollapse" :default-active="defaultActive"
    @select='onOpenChange'>
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
console.log(menuRouterList)

const menuList = ref<Array<IMenubarList>>([{
  meta: { title: '系统管理', icon: 'el-icon-tools' },
  path: 'system-manage',
  name: 'system-manage',
  children: [
    {
      path: '/system-manage/user',
      name: 'user',
      meta: { title: '用户管理', icon: 'el-icon-tools' }
    }, {
      path: '/system-manage/menu',
      name: 'user',
      meta: { title: '菜单管理', icon: 'el-icon-tools' }
    }
  ]
},
{
  meta: { title: '错误页面', icon: 'el-icon-tools' },
  name: 'error',
  path: 'error',
  children: [
    {
      path: '/403',
      name: '403',
      meta: { title: '403', icon: 'el-icon-tools' }
    },
    {
      path: '/404',
      name: '404',
      meta: { title: '404', icon: 'el-icon-tools' }
    }
  ]
}])

const defaultActive = ref<string>(route.path)

</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
