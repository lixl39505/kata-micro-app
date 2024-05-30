import type { RouteObject } from 'react-router-dom'

const loadMain = () => import('~/views/main/MainView')

export default [
  {
    lazy: loadMain,
    children: [
      {
        path: '/',
        lazy: () => import('~/views/Home'),
      },
    ],
  },
  {
    path: '/login',
    handle: {
      auth: false,
    },
    lazy: () => import('~/views/Login'),
  },
] as RouteObject[]
