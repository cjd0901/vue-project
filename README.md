# 这是一个vue的小项目

## 它很小很小

### 但它五脏俱全



## 制作首页App组件
+ 完成Header区域，使用的是Mint-ui的组件
+ 制作底部Tabbar区域，使用MUI中的代码
  - 在制作购物车图标的时候需要将mui的css样式和fonts拷贝到项目中去
+ 在中间放置 router-view 展示路由匹配到的组件

## 改造 Tabbar 的链接为router-link

## 设置路由高亮，替换默认的高亮类(router-link-active)为mui高亮类(mui-active)

## 点击Tabbar中的路由链接，展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据
+ 获取数据 使用vue-resource
+ 使用vue-resource的this.$http.get 获取数据
+ 获取到的数据，要保存到 data 上
+ 使用v-for循环渲染每个 轮播图的item项

## 改造mui九宫格的样式