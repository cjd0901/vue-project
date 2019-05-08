<template>
  <div class="photoinfo-container">
    <h1>{{ imageinfo.title }}</h1>
    <p class="subtitle">
      <span>发表时间：{{ imageinfo.add_time | dateFormat }}</span>
      <span>点击：{{ imageinfo.click }}次</span>
    </p>

    <hr>

    <!-- 缩略图区域 -->
    <vue-preview :slides="list" @close="handleClose"></vue-preview>

    <!-- 图片内容区域 -->
    <div class="content" v-html="imageinfo.content"></div>

    <!-- 放置一个现成的评论子组件,并传入图片id -->
    <comment-box :id="id"></comment-box>

  </div>
</template>

<script>
// 导入评论子组件
import comment from '../subcomment/comment.vue'

export default {
  data() {
    return {
      id: this.$route.params.id, // 从路由中获取到图片的id
      imageinfo: [], //图片详情
      list: [] // 缩略图数组
    }
  },
  created(){
    this.getPhotoInfo(),
    this.getThumbs()
  },
  methods: {
    getPhotoInfo(){
      // 获取图片的详情
      this.$http.get('api/getimageinfo/' + this.id).then(result=>{
        if(result.body.status === 0){
          //console.log(result)
          this.imageinfo = result.body.message[0]
          //console.log(result.body.message)
        }
      })
    },
    getThumbs(){
      // 获取缩略图
      this.$http.get('api/getthumimages/' + this.id).then(result=>{
        //console.log(result)
        if(result.body.status === 0){
          // 由于请求到的数据中只有src属性，所以循环每个图片，补全需要的数据
          result.body.message.forEach(item=>{
            item.w = 600
            item.h = 400
            item.msrc = item.src
          })
          // 把完整的数据保存到list中
          this.list = result.body.message
        }
      })
    },
    handleClose () {
        console.log('close event')
    }
  },
  components: { //注册子组件
    'comment-box': comment
  }
}
</script>

<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h1 {
    color: crimson;
    font-size: 15px;
    text-align: center;
    margin:15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
  
}
</style>
