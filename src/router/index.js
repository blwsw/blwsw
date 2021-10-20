import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'
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
// import menu1 from '@/assets/images/menu-01.svg'
// import menu2 from '@/assets/images/menu-02.svg'
// import menu3 from '@/assets/images/menu-03.svg'
// import menu4 from '@/assets/images/menu-04.svg'
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path(.*)',
    component: () =>
      import ('@/views/redirect/index')
  }]
},
{
  path: '/login',
  component: () =>
    import ('@/views/login/index'),
  hidden: true
},
{
  path: '/auth-redirect',
  component: () =>
    import ('@/views/login/auth-redirect'),
  hidden: true
},
{
  path: '/404',
  component: () =>
    import ('@/views/error-page/404'),
  hidden: true
},
{
  path: '/401',
  component: () =>
    import ('@/views/error-page/401'),
  hidden: true
},
{
  path: '/profile',
  redirect: '/profile/index',
  hidden: true,
  component: Layout,
  children: [{
    path: 'index',
    component: () =>
      import ('@/views/profile/index'),
    name: 'Profile',
    meta: { title: 'profile', icon: 'user', noCache: true }
  }]
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    component: () =>
      import ('@/views/equipment/monitors'),
    name: 'Dashboard',
    meta: { title: 'dashboard', icon: 'menu1', affix: true }
  }]
}
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [{
  path: '/user',
  component: Layout,
  redirect: '/user/user-manager',
  alwaysShow: true, // will always show the root menu
  name: 'user',
  meta: {
    title: '用户管理',
    icon: 'menu2',
    roles: ['admin', 'admin1', 'admin2', 'admin3', 'editor', 'blw'] // you can set roles in root nav
  },
  children: [{
    path: 'user-manager',
    component: () =>
      import ('@/views/user/user-manager'),
    name: 'user-manager',
    meta: {
      title: '用户管理',
      roles: ['admin', 'admin1', 'admin2', 'admin3', 'editor', 'blw'] // or you can only set roles in sub nav
    }
  }
  // ,
  //   {
  //     path: 'DepartmentManage',
  //     component: () =>
  //       import ('@/views/DepartmentManage/DepartmentManage'),
  //     name: 'depart-manager',
  //     meta: {
  //       title: '组织管理',
  //       roles: ['admin', 'admin1', 'admin2', 'admin3', 'editor', 'blw'] // or you can only set roles in sub nav
  //     }
  //   }

  ]
},
{
  path: '/equipment',
  component: Layout,
  redirect: '/equipment/page',
  alwaysShow: true, // will always show the root menu
  name: 'equipment',
  meta: {
    title: '雷电防护系统',
    icon: 'menu3',
    roles: ['admin', 'admin1', 'admin2', 'admin3', 'editor', 'blw'] // you can set roles in root nav
  },
  children: [
    // {
    //   path: 'monitors',
    //   component: () =>
    //     import ('@/views/equipment/monitors'),
    //   name: 'monitors',
    //   meta: {
    //     title: '智慧大屏',
    //     roles: ['blw', 'admin1', 'admin2', 'admin3', 'editor']
    //   }
    // },
    // {
    //   path: 'statusAnalysis',
    //   component: () =>
    //     import ('@/views/equipment/statusAnalysis'),
    //   name: 'statusAnalysis',
    //   meta: {
    //     title: '设备状态概览',
    //     roles: ['admin', 'blw', 'admin1', 'admin2', 'admin3', 'editor'] // or you can only set roles in sub nav
    //   }
    // },
    {
      path: 'device-list-tab',
      component: () =>
        import ('@/views/equipment/device-list-tab'),
      name: 'device-list-tab',
      meta: {
        title: '设备分布列表',
        // if do not set roles, means: this page does not require permission
        roles: ['admin', 'blw', 'admin1', 'admin2', 'admin3', 'editor']
      }
    },
    {
      path: 'status-data',
      component: () =>
        import ('@/views/equipment/statusData'),
      name: 'statusData',
      meta: {
        title: '设备状态数据'
        // roles: ['admin']
      }
    },
    {
      path: 'device-manage',
      component: () =>
        import ('@/views/device-manage/device-tab'),
      name: 'deviceManage',
      meta: {
        title: '设备管理',
        roles: ['admin', 'admin1', 'admin2', 'admin3', 'editor', 'blw']
      }
    }, {
      path: 'upload-device',
      name: 'upload-device',
      component: () =>
        import ('@/views/device-manage/upload-device'),
      meta: { title: '导入设备', icon: 'dashboard', roles: ['admin', 'admin1', 'admin2', 'admin3', 'editor', 'blw'] },
      hidden: true
    }, {
      path: 'device-detail',
      name: 'device-detail',
      component: () =>
        import ('@/views/device-manage/device-detail'),
      meta: { title: '设备详情', icon: 'dashboard', roles: ['admin', 'admin1', 'admin2', 'admin3', 'editor', 'blw'] },
      hidden: true
    },
    {
      path: 'historys',
      component: () =>
        import ('@/views/historys/index'),
      name: 'historys',
      meta: {
        title: '历史记录',
        roles: ['admin', 'admin1', 'admin2', 'admin3', 'editor', 'blw']
      }
    },
    {
      path: 'upload-history',
      component: () =>
        import ('@/views/historys/upload-history'),
      name: 'upload-history',
      meta: {
        title: '历史记录',
        roles: ['admin', 'admin1', 'admin2', 'admin3', 'editor', 'blw']
      },
      hidden: true
    }
  ]
},
{
  path: '/logs',
  component: Layout,
  redirect: '/logs',
  meta: { title: '日志管理', icon: 'dashboard' },
  name: 'logs',
  children: [{
    path: 'logs',
    component: () =>
      import ('@/views/logs/index'),
    name: 'logsQuery',
    meta: { title: '日志查询', icon: 'menu4', roles: ['admin', 'admin1', 'admin2', 'admin3', 'editor', 'blw'] }
  }, {
    path: '/logs/detail',
    name: 'logsDetail',
    component: () =>
      import ('@/views/logs/logsDetail.vue'),
    meta: { title: '日志详情', icon: 'dashboard', roles: ['admin', 'admin1', 'admin2', 'admin3', 'editor', 'blw'] },
    hidden: true
  }]
},
{
  path: '/permission',
  component: Layout,
  redirect: '/permission/page',
  alwaysShow: true, // will always show the root menu
  name: 'Permission',
  meta: {
    title: 'permission',
    icon: 'lock',
    roles: ['admin', 'editor', 'blw'] // you can set roles in root nav
  },
  children: [{
    path: 'page',
    component: () =>
      import ('@/views/permission/page'),
    name: 'PagePermission',
    meta: {
      title: 'pagePermission',
      roles: ['admin', 'blw'] // or you can only set roles in sub nav
    }
  },
  {
    path: 'directive',
    component: () =>
      import ('@/views/permission/directive'),
    name: 'DirectivePermission',
    meta: {
      title: 'directivePermission',
      roles: ['blw']
      // if do not set roles, means: this page does not require permission
    }
  },
  {
    path: 'role',
    component: () =>
      import ('@/views/permission/role'),
    name: 'RolePermission',
    meta: {
      title: 'rolePermission',
      roles: ['blw']
    }
  }
  ]
},

{
  path: '/icon',
  component: Layout,
  children: [{
    path: 'index',
    component: () =>
      import ('@/views/icons/index'),
    name: 'Icons',
    meta: { title: 'icons', icon: 'icon', noCache: true, roles: ['blw'] }
  }]
},

/** when your routing map is too long, you can split it into small modules **/
componentsRouter,
chartsRouter,
nestedRouter,
tableRouter,

{
  path: '/example',
  component: Layout,
  redirect: '/example/list',
  name: 'Example',
  meta: {
    title: 'example',
    icon: 'el-icon-s-help',
    roles: ['blw']
  },
  children: [{
    path: 'create',
    component: () =>
      import ('@/views/example/create'),
    name: 'CreateArticle',
    meta: { title: 'createArticle', icon: 'edit' }
  },
  {
    path: 'edit/:id(\\d+)',
    component: () =>
      import ('@/views/example/edit'),
    name: 'EditArticle',
    meta: { title: 'editArticle', noCache: true, activeMenu: '/example/list' },
    hidden: true
  },
  {
    path: 'list',
    component: () =>
      import ('@/views/example/list'),
    name: 'ArticleList',
    meta: { title: 'articleList', icon: 'list' }
  }
  ]
},

{
  path: '/tab',
  component: Layout,
  children: [{
    path: 'index',
    component: () =>
      import ('@/views/tab/index'),
    name: 'Tab',
    meta: { title: 'tab', icon: 'tab', roles: ['blw'] }
  }]
},

{
  path: '/error',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ErrorPages',
  meta: {
    title: 'errorPages',
    icon: '404',
    roles: ['blw']
  },
  children: [{
    path: '401',
    component: () =>
      import ('@/views/error-page/401'),
    name: 'Page401',
    meta: { title: 'page401', noCache: true }
  },
  {
    path: '404',
    component: () =>
      import ('@/views/error-page/404'),
    name: 'Page404',
    meta: { title: 'page404', noCache: true }
  }
  ]
},

{
  path: '/error-log',
  component: Layout,
  children: [{
    path: 'log',
    component: () =>
      import ('@/views/error-log/index'),
    name: 'ErrorLog',
    meta: { title: 'errorLog', icon: 'bug', roles: ['blw'] }
  }]
},

{
  path: '/excel',
  component: Layout,
  redirect: '/excel/export-excel',
  name: 'Excel',
  meta: {
    title: 'excel',
    icon: 'excel',
    roles: ['blw']
  },
  children: [{
    path: 'export-excel',
    component: () =>
      import ('@/views/excel/export-excel'),
    name: 'ExportExcel',
    meta: { title: 'exportExcel' }
  },
  {
    path: 'export-selected-excel',
    component: () =>
      import ('@/views/excel/select-excel'),
    name: 'SelectExcel',
    meta: { title: 'selectExcel' }
  },
  {
    path: 'export-merge-header',
    component: () =>
      import ('@/views/excel/merge-header'),
    name: 'MergeHeader',
    meta: { title: 'mergeHeader' }
  },
  {
    path: 'upload-excel',
    component: () =>
      import ('@/views/excel/upload-excel'),
    name: 'UploadExcel',
    meta: { title: 'uploadExcel' }
  }
  ]
},

{
  path: '/zip',
  component: Layout,
  redirect: '/zip/download',
  alwaysShow: true,
  name: 'Zip',
  meta: { title: 'zip', icon: 'zip', roles: ['blw'] },
  children: [{
    path: 'download',
    component: () =>
      import ('@/views/zip/index'),
    name: 'ExportZip',
    meta: { title: 'exportZip' }
  }]
},

{
  path: '/pdf',
  component: Layout,
  redirect: '/pdf/index',
  children: [{
    path: 'index',
    component: () =>
      import ('@/views/pdf/index'),
    name: 'PDF',
    meta: { title: 'pdf', icon: 'pdf', roles: ['blw'] }
  }]
},
{
  path: '/pdf/download',
  component: () =>
    import ('@/views/pdf/download'),
  hidden: true
},

{
  path: '/theme',
  component: Layout,
  children: [{
    path: 'index',
    component: () =>
      import ('@/views/theme/index'),
    name: 'Theme',
    meta: { title: 'theme', icon: 'theme', roles: ['blw'] }
  }]
},

{
  path: '/clipboard',
  component: Layout,
  children: [{
    path: 'index',
    component: () =>
      import ('@/views/clipboard/index'),
    name: 'ClipboardDemo',
    meta: { title: 'clipboardDemo', icon: 'clipboard', roles: ['blw'] }
  }]
},

{
  path: '/i18n',
  component: Layout,
  children: [{
    path: 'index',
    component: () =>
      import ('@/views/i18n-demo/index'),
    name: 'I18n',
    meta: { title: 'i18n', icon: 'international', roles: ['blw'] }
  }]
},

{
  path: 'external-link',
  component: Layout,
  children: [{
    path: 'https://github.com/PanJiaChen/vue-element-admin',
    meta: { title: 'externalLink', icon: 'link', roles: ['blw'] }
  }]
},

// 404 page must be placed at the end !!!
{ path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
