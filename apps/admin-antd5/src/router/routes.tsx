import type { RouteObject } from 'react-router-dom'

const Main = import('~/views/main/MainView')

export default [
  {
    lazy: () => Main,
    children: [
      {
        path: '/',
        lazy: () => import('~/views/Home'),
      },
    ],
  },
] as RouteObject[]
