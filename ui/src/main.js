import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Plugins
import Element from 'element-ui'
import VeeValidate from 'vee-validate'
import { sync } from 'vuex-router-sync'

// Styles
import 'bootstrap/dist/css/bootstrap.css'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import 'element-ui/lib/theme-chalk/index.css'

// Plugin initialization
Vue.use(Element)
Vue.use(VeeValidate)

sync(store, router)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
