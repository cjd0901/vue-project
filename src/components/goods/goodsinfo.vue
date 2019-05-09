<template>
  <!-- 加入购物车动画效果 -->
  <div class="goodsinfo-container">
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      >
      <div class="ball" ref="ball" v-show="ballFlag"></div>
    </transition>

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
          <p>购买数量：<numbox :max="goodsinfo.stock_quantity" @getCount="getSelectedCount"></numbox></p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToCart">加入购物车</mt-button>

            <!-- 分析：如何实现加入购物车的时候，拿到选择的数量 -->
            <!-- 1.经过分析：发现按钮属于goodinfo页面，数字属于numberbox组件 -->
            <!-- 2.由于涉及到了父子组件的潜逃了，所以，无法直接在goodsinfo中获取到选中的商品数量值 -->
            <!-- 3.解决思路：涉及到了子组件想父组件传值了（事件调用机制） -->
            <!-- 4.事件调用的本质：父向子传递方法，子调用这个方法，同时把数据当做参数传给父 -->
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
      goodsinfo: {}, // 商品信息
      ballFlag: false, // 控制小球的隐藏和显示的标识符
      selectCount: 1 // 设置购买数量默认为1
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
    },
    addToCart(){
      //添加到购物车
      this.ballFlag = !this.ballFlag
    },
    beforeEnter(el){
      el.style.transform = "translate(0,0)"
    },
    enter(el, done){
      // 小球动画优化思路：
      // 1.先分析导致动画不准确的本质原因：我们把小球最终位移到的位置，已经局限在了某一分辨率下且滚动条未滚动的情况下
      // 2.只要分辨率和测试的时候不一样，或者滚动条有一定的滚动距离之后，问题就出现了
      // 3.因此，经过分析，得到结论：不能把位置的横纵坐标直接写死了，而是应该根据不同情况，动态计算这个坐标值
      // 4.解决思路：先得到购物车右上角小球的横纵坐标，再得到小球的横纵坐标，然后x和y值求差，得到的结果就是要位移的距离
      // 5.如何获取 横纵坐标   domObject.getBoundingClientRect()

      // 获取小球在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取购物车右上角徽标在页面中的位置
      const badgePosition = document.getElementById('badge').getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top

      el.offsetWidth;
      el.style.transform = `translate(${xDist}px, ${yDist}px)`
      el.style.transition = "all 1s cubic-bezier(.83,-0.25,.5,.97)"
      done();
    },
    afterEnter(el){
      this.ballFlag = !this.ballFlag
    },
    getSelectedCount(count){
      // 当子组件把选中的数量传递给父组件的时候，把选中的值保存到data上
      this.selectCount = count;
      // console.log(this.selectCount)
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

  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 100;
    top: 408px;
    left: 147px;
  }
}

</style>
