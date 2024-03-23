import Vue from 'vue'
import router from './router'
import pinia from './stores'
import App from './App.vue'

import '~/styles/theme.scss'

new Vue({
  router,
  pinia,
  render: (h) => h(App),
}).$mount('#app')
