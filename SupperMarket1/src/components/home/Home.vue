<template>
	<div class="home">
		<!-- 顶部 -->
		<div class="header">
			<!-- 系统管理 -->
			<div class="admin">
				<div class="left" @click="goHome">
					<img src="/pic/buy.png" />
					<span>超市后台管理系统</span>
				</div>
				<div class="right">
					<!-- 问候 -->
					<span>
						{{tips}}
					</span>
					<span>
						{{username}}
					</span>
					<el-button type="success" @click="logout()">退出</el-button>
				</div>
			</div>
			<!-- 系统时间 -->
			<div class="time">
				<div class="left">
					<img src="/pic/time.png" />
					<span>
						{{date}}
					</span>
				</div>
				<div class="right">
					温馨提示：为了正常显示内容，请使用IE10及以上版本
				</div>
			</div>
		</div>
		<!-- 主体内容 -->
		<div class="content">
			<!-- 侧边栏菜单 -->
			<ul class="left-nav">
				<li>功能列表</li>
				<li :class="{lb:lbs[0]}" @click="goProduct"><img src="/pic/goods.png" />商品管理</li>
				<li :class="{lb:lbs[1]}" @click="goBill"><img src="/pic/zd.png" />订单管理</li>
				<li :class="{lb:lbs[2]}" @click="goSupplier"><img src="/pic/gys.png" />供应商管理</li>
				<li :class="{lb:lbs[3]}" @click="goUser"><img src="/pic/yh.png" />用户管理</li>
				<li :class="{lb:lbs[4]}" @click="goPass"><img src="/pic/mm.png" />密码修改</li>
				<li @click="logout"><img src="/pic/tc.png" />退出系统</li>
			</ul>
			<div class="right">
				<!-- 主体内容 -->
				<div class="main">
					<!-- 路由渲染容器：更新内容 -->
					<router-view />
				</div>
				<!-- 公司信息，技术支持，联系方式，版权等 -->
				<div class="info">
					<!-- <i class="fas fa-book"></i> -->
					超客集团&copy;版权所有.2026-02-04
					<!-- 示例：使用免费支持的图标 -->
					<!-- <i class="fas fa-music"></i> -->
					<!-- <i class="fas fa-apple-alt" /> -->
					<!-- <i class="fa fa-tree" /> -->
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	import {
		useRouter
	} from 'vue-router';
	import {
		getDate,
		getTips
	} from '../../assets/ts/Tools.ts';
	import {
		ref,
		onMounted
	} from 'vue'
	let date = ref("");
	let tips = ref("您好");
	const router = useRouter();
	const username = ref('管理员');
	//声明样式数组
	const lbs = ref([false, false, false, false, false]);
	const goProduct = () => { //商品管理，子路由
		lbs.value = [true, false, false, false, false]
		router.push("/home/product-list")
	}
	const goBill = () => { //订单管理，子路由跳转
		lbs.value = [false, true, false, false, false]
		router.push("/home/bill-list")
	}
	const goSupplier = () => { //供应商管理，子路由
		lbs.value = [false, false, true, false, false]
		router.push("/home/supplier-list")
	}
	const goUser = () => { //商品管理，子路由
		lbs.value = [false, false, false, true, false]
		router.push("/home/user-list")
	}
	const goPass = () => { //密码管理，子路由跳转
		lbs.value = [false, false, false, false, true]
		router.push("/home/edit-pass");
	}
	//组件创建时自动调用
	onMounted(() => {
		//从本地获取用户名
		username.value = localStorage.getItem('username')||'';
		//使用定时器
		setInterval(() => {
			date.value = getDate();
			tips.value = getTips();
		}, 1000)
	})
	//回主页
	const goHome = () => {
		//重置列表菜单样式
		lbs.value = [false, false, false, false, false]
		router.push("/home")
	}
	//系统退出，回到登页
	const logout = () => {
		let flag = confirm("真的退出吗!")
		if (flag) { //清空用户的登录信息
			localStorage.clear();
			sessionStorage.clear()
			router.push("/login")
		}
	}
