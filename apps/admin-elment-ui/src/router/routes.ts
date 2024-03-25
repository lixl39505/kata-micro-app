import type { RouteConfig } from 'vue-router'

export default [
  {
    path: '/',
    component: () => import('~/views/main/MainView.vue'),
    children: [
      {
        path: 'index',
        name: 'home',
        component: () => import('~/views/Home.vue'),
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('~/views/About.vue'),
      },
    ],
  },
] as RouteConfig[]
