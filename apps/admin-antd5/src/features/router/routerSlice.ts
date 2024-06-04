import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { LazyRouteFunction, RouteObject } from 'react-router-dom'
import { AppState } from '~/store'
import App from '~/App'

// const initialState: RouteInfo[] = [
//   {
//     lazy: loadMain,
//     children: [
//       {
//         path: '/',
//         lazy: () => import('~/views/Home'),
//       },
//     ],
//   },
//   {
//     path: '/login',
//     handle: {
//       auth: false,
//     },
//     lazy: () => import('~/views/Login'),
//   },
// ]

interface RouteInfo<Hanndle = { auth?: boolean }> {
  componentName: string
  path?: string
  handle?: Hanndle
  children?: RouteInfo<Hanndle>[]
}

const initialState: RouteInfo[] = [
  {
    componentName: 'main/MainView',
    children: [
      {
        path: '/',
        componentName: 'Home',
      },
    ],
  },
  {
    path: '/login',
    handle: {
      auth: false,
    },
    componentName: 'Login',
  },
]

const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    // 添加路由
    addRoute(state, action: PayloadAction<RouteInfo>) {
      let { payload: route } = action
      state.push(route)
    },
  },
})

export interface RouterState {
  // 最近访问的路由
  routes: RouteObject[]
}
export default routerSlice.reducer
export const { addRoute } = routerSlice.actions
export const selectRouteInfos = (state: AppState) => state.router || null
// 动态引入 route 组件
let routeModules = import.meta.glob('~/views/**/*.route.tsx') as unknown as Record<
  string,
  LazyRouteFunction<RouteObject>
>
routeModules = Object.keys(routeModules).reduce<typeof routeModules>((acc, k) => {
  let componentName = k.replace('.route.tsx', '')
  componentName = componentName.split('/views/').pop()!
  acc[componentName] = routeModules[k]
  return acc
}, {})
// 根据 routeInfo 配置动态生成 routes
export const selectRoutes = createSelector([selectRouteInfos], (routeInfos) => {
  let routes: RouteObject[] = []

  function iterate(current: RouteInfo, parent?: RouteObject) {
    let route: RouteObject = {
      lazy: routeModules[current.componentName],
      path: current.path,
      handle: current.handle,
    }

    if (parent) {
      if (!parent.children) parent.children = []
      parent.children.push(route)
    } else {
      routes.push(route)
    }
    if (current.children) current.children.every((v) => iterate(v, route))
  }

  routeInfos.every((v) => iterate(v))

  return [
    {
      Component: App, // App 作为根布局
      children: routes,
    },
  ] as RouteObject[]
})
