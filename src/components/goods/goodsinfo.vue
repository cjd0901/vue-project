<template>
  <div class="goodsinfo-container">


    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbolist="lunbolist" :isfull="false"></swiper>
        </div>
      </div>
    </div>


    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：<del>{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="nowprice">￥{{ goodsinfo.sell_price }}</span>
          </p>
          <p>购买数量：<numbox></numbox></p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>


    <!-- 商品详情区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsinfo.goods_no }}</p>
          <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" @click="goDesc(id)" plain>图文介绍</mt-button>
        <mt-button type="danger" size="large" @click="goComment(id)" plain>商品评论</mt-button>
      </div>
    </div>

  </div>
</template>

<script>

import swiper from '../subcomment/swiper.vue'
import numbox from '../subcomment/goodsinfo_numbox.vue'

export default {
  data(){
    return {
      id: this.$route.params.id, // 参数中传过来的id
      lunbolist: [], // 获取轮播图
      goodsinfo: {} // 商品信息
    }
  },
  created(){
    this.getLunbotu();
    this.getgoodsinfo();
  },
  methods: {
    getLunbotu(){ // 将路由参数对象中的id挂载到data
      this.$http.get('api/getthumimages/' + this.id).then(result=>{
        if(result.body.status === 0){
          // 循环轮播图数组的每一项，为每一项添加img属性，因为封装的轮播图组件，只认识item.img属性
          result.body.message.forEach(item=>{
            item.img = item.src
          })
          this.lunbolist = result.body.message
        }
      })
    },
    getgoodsinfo(){
      // 获取商品信息
      this.$http.get('api/goods/getinfo/' + this.id).then(result=>{
        if(result.body.status === 0){
          this.goodsinfo = result.body.message[0]
        }
      })
    },
    goDesc(id) {
      // 点击使用编程式导航跳转到图文介绍界面
      this.$router.push( { name: 'goodsdesc', params: { id: id }})
    },
    goComment(id) {
      // 点击跳转到评论页面
      this.$router.push( { name: 'goodscomment', params: { id: id }})
    }
  },
  components: {
    swiper,
    numbox
  }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
  
  .nowprice {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
}

</style>
