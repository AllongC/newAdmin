import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:3000'
axios.interceptors.request.use(config => {
  if (!config.headers.Authorization && localStorage.getItem('token')) {
    config.headers.Authorization = "Bearer " + localStorage.getItem('token')
  }
  return config
})
Vue.prototype.$axios = axios
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !localStorage.getItem('token')) {
    router.push('/login')
  }
  next()
})
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
