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

## 设计思想

1. 组件化

    每个页面都是由组件拼接而成。
1. 模块化的组织代码
1. 前后端完全分离
- Node服务端除了主页外，不做模板渲染，渲染交给浏览器完成
- Node服务端不做任何路由切换的内容，这部分交给Vue-Router完成
- Node服务端只用来接收请求，查询数据库并用来返回值

## 系统设计

1. 后端接口设计，restful风格的数据接口
1. 数据库设计

## 功能设计

登录
商品展示 图片懒加载（如何编写vue插件） 排序 价格过滤
购物车
订单

## 使用的插件

- Vue-Cli:官方的脚手架，用来初始化项目
- Vue-Resource：可以看作一个Ajax库，通过在跟组件引入，可以方便的注入子组件。子组件以this.$http调用
- Vue-Router：官方的路由工具，用来切换子组件，是用来做SPA应用的关键
- Vuex：控制组件中数据的流动，使得数据流动更加清晰，有迹可循。
- Vue-lazyload：实现图片懒加载
- Vue-infinite-scroll：图片无限滚动
- Vue-Validator：用来验证表单
- Currency：用来格式化金额

## 组件设计

- 业务组件：
- 基础组件：

## 流程逻辑

登录 -> 浏览商品 -> 添加至购物车 -> 结算 -> 选择地址 -> 提交订单 -> 完成订单

## 目录结构

截图

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

## 前后端交互

- 后端是用node.js作为服务器的，使用了Express框架。主要用于前端发送的get和post请求。通过mongoose来查询数据库并返回数据。
- 前端页面通过promise控制异步操作，把得到的数据放入组件的data对象中，Vue侦测变化并更新视图。

## 主要难点

1. 如何区分基础组件和业务组件，并把基础组件抽象成一个公共组件库？

    从这些众多组件中提取出哪些是基础组件，哪些是业务组件，哪些组件可被复用等等。

    - 基础组件：不包含业务逻辑，可以被轻松复用的组件，如modal、navheader、navbread、counter等等。可以作为插件发布在npm上。
    - 业务组件：包含一些与后端接口通讯的逻辑的组件，只适合某一特定的业务应用场景。    
    业务组件不建议使用 Vuex，需要考虑到不同的使用方对 Vuex 内部变量的定义和使用是不相同的。
    - 动态组件

1. 如何让多个 Vue 组件共享状态

1. Vue 组件间如何通讯

1. 跨域

    vue-cli自带的config的proxyTable文件配置进行解决，配置非常简单：

```javascript
 proxyTable: {
      '/goods':{
        target:'http://localhost:3000'
      },
      '/goods/*':{
        target:'http://localhost:3000'
      },
      '/users/**':{
        target:'http://localhost:3000'
      }
    }
```

5. 响应式布局

## Todo

## 个人收获

对Vue.js中的数据绑定，组件化和数据流了解的更深入了一层，同时也对Node.js的后端有了一次优雅的实践。




