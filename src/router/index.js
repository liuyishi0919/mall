import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/Goods/goods'
import Ratings from '@/components/Ratings/ratings'
import Seller from '@/components/Seller/seller'


// 使用Router
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods'
    }, {
      path: '/goods',
      name: 'Goods',
      component: Goods
    }, {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings
    }, {
      path: '/seller',
      name: 'Seller',
      component: Seller
    }
  ],
  //  router 默认使用 "hash", 浏览器的 URL 显示像这样 (http://localhost:8000/#/goods),
  //  mode 设置为 "history" 时，浏览器 URL 显示为 (http://localhost:8000/goods),
  mode: 'history',
  linkActiveClass: 'active', // 自定义路由激活时的类名
})
