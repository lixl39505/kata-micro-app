import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { LazyRouteFunction, RouteObject } from 'react-router-dom'
import type { WritableDraft } from 'immer'
import { AppState } from '~/store'
import App from '~/App'

export interface Handle {
  id: string
  pid: string
  tagName?: string
  icon?: string
  title?: string
  hideInMenu?: boolean
}
export interface SitePath extends Handle {
  path?: string
  lazy?: boolean
  children?: SitePath[]
}
export interface SitemapState {
  ids: string[]
  record: Record<string, SitePath>
}
// 静态路由
const staticalPaths: SitePath[] = [
  { id: 'main', pid: '', tagName: 'MainView' },
  { id: 'home', pid: 'main', path: '/', tagName: 'Home', title: '首页', icon: 'home' },
  { id: 'form', pid: 'main', path: '/form', tagName: 'Form', title: '表单', icon: 'table' },
  { id: 'lv1', pid: 'main', title: '一级目录', icon: 'dir' },
  { id: 'lv2', pid: 'lv1', title: '二级目录' },
  { id: 'lv3', pid: 'lv2', path: '/level3', tagName: 'Level3', title: '三级菜单' },
  { id: 'v3', pid: 'main', title: 'Vue3子应用' },
  { id: 'v3Home', pid: 'v3', path: '/v3/', tagName: 'SubAppV3', title: 'v3首页' },
  { id: 'v3Form', pid: 'v3', path: '/v3/form', tagName: 'SubAppV3', title: 'v3表单' },
  { id: 'v2', pid: 'main', title: 'Vue2子应用' },
  { id: 'v2Home', pid: 'v2', path: '/v2/', tagName: 'SubAppV2', title: 'v2首页' },
  { id: 'v2Form', pid: 'v2', path: '/v2/form', tagName: 'SubAppV2', title: 'v2表单' },
  { id: 'login', pid: '', path: '/login', tagName: 'Login', title: '登录' },
]
// helpers
const u = {
  createInitialState(list: SitePath[]) {
    let result: SitemapState = { ids: [], record: {} }
    // normalize
    list.forEach((v) => this.addSitePath(result, v))
    // nested
    result.ids.forEach((id) => this.appendToParent(result, result.record[id]))

    return result
  },
  addSitePath(state: SitemapState | WritableDraft<SitemapState>, sitePath: SitePath) {
    let v = { ...sitePath }
    state.ids.push(sitePath.id)
    state.record[sitePath.id] = v
  },
  appendToParent(state: SitemapState | WritableDraft<SitemapState>, sitePath: SitePath) {
    if (sitePath.pid) {
      let parent = state.record[sitePath.pid]
      if (parent) {
        if (parent.children) parent.children.push(sitePath)
        else parent.children = [sitePath]
      } else throw new Error(`Component <${sitePath.pid}> doesn't exist`)
    }
  },
  removeFromParent(state: SitemapState | WritableDraft<SitemapState>, sitePath: SitePath) {
    if (sitePath.pid) {
      let parent = state.record[sitePath.pid]
      if (parent && parent.children) {
        let i = parent.children.findIndex((v) => v.id === sitePath.id)
        if (i >= 0) parent.children.splice(i, 1)
      } else throw new Error(`Component <${sitePath.pid}> doesn't exist`)
    }
  },
}

const initialState = u.createInitialState(staticalPaths)
const routerSlice = createSlice({
  name: 'sitemap',
  initialState,
  reducers: {
    // 添加路由
    addSitePaths(state, action: PayloadAction<SitePath | SitePath[]>) {
      let routes = action.payload
      if (!Array.isArray(routes)) routes = [routes]
      routes.forEach((v) => {
        if (state.ids.findIndex((id) => id === v.id) >= 0) return
        u.addSitePath(state, v)
        u.appendToParent(state, v)
      })
    },
    // 删除路由
    removeSitePaths(state, action: PayloadAction<SitePath | SitePath[]>) {
      let routes = action.payload
      if (!Array.isArray(routes)) routes = [routes]

      routes.forEach((v) => {
        let i = state.ids.findIndex((id) => id === v.id)
        if (i < 0) return
        state.ids.splice(i, 1)
        delete state.record[v.id]
        u.removeFromParent(state, v)
      })
    },
    // 清空路由
    clearSitePaths(state) {
      state.ids = []
      state.record = {}
    },
  },
})

export default routerSlice.reducer
export const { addSitePaths, removeSitePaths, clearSitePaths } = routerSlice.actions
export const selectAllSitePathIds = (state: AppState) => state.sitemap.ids
export const selectSitePathRecords = (state: AppState) => state.sitemap.record
export const selectAllSitePaths = createSelector([selectAllSitePathIds, selectSitePathRecords], (ids, record) =>
  ids.map((id) => record[id]),
)
export const selectSitePathTree = createSelector([selectAllSitePaths], (sitePaths) =>
  sitePaths.filter((v) => v.pid === ''),
)

// 静态路由组件
let staticRouteComponents: Record<string, React.ComponentType> = {}

// 懒加载路由模块
let lazyRouteModules = import.meta.glob('~/views/**/*.lazy.tsx') as unknown as Record<
  string,
  LazyRouteFunction<RouteObject>
>
lazyRouteModules = Object.keys(lazyRouteModules).reduce<typeof lazyRouteModules>((acc, k) => {
  let id = k.replace('.lazy.tsx', '')
  id = id.split('/views/').pop()!.split('/').pop()! // filename without .lazy.tsx
  acc[id] = lazyRouteModules[k]
  return acc
}, {})

// 根据 sitePaths 动态生成 routes
export const selectRoutes = createSelector([selectSitePathTree], (sitePathTree) => {
  let routes: RouteObject[] = []

  function iterate(current: SitePath, parent?: RouteObject) {
    if (current.tagName) {
      let route: RouteObject = {
        path: current.path,
        handle: {
          id: current.id,
          pid: current.pid,
          tagName: current.tagName,
          icon: current.icon,
          title: current.title,
          hideInMenu: current.hideInMenu,
        },
      }
      // 默认懒加载
      if (current.lazy === false) route.Component = staticRouteComponents[current.tagName]
      else route.lazy = lazyRouteModules[current.tagName]

      if (parent) {
        if (!parent.children) parent.children = []
        parent.children.push(route)
      } else {
        routes.push(route)
      }
      // 新的父路由
      parent = route
    }
    if (current.children) current.children.forEach((v) => iterate(v, parent))
  }

  sitePathTree.forEach((v) => iterate(v))

  return [
    {
      Component: App, // App 作为根布局
      handle: {
        id: 'App',
        pid: '',
      },
      children: routes,
    },
  ] as RouteObject[]
})
