<template>
    <div>
        <!-- 导航头部  -->
        <nav-header></nav-header>
    
        <!-- 面包屑导航 start -->
        <nav-bread>
            <span>Goods</span>
        </nav-bread>
        <!-- 面包屑导航 end -->
    
        <div class="accessory-result-page accessory-page">
            <div class="container">
    
                <!-- 排序工具栏 start -->
                <div class="filter-nav">
                    <span class="sortby">Sort by:</span>
                    <a href="javascript:void(0)" class="default cur">Default</a>
                    <a @click="sortGoods" href="javascript:void(0)" class="price">Price
                        <svg class="icon icon-arrow-short">
                            <use xlink:href="#icon-arrow-short"></use>
                        </svg>
                    </a>
                    <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
                </div>
                <!-- 排序工具栏 end -->
    
                <div class="accessory-result">
    
                    <!-- 响应式价格选择栏 start -->
                    <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
                        <dl class="filter-price">
                            <dt>Price:</dt>
                            <dd>
                                <a href="javascript:void(0)" :class="{'cur':priceChecked==='all'}" @click="priceChecked='all'">All</a>
                            </dd>
                            <dd v-for="(price,index) in priceFilter" :key="price.startPrice" @click="setPriceFilter(index)">
                                <a href="javascript:void(0)" :class="{'cur':priceChecked===index}">{{price.startPrice}} - {{price.endPrice}}</a>
                            </dd>
                        </dl>
                    </div>
                    <!-- 响应式价格选择栏 end -->
    
                    <!-- 商品展示区 start -->
                    <div class="accessory-list-wrap">
                        <div class="accessory-list col-4">
                            <ul>
                                <li v-for="goods in goodsList" :key="goods.productId">
                                    <div class="pic">
                                        <a href="#">
                                            <img v-lazy="'/static/'+goods.productImage" alt="">
                                        </a>
                                    </div>
                                    <div class="main">
                                        <div class="name">{{goods.productName}}</div>
                                        <div class="price">{{goods.salePrice}}</div>
                                        <div class="btn-area">
                                            <a href="javascript:;" class="btn btn--m">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="load-more">
                            <img src="../assets/loading-spinning-bubbles.svg" v-show="loading">
                        </div>
                    </div>
                    <!-- 商品展示区 end -->
    
                </div>
            </div>
        </div>
    
        <!-- 遮罩层 -->
        <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    
        <!-- 页脚 -->
        <nav-footer></nav-footer>
    </div>
</template>
<script>
import '../assets/css/base.css'
import '../assets/css/login.css'
import '../assets/css/product.css'

import NavHeader from '../components/NavHeader'
import NavFooter from '../components/NavFooter'
import NavBread from '../components/NavBread'
import axios from 'axios'

export default {
    components: {
        NavHeader,
        NavFooter,
        NavBread
    },
    data() {
        return {
            priceChecked: 'all',
            filterBy: false,
            overLayFlag: false,
            sortFlag: true,
            page: 1,
            pageSize: 8,
            busy: true,
            loading: false,
            goodsList: [],
            priceFilter: [
                {
                    startPrice: '0',
                    endPrice: '100'
                },
                {
                    startPrice: '100',
                    endPrice: '500'
                },
                {
                    startPrice: '500',
                    endPrice: '1000'
                },
                {
                    startPrice: '1000',
                    endPrice: '1500'
                }
            ]
        }
    },
    mounted() {
        this.getGoodsList();
    },
    methods: {
        showFilterPop() {
            this.filterBy = true;
            this.overLayFlag = true;
        },
        closePop() {
            this.filterBy = false;
            this.overLayFlag = false;
        },

        //flag代表分页是否需要累加
        getGoodsList(flag) {
            this.loading = true;
            //请求传递的参数
            let param = {
                page: this.page,
                pageSize: this.pageSize,
                sort: this.sortFlag ? 1 : -1,
                priceLevel: this.priceChecked
            };

            axios.get('/goods', {
                params: param
            }).then((res) => {
                this.loading = false;
                let data = res.data;
                if (data.status == '0') {
                    if (flag) {
                        this.goodsList = this.goodsList.concat(data.result.list);

                        //如果已经加载完所有数据
                        if (data.result.count == 0) {
                            this.busy = true;
                        } else {
                            this.busy = false;
                        }

                    } else {
                        this.goodsList = data.result.list;
                        this.busy = false;
                    }
                } else {
                    this.goodsList = [];
                }
            });
        },
        sortGoods() {
            this.sortFlag = !this.sortFlag;
            this.page = 1;
            this.getGoodsList();
        },
        setPriceFilter(index) {
            this.priceChecked = index;
            this.page = 1;
            this.getGoodsList();
            this.closePop();
        },
        loadMore: function () {
            this.busy = true;

            setTimeout(() => {
                this.page++;
                this.getGoodsList(true);
            }, 500);
        }

    }
}
</script>
