// 入口文件 
import Vue from 'vue'
// 1.1导入路由的包
import VueRouter from 'vue-router'
// 1.2注册路由模块
Vue.use(VueRouter)
// 1.3 导入router.js路由模块
import router from './router.js'

// 2.1 导入vue-resource
import VueResource from 'vue-resource'
// 2.2 注册vue-resource
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005/';
// 全局设置 post 时表单提交的数据格式 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true


// 导入MUI的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 按需导入 Mint-UI 
// import { Header, Swipe, SwipeItem, Button } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// import { Lazyload } from 'mint-ui'
// Vue.use(Lazyload);
// 由于懒加载的原因，需要完整引入
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//导入app根组件
import app from './App.vue'

// 导入格式化时间的插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat', function(date, pattern="YYYY-MM-DD HH:mm:ss"){
  return moment(date).format(pattern)
})


var vm = new Vue({
  el: "#app",
  render: c => c(app),
  router: router
})