<template>
  <div class="app-container">

    <!-- 顶部 Header区域 -->
    <mt-header fixed title="Vue项目 实战">
			<span slot="left" v-show="flag" @click="goBack">
				<mt-button icon="back">返回</mt-button>
			</span>
		</mt-header>


    <!-- 中间路由 router-view区域 -->
		<transition mode="out-in">
			<router-view></router-view>
		</transition>
    

    <!-- 底部Tabbar区域 -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-xdd" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-xdd" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-xdd" to="/cart">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span id="badge" class="mui-badge">{{ $store.getters.getAllCount }}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-xdd" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
export default {
	data(){
		return{
			flag: false
		}
	},
	created(){
		this.flag = this.$route.path==='/home'? false : true
	},
	methods:{
		// 点击后退
		goBack(){
			this.$router.go(-1)
		}
	},
	watch:{
		'$route.path': function(newVal){
			if(newVal === '/home'){
				this.flag = false
			}else {
				this.flag = true
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.mint-header {
	z-index: 100;
}
.app-container {
  padding-top: 40px;
	overflow-x: hidden;
	padding-bottom: 50px;
}

.v-enter {
	opacity: 0;
	transform: translateX(100%);
}
.v-leave-to {
	opacity: 0;
	transform: translateX(-100%);
	position: absolute;
}

.v-enter-active,
.v-leave-active {
	transition: all 0.2s ease;
}

// 修改类名解决 mui.js上的冲突
.mui-bar-tab .mui-tab-item-xdd.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-xdd {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-xdd .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-xdd .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>