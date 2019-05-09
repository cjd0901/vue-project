<template>
  <div class="shopcar-container">
    <!-- 商品列表 -->
    <div v-for="(item,index) in goodslist" :key="item.id" class="goods-list">
      <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">

            <mt-switch 
            v-model="$store.getters.getGoodsSelected[item.id]"
            @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path">
            
            <div class="info">
              <h1>{{ item.title }}</h1>
              <p>
                <span class="price">￥{{ item.sell_price }}</span>
                <numbox :goodsid="item.id" :initcount="$store.getters.getGoodsCount[item.id]"></numbox>
                <!-- 问题：如何从购物车中获取商品的数量 -->
                <!-- 1.先创建一个空对象，然后循环购物车中所有商品的数据，把当前循环的这条商品的id，最为对象的属性名，count值作为对象的属性值，这样当把所有的商品循环一遍，就会得到一个对象：{ 88: 2, 89: 1} -->
                <a href="#" @click.prevent="remove(item.id, index)">删除</a>
              </p>
            </div>

					</div>
				</div>
			</div>
    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计(不含运费)</p>
            <p>已勾选 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件，总价：￥ <span class="red">{{ $store.getters.getGoodsCountAndAmount.amount }}</span> </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>

    <p>{{ $store.getters.getGoodsSelected }}</p>

  </div>
</template>


<script>

import numbox from '../subcomment/shopcar_numbox.vue'

export default {
  data(){
    return {
      goodslist: [] // 购物车中所有商品的数据
    }
  },
  created(){
    this.getGoodsList();
  },
  methods: {
    getGoodsList(){
      // 1.获取到store中所有商品的id，然后拼接处一个用逗号分隔的字符串
      var idArr = []
      this.$store.state.car.forEach(item=>{
        idArr.push(item.id)
      })
      // 如果购物车中没有商品，则直接返回，不需要请求接口，否则会报错
      if(idArr.length <=0 ){
        return;
      }
      // 获取购物车商品列表
      this.$http.get('api/goods/getshopcarlist/' + idArr.join(",")).then(result=>{
        if(result.body.status === 0){
          this.goodslist = result.body.message
        }
      })
    },
    remove(id, index){
      // 点击删除，把商品从store中根据传递的id删除，同时，把当前组件中的goodslist中，对应要删除的商品，根据index删除
      // console.log(index)
      this.goodslist.splice(index, 1)
      this.$store.commit("removeFromCar", id)
    },
    selectedChanged(id, val){
      // 每当点击开关，把最新的开关状态 同步到store中
      // console.log(id + ' ' + val)
      this.$store.commit('updateGoodsSelected', { id, selected: val})
    }
  },
  components: {
    numbox
  }
}
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        margin: 0;
      }
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .jiesuan {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .red {
        color: red;
        font-weight: bold;
        font-size: 16px;
      }
  }
}
</style>
