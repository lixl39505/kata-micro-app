import MainView from '~/components/MainView.vue'

export default [
  {
    path: '/',
    component: MainView,
    childrens: [
      {
        path: '',
        name: 'home',
        component: () => import('~/views/HomeView.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('~/views/AboutView.vue'),
      },
    ],
  },
]
