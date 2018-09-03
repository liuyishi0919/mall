// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'lib-flexible'
import 'common/scss/index.scss'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false;

// 将 axios 改写为 Vue 的原型属性
Vue.prototype.$axios = axios;
Vue.use(VueLazyload, {
  loading: require('assets/default.png')
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
