import type { RouteConfig } from 'vue-router'

export default [
  {
    path: '/',
    redirect: '/index',
    name: 'main',
    component: () => import('~/views/main/MainView.vue'),
    children: [
      {
        path: 'index',
        name: 'Home',
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
          keepAlive: true,
        },
        name: 'CURD',
        component: () => import(`~/views/CURD.vue`),
      },
      {
        path: 'users',
        name: 'AdminUser',
        meta: {
          title: '用户管理',
          icon: 'admin-user',
          keepAlive: true,
        },
        component: () => import(`~/views/system/AdminUser.vue`),
      },
      {
        path: 'roles',
        name: 'AdminRole',
        meta: {
          title: '权限管理',
          icon: 'admin-role',
          keepAlive: true,
        },
        component: () => import(`~/views/system/AdminRole.vue`),
      },
      {
        path: 't1',
        meta: {
          title: '一级目录',
          icon: 'dir',
        },
        component: () => import(`~/views/ParentView.vue`),
        children: [
          {
            path: 't1-1',
            component: () => import(`~/views/ParentView.vue`),
            meta: {
              title: '二级目录',
            },
            children: [
              {
                path: 't1-1-1',
                meta: {
                  title: '三级目录',
                },
                component: () => import(`~/views/ParentView.vue`),
                children: [
                  {
                    path: 't1-1-1-1',
                    name: 'Level4',
                    meta: {
                      title: '四级菜单',
                    },
                    component: () => import(`~/views/Level4.vue`),
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
    component: () => import(`~/views/ParentView.vue`),
  },
] as RouteConfig[]
