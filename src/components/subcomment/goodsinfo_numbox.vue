<template>
<!-- 问题：不知道什么时候能够拿到max值，但是，总归有一刻，会得到一个max值 -->
<!-- 可以使用 watch属性监听，来监听父组件传递过来的max值，不管watch会被触发几次，最后一次肯定有max值 -->
  <div class="mui-numbox" data-numbox-min='1'>
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox" />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>

  <!-- 分析：子组件什么时候把数据传递给父组件 -->


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
      // 每当文本框的数据被修改的时候，立即把最新的数据，通过事件调用，传递给父组件
      // console.log(this.$refs.numbox.value)
      this.$emit('getCount', parseInt(this.$refs.numbox.value));
    }
  },
  props: ['max'],
  watch: {
    // 属性监听
    'max': function(newVal, oldVal){
      // 使用 mui 官网api 设置numbox最大值
      mui(".mui-numbox").numbox().setOption('max', newVal)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
