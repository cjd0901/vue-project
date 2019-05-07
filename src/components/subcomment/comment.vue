<template>
  <div class="cmt-container">
    <h1>发表评论</h1>
    <hr>
    <textarea v-model="msg" placeholder="请输入要评论的内容(最多129字)" maxlength="120"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

        <div class="cmt-list">
          <div class="cmt-item" v-for="(item,index) in cmtsList" :key="item.id">
            <div class="cmt-title">
              {{ index + 1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
            </div>
            <div class="cmt-body">
              {{ item.content === '' ? "此用户未评论任何内容" : item.content }}
            </div>
          </div>
        </div>
    <mt-button type="danger" size="large" @click="getMore" plain>加载更多</mt-button>

  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data(){
    return {
      pageIndex: 1, //默认展示第一页数据
      cmtsList: [], //所有的评论数据
      msg: '' //评论输入的内容
    }
  },
  created() {
    this.getComments()
  },
  methods: {
    getComments(){ // 获取评论
      this.$http.get("api/getcomments/" + 
      this.id + "?pageindex=" + this.pageIndex).then(result=>{
        if(result.body.status === 0){
          // this.cmtsList = result.body.message
          // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是以老数据，拼接上新数据
          this.cmtsList = this.cmtsList.concat(result.body.message);
        }else{
          Toast("获取评论失败")
        }
      })
    },
    getMore(){
      this.pageIndex++;
      this.getComments();
    },
    postComment(){
      if(this.msg.trim().length === 0){
        return Toast("评论内容不能为空")
      }

      // 发表评论
      // 参数1：请求的url地址
      // 参数2：提交给服务器的数据对象 { content:this.msg }
      // 参数3：定义提交的时候，表单中数据的格式{ emulateJSON:true }
      this.$http.post("api/postcomment/" + this.id, { content: this.msg.trim() }).then(function(result){
        if(result.body.status === 0){
          // 1、拼接一个评论对象
          var cmt = {
            user_name: "匿名用户",
            add_time: Date.now(),
            content: this.msg.trim()
          }
          this.cmtsList.unshift(cmt)
          this.msg = ''
        }
      })
    }
  },
  props: ['id']
}
</script>

<style lang="scss" scoped>
.cmt-container {
  h1 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 6px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        background-color: lightgray;
        line-height: 35px;
      }
      .cmt-body {
        height: 100%;
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
