# Vue-Mall

>一个基于vue2.0全家桶开发的电商网站

## 项目运行

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
1. 模块化的组织代码
1. 前后端完全分离
- Node服务端除了主页外，不做模板渲染，渲染交给浏览器完成
- Node服务端不做任何路由切换的内容，这部分交给Vue-Router完成
- Node服务端只用来接收请求，查询数据库并用来返回值

## 流程逻辑

登录 -> 浏览商品 -> 添加至购物车 -> 结算 -> 选择地址 -> 提交订单 -> 完成订单



## 功能设计

- 登录模块
  - 前端表单验证
  - 后端验证
  - 记住登录状态
  - 用户登录拦截

- 商品列表模块

  - 图片分页懒加载（如何编写vue插件）
  - 价格排序
  - 价格过滤

- 购物车模块

  - 添加至购物车
  - 修改商品数量
- 地址模块

  - 删除地址
  - 设置默认地址
  - “显示更多”的收缩展开效果

- 订单模块
  - 生成订单号提交订单

## 使用的插件

- Vue-Cli：官方的脚手架，用来初始化项目
- Vue-Resource：可以看作一个Ajax库，通过在跟组件引入，可以方便的注入子组件。子组件以this.$http调用
- Vue-Router：官方的路由工具，用来切换子组件，是用来做SPA应用的关键
- Vuex：控制组件中数据的流动，使得数据流动更加清晰，有迹可循。
- Vue-lazyload：实现图片懒加载
- Vue-infinite-scroll：图片无限滚动
- Vue-Validator：用来验证表单
- Currency：用来格式化金额

## 组件设计

- 基础组件（./src/components）：NavHeader、NavFooter、NavBread、Modal和Counter。
- 页面组件（./src/views）:商品展示页面、购物车页面、地址页面、订单确认页面、订单提交成功页面。

## 后端接口设计

1. 数据库设计
1. restful风格的数据接口

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


### 响应式布局

1. 设计原则
- 优雅降级
- 针对受众多的设备先设计，大屏幕-->小屏幕
- 断点的选择：

2. 设置视口

```HTML
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

3. 媒体查询
- 根据视口大小应用媒体查询
- 使用相对单位
- 选择断点。以从小屏幕开始、不断扩展的方式选择主要断点。
