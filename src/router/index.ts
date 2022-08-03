import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

export interface IMenubarList {
  name?: string
  parentId?: number | string
  id?: number | string
  path?: string
  redirect?: string
  meta?: {
    title?: string
    icon?: string
    showInMenu?: boolean,
    permission?: string[]
    activeMenu?: string // 路由设置了该属性，则会高亮相对应的侧边栏
    noCache?: boolean // 页面是否不缓存
    hidden?: boolean // 是否隐藏路由
    alwaysShow?: boolean // 当子路由只有一个的时候是否显示当前路由
  }
  component?: () => Promise<typeof import('*.vue')>,
  children?: Array<IMenubarList>
}

export const AllRoutes: Array<IMenubarList> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Index.vue')
  },
  {
    path: '/',
    name: 'home',
    redirect: '/system-manage',
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: 'system-manage',
        name: 'system-manage',
        redirect: '/system-manage/teacher',
        meta: { title: '用户管理', icon: 'el-icon-tools' },
        children: [
          {
            path: '/system-manage/teacher',
            name: 'teacher',
            component: () => import('@/views/user/User.vue'),
            meta: { title: '老师管理', icon: 'el-icon-tools' }
          },
          {
            path: '/system-manage/menu',
            name: 'menu',
            component: () => import('@/views/menu/Menu.vue'),
            meta: { title: '学生管理', icon: 'el-icon-tools' }
          }
        ]
      },
      {
        path: '/project',
        name: 'project',
        component: () => import('@/views/project/Project.vue'),
        meta: { title: '项目管理', icon: 'el-icon-tools' }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/error/404.vue')
  },
  {
    path: '/403',
    name: '403',
    component: () => import('../views/error/403.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: AllRoutes as RouteRecordRaw[]
})

router.beforeEach((to, from, next) => {
  if (!to?.name) {
    next('/404')
  } else {
    if (router.hasRoute(to.name)) {
      const token = localStorage.token
      const { path } = to
      if (token || path === '/login') {
        next()
      } else {
        next({ path: '/login' })
      }
    } else {
      next('/404')
    }
  }
})

export default router
