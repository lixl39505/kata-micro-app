import type { RouteObject } from 'react-router-dom'

const loadMain = () => import('~/views/main/MainView.route')

export default [
  {
    lazy: loadMain,
    children: [
      {
        path: '/',
        lazy: () => import('~/views/Home.route'),
      },
    ],
  },
  {
    path: '/login',
    handle: {
      auth: false,
    },
    lazy: () => import('~/views/Login.route'),
  },
] as RouteObject[]
