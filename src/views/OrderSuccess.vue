<template>
  <div>
    <nav-header></nav-header>
    <div class="container">
      <div class="page-title-normal">
        <h2 class="page-title-h2">
          <span>结账</span>
        </h2>
      </div>
      <!-- 进度条 -->
      <div class="check-step">
        <ul>
          <li class="cur">确认地址</li>
          <li class="cur">查看订单</li>
          <li class="cur">付款</li>
          <li class="cur">完成订单</li>
        </ul>
      </div>
  
      <div class="order-create">
        <div class="order-create-pic">
          <img src="/static/ok-2.png" alt="">
        </div>
        <div class="order-create-main">
          <h3>
            <br>您的订单已成功提交!</h3>
          <p>
            <span>订单ID：{{orderId}}</span>
            <span>总价：{{orderTotal|currency('¥')}}</span>
          </p>
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">
              <router-link class="btn btn--m" to="/cart">返回购物车</router-link>
            </div>
            <div class="btn-r-wrap">
              <router-link class="btn btn--m" to="/">返回商品首页</router-link>
            </div>
          </div>
        </div>
      </div>
  
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavHeader from './../components/NavHeader'
import NavFooter from './../components/NavFooter'
import NavBread from './../components/NavBread'
import { currency } from './../util/currency'
import axios from 'axios'
export default {
  data() {
    return {
      orderId: '',
      orderTotal: 0
    }
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread
  },
  filters: {
    currency: currency
  },
  mounted() {
    let orderId = this.$route.query.orderId;

    if (!orderId) {
      return;
    }

    axios.get("/users/orderDetail", {
      params: {
        orderId: orderId
      }
    })
      .then((response) => {
        let res = response.data;
        if (res.status == '0') {
          this.orderId = orderId;
          this.orderTotal = res.result.orderTotal;
        }
      })
      .catch((err) => {
        console.log('failed ' + err.message);
      });
  }
}
</script>
