# Vue-Mall

>一个基于vue2.0全家桶开发的电商网站

## 安装步骤
本项目是使用vue-cli脚手架生成的项目。

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```

## 技术栈

- MVVM框架： Vue2
- 源码：ES6
- 构建工具：webpack
- 前端路由：vue-router
- 状态管理：vuex
- 服务端通讯：axios
- 服务端：node.js
- 数据库：mongoDB

## 使用的插件

- Vue-Cli:官方的脚手架，用来初始化项目
- Vue-Resource：可以看作一个Ajax库，通过在跟组件引入，可以方便的注入子组件。子组件以this.$http调用
- Vue-Router：官方的路由工具，用来切换子组件，是用来做SPA应用的关键
- Vuex：控制组件中数据的流动，使得数据流动更加清晰，有迹可循。
- Vue-lazyload：实现图片懒加载
- Vue-infinite-scroll：图片无限滚动
- Vue-Validator：用来验证表单
- Currency：用来格式化金额


## 流程逻辑

登录 -> 浏览商品 -> 添加至购物车 -> 结算 -> 选择地址 -> 提交订单 -> 完成订单

## 前端路由配置

```javascript
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

```





