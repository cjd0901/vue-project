<template>
  <div class="goodsdescinfo">
    <h3>{{ info.title }}</h3>
    <hr>
    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      info: {}//图文数据
    }
  },
  created() {
    this.getDoodsDesc();
  },
  methods: {
    getDoodsDesc() {
      this.$http.get('api/goods/getdesc/' + this.id).then(result=>{
        if(result.body.status === 0){
          this.info = result.body.message[0]
        }
      })
    }
  }
}
</script>

<style lang="scss">
.goodsdescinfo {
  padding: 4px;
  h3 {
    text-align: center;
    font-size: 16px;
    color: crimson;
    margin: 15px 0;
  }
  .content {
    text-indent: 2em;
    img {
      width: 100%;
    }
  }
}
</style>
