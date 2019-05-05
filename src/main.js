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

// 导入MUI的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 按需导入 Mint-UI 
import { Header, Swipe, SwipeItem } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

//导入app根组件
import app from './App.vue'

var vm = new Vue({
  el: "#app",
  render: c => c(app),
  router: router
})