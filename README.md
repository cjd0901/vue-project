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

## 改造 新闻资讯 路由链接

## 新闻资讯 页面制作
+ 绘制界面,使用MUI中的media-list.html
+ 使用 vue-resource 获取数据
+ 渲染真实数据
+ 格式化时间 使用全局过滤器(moment插件)

## 实现新闻资讯列表，点击跳转到新闻详情
+ 把列表中的每一项改造为router-link，同时，在跳转的时候应该提供唯一的ID标识符
+ 创建新闻详情的组件页面 NewsInfo.vue
+ 在 路由模块中，将新闻详情的路由地址和组件页面对应起来

## 实现新闻详情的页面布局和数据渲染

## 单独封装一个 comment.vue 评论组件
+ 创建一个单独的comment.vue组件模板
+ 在需要使用comment组件的页面中，先手动导入comment组件
- `import comment from './comment.vue'`
+ 在父组件中，使用`components`属性，将导入的comment组件，注册为自己的子组件
+ 将注册子组件时候的名称，以标签形式，在页面中引用

## 获取所有的评论数据并显示到页面中

## 实现点击加载更多评论的功能
+ 为加载更多按钮绑定点击事件，在事件中，请求下一页数据
+ 点击加载更过，让pageIndex++，然后重新调用 this.getComments()方法重新获取最新的数据
+ 为了防止新数据覆盖老数据的情况，在点击加载更多的时候，每当获取到新数据，可以调用数组的concat 将新数组跟老数组拼接起来

## 发表评论
+ 把文本框做双向数据绑定 v-model
+ 为发表按钮绑定一个点击事件
+ 校验评论内容是否为空，如果为空，则提示内容不能为空(Toast)
+ 通过vue-resource发送一个请求，把评论内容提交给服务器
+ 当发表评论完成后，重新刷新列表，以查看最新的评论
- 如果调用getComments方法重新刷新评论列表的话，可能只能得到最后一页的评论，前几页的评论获取不到
- 换一种思路：当评论成功后，在客户端，手动拼接出一个最新的评论对象，调用数组的unshift方法，把最新的评论，追加到data中comments的开头，这样就能完美实现刷新评论列表的需求

## 改造图片分享按钮为路由的链接并显示对应的组件页面

## 绘制图片列表 组件页面结构并美化样式
+ 制作顶部滑动条
+ 制作底部的图片列表

### 顶部滑动条
+ 需要使用MUI的 tab-top-webview-main.html的代码
+ 需要去掉slider区域的mui-fullscreen类
+ 滑动条无法正常触发滑动，通过检查发现需要初始化：
- 导入mui.js
- 调用官方提供的
```
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
```
+ 在初始化滑动条的时候，导入mui.js发现报错
```
 Uncaught TypeError:  properties may not be accessed on strict mode functions or the arguments objects for calls to them
```
- 经过排查，是由mui.js中调用了'caller', 'callee', and 'arguments'，但是，webpack打包好的bundle.js中，默认是严格模式，所以发生了冲突
- 解决方案：1、把mui.js中的代码修改(不现实) 2、把webpack 严格模式禁用
- 使用第二种方法：使用插件`babel-plugin-transform-remove-strict-mode`
,需要在.babelrc引用插件
`{
  "plugins": ["transform-remove-strict-mode"]
}`

+ 在谷歌浏览器中，默认不能进行滑动,需要设置样式(使用通配符给全局设置touch-action，作用是用于指定某个给定的区域是否允许用户操作，以及如何响应用户操作)
```
* {
  touch-action: pan-y;
}
```
+ 从首页进入图片分享页面的时候，滑动条无法正常工作，经过分析，发现滑动条必须要等DOM元素加载完毕，所以把初始化滑动条的代码，放入monted 钩子函数中去
+ 当滑动条调试好后，发现 Tabbar 无法切换组件，发现mui.js和Tabbar中的类冲突了，解决方案：修改`.mui-tab-item` 类名即可
+ 获取所有分类并渲染分类列表

## 制作图片列表区域
+ 图片列表需要使用懒加载技术，我们可以使用Mint—UI提供现成的组件`lazy-load`
+ 根据`lazy-load`的使用文档，尝试使用
+ 渲染图片列表数据

## 实现 图片列表的懒加载改造和样式美化

## 实现 点击图片跳转到图片详情页面
+ 在改在li成router-link的时候，需要设置tag属性指定要渲染的标签为li

## 实现详情页面的布局和美化，同时获取数据渲染页面

## 实现图片详情中缩略图的功能
+ 使用插件 vue-preview 缩略图插件
+ 获取到所有的图片列表，然后将 列表传入 `:slides` 中

