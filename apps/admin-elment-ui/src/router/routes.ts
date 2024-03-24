import MainView from '~/components/MainView.vue'

export default [
  {
    path: '/',
    component: MainView,
    childrens: [
      {
        path: '',
        name: 'home',
        component: () => import('~/views/Home.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('~/views/About.vue'),
      },
    ],
  },
]
