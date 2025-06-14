/**
 * 路由配置文件
 * 集中管理所有路由相关的配置和逻辑
 */
import { createRouter, createWebHistory } from 'vue-router'

// 页面组件映射类型定义
type PageComponentsMap = Record<string, () => Promise<any>>

/**
 * 动态导入页面组件
 * 使用Vue的动态导入实现按需加载
 */
const pageComponents: PageComponentsMap = {
  // 基础页面（静态导入）
  'Home': () => import('../views/Home.vue'),
  'Preview': () => import('../views/Preview.vue'),
  
  // 功能页面（动态导入）
  'home': () => import('../views/HomePage/index.vue'),
  'submit-success': () => import('../views/SubmitSuccess/index.vue'),
}

/**
 * 页面配置
 * 直接在路由中定义，不再依赖外部配置文件
 */
const appPages = [
  {
    id: 'home',
    title: '首页',
    path: '/home',
    docPath: '/src/views/HomePage/README.md',
    color: '#1989fa',
    icon: 'home-o',
    description: 'APP首页，展示主要功能入口和最新消息'
  },
  {
    id: 'submit-success',
    title: '提交成功',
    path: '/submit-success',
    docPath: '/src/views/SubmitSuccess/README.md',
    color: '#07c160',
    icon: 'success',
    description: '表单提交成功页面，展示提交结果和后续操作'
  }
];

/**
 * 构建路由配置
 */
const routes = [
  // 展示页面作为入口
  { 
    path: '/', 
    name: 'Home',
    component: pageComponents['Home']
  },
  
  // 预览页面路由
  { 
    path: '/preview/:id', 
    name: 'Preview',
    component: pageComponents['Preview'],
    props: true
  },
  
  // 功能页面路由
  ...appPages.map(page => ({
    path: page.path,
    name: page.id,
    component: pageComponents[page.id],
    meta: {
      title: page.title,
      docPath: page.docPath,
      color: page.color,
      icon: page.icon,
      description: page.description
    }
  }))
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局前置守卫 - 设置页面标题
router.beforeEach((to, _from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - APP功能展示`
  } else {
    document.title = 'APP功能展示'
  }
  next()
})

// 导出页面组件映射和页面配置，供其他组件使用
export { pageComponents, appPages }

// 导出路由实例作为默认导出
export default router