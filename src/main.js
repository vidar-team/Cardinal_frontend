import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'
import utils from './utils'

Vue.config.productionTip = false
Vue.prototype.utils = utils

new Vue({
  render: h => h(App),
  router: router,
  vuetify,
}).$mount('#app')
