import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router' // (Step 1)
import Routes from './routes.js'
Vue.config.productionTip = false
Vue.use(VueRouter) // (Step 2)
Vue.config.productionTip = false

const myRouter = new VueRouter({
  routes:Routes,
  mode: 'history'
});

import QuantityCounter from './components/QuantityCounter'
import PageContent from './components/PageContent.vue'
Vue.component('PC',PageContent)
Vue.component('QtyCtr',QuantityCounter)

new Vue({
  render: h => h(App),
  router:myRouter
}).$mount('#app')
