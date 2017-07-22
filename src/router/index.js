import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '../views/GoodsList'
import Cart from '../views/Cart'
import Address from '../views/Address'
import OrderConfirm from '../views/OrderConfirm'
import OrderSuccess from '../views/OrderSuccess'

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
    },
    {
      //地址路由
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      //订单确认路由
      path: '/orderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
    {
      //订单成功页面路由
      path: '/orderSuccess',
      name: 'OrderSuccess',
      component: OrderSuccess
    }
  ]
})