</script>

<style scoped>
	.home {
		display: flex;
		width: 100vw;
		height: 100vh;
		flex-direction: column;
	}

	/********************顶部样式*******************/
	.home>.header {
		height: 10vh;
		width: 100vw;
	}

	.home>.header>.admin {
		display: flex;
		justify-content: space-between;
		height: 5.5vh;
		align-items: center;
		/* 渐变色 */
		background-image: linear-gradient(to right, #63A8D0, #63A1DE);
	}

	.home>.header>.admin>.left {
		height: 5.5vh;
		line-height: 5.5vh;
		cursor: pointer;
	}

	.home>.header>.admin>.left>img {
		position: relative;
		top: 4px;
	}

	.home>.header>.admin>.left>span {
		font-size: 1.2vw;
		color: white;
		font-weight: bold;
	}

	.home>.header>.admin>.right {
		padding-right: 4vw;
	}


	.home>.header>.admin>.right>span:nth-of-type(1) {
		color: white;
		font-size: 1vw;
	}

	.home>.header>.admin>.right>span:nth-of-type(2) {
		color: yellow;
		font-size: 1vw;
	}

	/*****右边的按钮*****/
	.home>.header>.admin>.right>button {
		width: 3vw;
		height: 1.6vw;
		background-color: yellowgreen;
		border: none;
		outline: medium;
		border-radius: 4px;
		color: white;
		font-weight: bold;
		margin-left: 10px;
	}

	/* 时间 */
	.home>.header>.time {
		display: flex;
		height: 4.5vh;
		justify-content: space-between;
		align-items: center;
		background-color: #E2ECF5;
		box-shadow: 1px 1px 2px 2px #ccc;
	}

	/******************主体内容******************/
	.home>.content {
		/* 下边的：分左右两部分 */
		width: 100vw;
		height: 90vh;
		display: flex;
		/* 一定要注意设置主轴方向 */
	}

	/* 左边导航 */
	.home>.content>.left-nav {
		width: 12vw;
		height: 100%;
		background-color: #eee;
		box-shadow: 1px 1px 2px 2px #ccc;
		padding: 0 0.8vw;
		padding-top: 0.4vw;
	}

	.home>.content>.left-nav>li:nth-of-type(1) {
		font-size: 1.4vw;
		text-align: center;
		background-image: linear-gradient(to bottom, #63C1DE, #63A1DE);
		border-radius: 4px;
		color: white;

	}

	/* 从第二个li开始之后所有 */
	.home>.content>.left-nav>li:nth-of-type(n+2) {
		height: 3vw;
		line-height: 3vw;
		border-bottom: 1px solid #ccc;
		cursor: pointer;
		padding-left: 10px;
	}

	/* 鼠标覆盖时样式 */
	.home>.content>.left-nav>li:nth-of-type(n+2):hover {
		background-color: lightblue;
	}

	/* 类选择器 */
	.lb {
		background-color: lightblue;
	}

	.home>.content>.left-nav>li:nth-of-type(n+2)>img {
		/* 行内块跟两边行内或文本上下对齐 */
		vertical-align: middle;
		margin-right: 5px;
	}

	/********右边******/
	.home>.content>.right {
		/* 剩余所有宽度 */
		width: 88vw;
		height: 100%;
	}

	.home>.content>.right>.main {
		height: 85vh;
		/* 左右添加间距 */
		padding: 0 0.5vw;
		/* 可以设置为弹性盒子,主轴设置为垂直方向  */
		/* background-color: pink; */
	}

	.home>.content>.right>.info {
		height: 5vh;
		text-align: center;
		line-height: 5vh;
		width: 88vw;
		background-color: #63A1DE;
		color: white;
	}
</style>