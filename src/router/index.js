import { createRouter, createWebHashHistory } from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'

/* Router Modules */
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //   path: '/icon',
  //   component: Layout,
  //   name: 'Icons',
  //   meta: {
  //     title: 'Icons',
  //     icon: 'lock',
  //     roles: ['admin'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/icons/index.vue'),
  //       name: 'IconsIndex',
  //       meta: { title: 'Icons', icon: 'icon', noCache: true, roles: ['dev'] }
  //     }
  //   ]
  // },
  {
    path: '/storage',
    component: Layout,
    name: 'Storage',
    meta: {
      title: '入库管理',
      icon: 'icon',
      roles: ['admin'] // you can set roles in root nav
    },
    redirect: '/storage/storage-add',
    children: [
      {
        path: 'storage-batch',
        component: () => import('@/views/storage/batch/index.vue'),
        name: 'StorageBatch',
        meta: {
          title: '入库码批量生成',
          icon: 'icon',
          roles: ['admin']
        }
      },
      {
        path: 'storage-add',
        component: () => import('@/views/storage/add/index.vue'),
        name: 'StorageAdd',
        meta: {
          title: '入库操作',
          icon: 'icon',
          roles: ['admin']
        }
      },
      {
        path: 'storage-fast-add',
        component: () => import('@/views/storage/fast-add/index.vue'),
        name: 'StorageFastAdd',
        meta: {
          title: '快速入库操作',
          icon: 'icon',
          roles: ['admin']
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

// 重置路由为静态路由
export const resetRouter = () => {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && asyncRoutes.find((item) => item.name === name)) {
      router.removeRoute(name)
    }
  })
}

export default router
