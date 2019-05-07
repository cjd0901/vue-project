//1、导入vue-router
import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from './components/Tabbar/HomeContainer.vue'
import MemberContainer from './components/Tabbar/MemberContainer.vue'
import CartContainer from './components/Tabbar/CartContainer.vue'
import SearchContainer from './components/Tabbar/SearchContainer.vue'
import NewsList from './components/news/newslist.vue'
import Newsinfo from './components/news/newsInfo.vue'

//3、创建路由对象
var router = new VueRouter({
    routes: [ //配置路由规则
      { path: '/home', component: HomeContainer },
      { path: '/member', component: MemberContainer },
      { path: '/cart', component: CartContainer },
      { path: '/search', component: SearchContainer },
      { path: '/', redirect: '/home' },
      { path: '/home/newslist', component: NewsList},
      { path: '/home/newsinfo/:id', component: Newsinfo}
    ],
    linkActiveClass: 'mui-active' //覆盖默认的路由高亮类，默认的为router-link-active
})

export default router