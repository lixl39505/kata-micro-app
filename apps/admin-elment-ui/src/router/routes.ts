import type { RouteConfig } from 'vue-router'

export default [
  {
    path: '/',
    name: 'main',
    component: () => import('~/views/main/MainView.vue'),
    children: [
      {
        path: 'index',
        name: 'home',
        meta: {
          title: '首页',
          icon: 'home',
        },
        component: () => import('~/views/Home.vue'),
      },
      {
        path: 'curd',
        meta: {
          title: 'CURD',
          icon: 'table',
        },
        component: () => import(`~/views/main/ParentView.vue`),
      },
      {
        path: 'users',
        meta: {
          title: '用户管理',
          icon: 'user',
        },
        component: () => import(`~/views/main/ParentView.vue`),
      },
      {
        path: 'roles',
        meta: {
          title: '权限管理',
          icon: 'role',
        },
        component: () => import(`~/views/main/ParentView.vue`),
      },
      {
        path: 't1',
        meta: {
          title: '一级目录',
          icon: 'dir',
        },
        component: () => import(`~/views/main/ParentView.vue`),
        children: [
          {
            path: 't1-1',
            component: () => import(`~/views/main/ParentView.vue`),
            meta: {
              title: '二级目录',
            },
            children: [
              {
                path: 't1-1-1',
                meta: {
                  title: '三级目录',
                },
                component: () => import(`~/views/main/ParentView.vue`),
                children: [
                  {
                    path: 't1-1-1-1',
                    meta: {
                      title: '四级菜单',
                    },
                    component: () => import(`~/views/main/ParentView.vue`),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(`~/views/main/ParentView.vue`),
  },
] as RouteConfig[]
