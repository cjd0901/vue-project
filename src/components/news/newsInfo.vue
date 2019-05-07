<template>
  <div class="newsinfo-container">
    <!-- 标题 -->
    <h3 class="title">{{ newsinfo.title }}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>{{ newsinfo.add_time | dateFormat }}</span>
      <span>点击：{{ newsinfo.click }}次</span>
    </p>

    <hr>
    <!-- 内容区域 -->
    <div class="content" v-html="newsinfo.content"></div>

    <!-- 评论区域 -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>


<script>

import { Toast } from "mint-ui"
// 导入评论子组件
import comment from '../subcomment/comment.vue'
export default {
  data(){
    return {
      id: this.$route.params.id, //将url地址中传递过来的id值，挂载到data上，方便以后调用
      newsinfo: {} //新闻对象
    }
  },
  created(){
    this.getNewsInfo()
  },
  methods: {
    getNewsInfo(){ //获取新闻详情
      this.$http.get("api/getnew/" + this.id).then(result=>{
        //console.log(result)
        if(result.body.status === 0){
          this.newsinfo = result.body.message[0]
        }else{
          Toast("新闻获取失败")
        }
      })
    }
  },
  components: { //注册子组件的节点
    "comment-box": comment
  }
}
</script>

<style lang="scss" scoped>
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 17px;
    text-align: center;
    margin: 10px 0;
    color: crimson;
  }
  .subtitle {
    font-size: 13px;
    color: lightsalmon;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>
