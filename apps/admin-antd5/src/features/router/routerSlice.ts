import { Action, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { LazyRouteFunction, RouteObject } from 'react-router-dom'
import type { WritableDraft } from 'immer'
import { AppState } from '~/store'
import App from '~/App'

export interface Handle {
  id: string
  icon?: string
  title?: string
  lazy?: boolean
  hideInMenu?: boolean
}
export interface RouteInfo<H = Partial<Handle>> {
  id: string
  pid: string
  path?: string
  handle?: H
  children?: RouteInfo<H>[]
}
export interface RouterState {
  ids: string[]
  record: Record<string, RouteInfo>
}
// 静态路由
const staticalRoutes: RouteInfo[] = [
  { id: 'MainView', pid: '', children: [] },
  { id: 'Home', pid: 'MainView', path: '/', handle: { title: '首页' } },
  { id: 'Form', pid: 'MainView', path: '/form', handle: { title: '表单' } },
  { id: 'Login', pid: '', path: '/login', handle: { title: '登录' } },
]
// helpers
const u = {
  createInitialState(list: RouteInfo[]) {
    let result: RouterState = { ids: [], record: {} }
    // normalize
    list.forEach((v) => this.addRoute(result, v))
    // nested
    result.ids.forEach((id) => this.appendToParent(result, result.record[id]))

    return result
  },
  addRoute(state: RouterState | WritableDraft<RouterState>, route: RouteInfo) {
    let v = { ...route }
    if (!v.handle) v.handle = {}
    v.handle.id = route.id // 携带 id
    state.ids.push(route.id)
    state.record[route.id] = v
  },
  appendToParent(state: RouterState | WritableDraft<RouterState>, route: RouteInfo) {
    if (route.pid) {
      let parent = state.record[route.pid]
      if (parent) {
        if (parent.children) parent.children.push(route)
        else parent.children = [route]
      } else throw new Error(`Component <${route.pid}> doesn't exist`)
    }
  },
  removeFromParent(state: RouterState | WritableDraft<RouterState>, route: RouteInfo) {
    if (route.pid) {
      let parent = state.record[route.pid]
      if (parent && parent.children) {
        let i = parent.children.findIndex((v) => v.id === route.id)
        if (i >= 0) parent.children.splice(i, 1)
      } else throw new Error(`Component <${route.pid}> doesn't exist`)
    }
  },
}

const initialState = u.createInitialState(staticalRoutes)
const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    // 添加路由
    addRoutes(state, action: PayloadAction<RouteInfo | RouteInfo[]>) {
      let routes = action.payload
      if (!Array.isArray(routes)) routes = [routes]
      routes.forEach((v) => {
        if (state.ids.findIndex((id) => id === v.id) >= 0) return
        u.addRoute(state, v)
        u.appendToParent(state, v)
      })
    },
    // 删除路由
    removeRoutes(state, action: PayloadAction<RouteInfo | RouteInfo[]>) {
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
    clearRoutes(state) {
      state.ids = []
      state.record = {}
    },
  },
})

export default routerSlice.reducer
export const { addRoutes, removeRoutes, clearRoutes } = routerSlice.actions
export const selectAllRouteIds = (state: AppState) => state.router.ids
export const selectRouteRecords = (state: AppState) => state.router.record
export const selectAllRouteInfos = createSelector([selectAllRouteIds, selectRouteRecords], (ids, record) =>
  ids.map((id) => record[id]),
)
export const selectRouteInfoTree = createSelector([selectAllRouteInfos], (routeInfos) =>
  routeInfos.filter((v) => v.pid === ''),
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

// 根据 routeInfos 动态生成 routes
export const selectRoutes = createSelector([selectAllRouteInfos], (routeInfos) => {
  let routes: RouteObject[] = []

  function iterate(current: RouteInfo, parent?: RouteObject) {
    let route: RouteObject = {
      path: current.path,
      handle: current.handle,
    }
    // 路由组件默认懒加载
    if (current.handle?.lazy === false) route.Component = staticRouteComponents[current.id]
    else route.lazy = lazyRouteModules[current.id]

    if (parent) {
      if (!parent.children) parent.children = []
      parent.children.push(route)
    } else {
      routes.push(route)
    }
    if (current.children) current.children.forEach((v) => iterate(v, route))
  }

  routeInfos.forEach((v) => iterate(v))

  return [
    {
      Component: App, // App 作为根布局
      handle: {
        id: 'App',
      },
      children: routes,
    },
  ] as RouteObject[]
})
