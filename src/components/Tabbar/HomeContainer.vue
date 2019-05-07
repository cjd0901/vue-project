<template>
  <div>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <!-- 在组件中需要:key -->
      <mt-swipe-item v-for="item in lunboList" :key="item.img">
      <img :src="item.img" :alt="item.id">
      </mt-swipe-item>
    </mt-swipe>

    <!-- 六宫格 使用mui代码 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/menu1.png" alt>
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../images/menu2.png" alt>
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu6.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>

    <h1>首页</h1>
  </div>
</template>


<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      lunboList: []//保存轮播图片的数组
    };
  },
  created() {
    this.getLunBo();
  },
  methods: {
    getLunBo(){
      this.$http.get("api/getlunbo").then(result => {
        //console.log(result.body);
        if(result.body.status === 0){
          this.lunboList = result.body.message;
        }else {
          Toast('加载轮播图失败')
        }
      })
    }
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
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: 0;
  img {
    width: 60px;
    height: 60px;
  }
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}

.mui-media-body {
  font-size: 13px;
}
</style>
