import type { RouteObject } from 'react-router-dom'

const MainView = import('~/views/main/MainView')

export default [
  {
    async lazy() {
      let { Main } = await MainView

      return { Component: Main }
    },
    children: [
      {
        path: '/',
        async lazy() {
          let { Home } = await import('~/views/Home')

          return { Component: Home }
        },
      },
    ],
  },
  {
    path: '/login',
    handle: {
      auth: false,
    },
    async lazy() {
      let { Login } = await import('~/views/Login')

      return { Component: Login }
    },
  },
] as RouteObject[]
