// 入口文件 
import Vue from 'vue'
// 1.1导入路由的包
import VueRouter from 'vue-router'
// 1.2注册路由模块
Vue.use(VueRouter)
// 1.3 导入router.js路由模块
import router from './router.js'

// 注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)
// 每次刚进入网站，肯定会调用main.js ，在刚调用的时候，先从本地存储中，把购物车的数据存储到car中
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
  state: { //this.$store.state.***
    car: car // 将购物车中的商品的数据，用一个数组存储起来,在car数组中存储一些商品的对象，可以暂时将这个商品对象设计成这个样子 { id:商品id, count:要购买的数量, price: 商品的单价, selected: true | false}
  },
  mutations: { //this.$store.commit('方法名'，'按需传入唯一的参数')
    addToCar(state, goodsinfo){
      // 点击加入购物车把商品信息保存到store中的car上
      // 分析：
      // 1.如果购物车中，之前就已经有这个对应的商品了，那么只需要更新数量
      // 2.如果没有，则直接把商品数据push到car中即可

      // 假设在购物车中，没有找到对应的商品
      var flag = false

      state.car.some(item=>{
        if(item.id == goodsinfo.id){
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      // 如果最终循环完毕，得到的flag还是false，则把商品数据直接push到购物车中
      if(flag === false){
        state.car.push(goodsinfo)
      }

      // 当更新car之后，把car数组，存储到本地的localStorage中
      localStorage.setItem('car', JSON.stringify(state.car))

    },
    updateGoodsInfo(state, goodsinfo){
      // 更新购物车中商品的数量值
      // 分析
      state.car.some(item=>{
        if(item.id == goodsinfo.id){
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      // 当修改完商品的数量，把最新的购物车数据，保存到localStorage中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFromCar(state, id){
      // 根据id，从store中删除多赢的那条商品数据
      state.car.some((item, i)=>{
        if(item.id == id){
          state.car.splice(i, 1)
          return true
        }
      })
      // 将删除完毕后的最新购物车同步到本地
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsSelected(state, info){
      state.car.some(item=>{
        if(item.id == info.id){
          item.selected = info.selected
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: { //this.$store.getters.***
    // 相当于计算属性，也相当于filters
    getAllCount(state){
      var c = 0;
      state.car.forEach(item=>{
        c += item.count;
      })
      return c
    },
    getGoodsCount(state){
      var o = {}
      state.car.forEach(item=>{
        o[item.id] = item.count
      })
      return o
    },
    getGoodsSelected(state){
      var o = {}
      state.car.forEach(item=>{
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAndAmount(state){
      var o = {
        count: 0,// 勾选的数量
        amount: 0 // 勾选的总价
      }
      state.car.forEach(item=>{
        if(item.selected){
          o.count += item.count
          o.amount += item.price * item.count
        }
        
      })
    return o
    }
  }
})


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
  router: router, // 挂载路由对象
  store: store //挂载store状态管理对象
})