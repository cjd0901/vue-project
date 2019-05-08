//1、导入vue-router
import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from './components/Tabbar/HomeContainer.vue'
import MemberContainer from './components/Tabbar/MemberContainer.vue'
import CartContainer from './components/Tabbar/CartContainer.vue'
import SearchContainer from './components/Tabbar/SearchContainer.vue'
import NewsList from './components/news/newslist.vue'
import Newsinfo from './components/news/newsInfo.vue'
import PhotoList from './components/photos/photolist.vue'
import PhotoInfo from './components/photos/photoinfo.vue'
import GoodsList from './components/goods/goodslist.vue'
import GoodsInfo from './components/goods/goodsinfo.vue'
import GoodsDesc from './components/goods/goodsdesc.vue'
import GoodsComment from './components/goods/goodscomment.vue'

//3、创建路由对象
var router = new VueRouter({
    routes: [ //配置路由规则
      { path: '/home', component: HomeContainer },
      { path: '/member', component: MemberContainer },
      { path: '/cart', component: CartContainer },
      { path: '/search', component: SearchContainer },
      { path: '/', redirect: '/home' },
      { path: '/home/newslist', component: NewsList },
      { path: '/home/newsinfo/:id', component: Newsinfo },
      { path: '/home/photolist', component: PhotoList },
      { path: '/home/photoinfo/:id', component: PhotoInfo },
      { path: '/home/goodslist', component: GoodsList },
      { path: '/home/goodsinfo/:id', component: GoodsInfo, name: 'goodsinfo' },
      { path: '/home/goodsdesc/:id', component: GoodsDesc,name: 'goodsdesc' },
      { path: '/home/goodscomment/:id', component: GoodsComment, name:'goodscomment' },

    ],
    linkActiveClass: 'mui-active' //覆盖默认的路由高亮类，默认的为router-link-active
})

export default router