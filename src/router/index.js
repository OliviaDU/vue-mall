import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '../views/GoodsList'
import Cart from '../views/Cart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      //商品列表路由
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      //购物车路由
      path: '/cart',
      name: 'Cart',
      component: Cart
    }
  ]
})
