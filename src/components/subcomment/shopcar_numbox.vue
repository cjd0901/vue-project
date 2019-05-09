<template>
  <div class="mui-numbox" data-numbox-min='1' style="height: 25px">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" @change="countChanged" ref="numbox" :value="initcount" readonly/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>


</template>

<script>

import mui from "../../lib/mui/js/mui.min.js"

export default {
  mounted() {
    // 初始化数字选择框组件
    mui(".mui-numbox").numbox();
  },
  methods: {
    countChanged(){
      // 数量改变
      // console.log(this.$refs.numbox.value)
      // 每当数量值改变，则立即把最新的数量同步到购物车的store中，覆盖原来的值
      this.$store.commit("updateGoodsInfo",{ id: this.goodsid, count: this.$refs.numbox.value})
    }
  },
  props: ['initcount','goodsid']
}
</script>

<style lang="scss" scoped>

</style>
