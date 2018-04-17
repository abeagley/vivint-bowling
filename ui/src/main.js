import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Language support (Element)
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

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

locale.use(lang)
sync(store, router)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
