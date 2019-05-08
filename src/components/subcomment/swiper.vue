<template>
  <div>
    <mt-swipe :auto="4000">
      <!-- 在组件中需要:key -->
      <!-- 将来，谁使用轮播图组件，谁为我们船体lunbolist -->
      <!-- 此时，lunbolist应该是父组件向子组件传值 -->
      <mt-swipe-item v-for="item in lunbolist" :key="item.img">
      <img :src="item.img" :alt="item.id" :class="{ 'full': isfull }">
      </mt-swipe-item>
    </mt-swipe>
  </div>

  <!-- 分析：为什么商品页面中的轮播图不好看 -->
  <!-- 1、首页中的图片 宽高都是 100% -->
  <!-- 2、在商品详情中，轮播图的图片如果也使用100%,加载出来不好看 -->
  <!-- 3、商品详情页面中的轮播图，期望高度是100%，但是宽度为自适应 -->
  <!-- 4、经过分析，得到问题的原因：首页中的轮播图和 商品详情中的轮播图，分歧点为 宽度到底设置为多少 -->
</template>

<script>
export default {
  props: ['lunbolist', 'isfull']
}
</script>


<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    text-align: center;
    /* &:nth-child(1) {
      background-color: lightblue;
    }
    &:nth-child(2) {
      background-color: lightcoral;
    }
    &:nth-child(3) {
      background-color: lightgreen;
    } */
    img {
      //width: 100%;
      height: 100%;
    }

  }
}
.full {
  width: 100%;
}
</style>
