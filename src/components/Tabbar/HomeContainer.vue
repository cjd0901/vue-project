<template>
  <div>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <!-- 在组件中需要:key -->
      <mt-swipe-item v-for="item in lunboList" :key="item.id">
        <img src="item.img" alt="item.id">
      </mt-swipe-item>
    </mt-swipe>
    <h1>首页</h1>
  </div>
</template>


<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      lunboList: [
        //保存轮播图片的数组
        { id: 1, img: "./images/1.jpg" },
        { id: 2, img: "./images/2.jpg" }
      ]
    };
  },
  created() {
    //this.getLunBo();
  },
  methods: {
    // getLunBo(){
    //   this.$http.get("").then(result => {
    //     console.log(result.body);
    //     if(result.body.status === 0){
    //       this.lunboList = result.body.message;
    //     }else {
    //       Toast('加载轮播图失败')
    //     }
    //   })
    // }
  }
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    &:nth-child(1) {
      background-color: lightblue;
    }
    &:nth-child(2) {
      background-color: lightcoral;
    }
    &:nth-child(3) {
      background-color: lightgreen;
    }
  }
}
</style>
