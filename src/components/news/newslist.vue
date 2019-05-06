<template>
  <div>
    <ul class="mui-table-view">
      <li v-for="item in newsList" :key="item.id" class="mui-table-view-cell mui-media">
        <a href="javascript:;">
          <img
            class="mui-media-object mui-pull-left"
            :src="item.img_url"
          >
          <div class="mui-media-body">
            <h1>{{ item.title }}</h1>
            <p class="mui-ellipsis">
              <span>发表时间：{{ item.add_time | dateFormat }}</span>
              <span>点击：{{ item.click }}次</span>
            </p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  data(){
    return{
      newsList: []
    }
  },
  created(){
    this.getNewsList();
  },
  methods:{
    getNewsList(){ //获取新闻列表
      this.$http.get("api/getnewslist").then((result)=>{
        //console.log(result)
        if(result.body.status === 0){
          // 如果没有失败，应该把数据保存到newsList中
          //console.log(result.body)
          this.newsList = result.body.message
        }else{
          Toast("获取新闻列表失败")
        }
      })
    }
  },
  filters: {
    dateFormat:function(dateStr){
      var date = new Date(dateStr)

      var year = date.getFullYear()
      var month = date.getMonth() 
      var day = date.getDay()
      var hour = date.getHours().toString().padStart(2, '0')
      var minute = date.getMinutes().toString().padStart(2, '0')
      var seconds = date.getSeconds().toString().padStart(2, '0')
      return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`
    }
  }
};
</script>

<style lang="scss" scoped>

.mui-table-view {
  li {
    h1 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: lightseagreen;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
