<template>
  <!-- <div class="goods-list">
    <router-link tag="div" :to="'/home/goodsinfo/' + item.id" v-for="item in goodslist" :key="item.id" class="goods-item">
      <img :src="item.img_url" alt="">
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </router-link>
    <mt-button @click="getMore" type="danger" size="large">加载更多</mt-button>
  </div> -->

  <!-- 在网页中，有两种跳转方式： -->
  <!-- 方式1：使用a标签的形式叫做标签跳转 -->
  <!-- 方式2：使用window.loacation.href的形式，叫做编程式导航 -->
  <div class="goods-list">
    <div v-for="item in goodslist" :key="item.id" class="goods-item" @click="goDetail(item.id)">
      <img :src="item.img_url" alt="">
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>
    <mt-button @click="getMore" type="danger" size="large">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      index: 1, // 分页的页数
      goodslist: []
    }
  },
  created() {
    this.getGoods();
  },
  methods:{
    getGoods(){
      // 获取商品列表
      this.$http.get("api/getgoods?pageindex=" + this.index).then(result=>{
        if(result.body.status === 0){
          //console.log(result)
          // this.goodslist = result.body.message;
          this.goodslist = this.goodslist.concat(result.body.message);
        }
      })
    },
    getMore(){
      this.index++
      this.getGoods();
    },
    goDetail(id){
      // 使用JS的形式进行路由导航

      // 注意：一定要区分this.$route 和 this.$router 这两个对象
      // 其中： this.$route 是路由参数对象，所有路由中的参数，params，query 都属于它
      // 其中： this.$router 是一个路由导航对象，用它可以方便的使用JS代码，实现路由的前进、后退、跳转到新的URL地址
      // 1.最简单的
      // this.$router.push('/home/goodsinfo/' + id)
      // 2.传递对象
      // this.$router.push({ path: '/home/goodsinfo/' + id })
      // 传递命名的路由(name属性是 router中定义的name属性值)
      this.$router.push({ name: "goodsinfo", params:{ id: id} })

    }
  } 
}
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px 7px;
  justify-content: space-between;

  .goods-item {
    width:49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 3px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }
    .info {
      background-color: #eee;
      .price {
        p {
          margin: 0;
          padding:5px;
        }
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          font-size: 12px;
          margin-left: 5px;
          text-decoration: line-through;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>
