<template>
	<div class="user-detail">
		<div class="location">你现在所在的位置是: <span @click="goUserList()">用户管理页面</span>&gt;&gt;用户详情页面</div>
		<form class="user-form">
			<div class="form-item">
				<label for="user-code">用户编码:</label>
				<span>{{user.userCode}}</span>
			</div>
			<div class="form-item">
				<label for="username">用户名称:</label>
				<span>{{user.username}}</span>
			</div>
			<div class="form-item">
				<label for="gender">用户性别:</label>
				<span>{{user.gender}}</span>
			</div>
			<div class="form-item">
				<label for="birth">出生日期:</label>
				<span>{{user.birth}}</span>
			</div>
			<div class="form-item">
				<label for="mobile">用户电话:</label>
				<span>{{user.mobile}}</span>
			</div>
			<div class="form-item">
				<label for="address">用户地址:</label>
				<span>{{user.address}}</span>
			</div>
			<div class="form-item">
				<label for="email">用户邮箱:</label>
				<span>{{user.email}}</span>
			</div>
			<div class="form-item">
				<label for="role">用户角色:</label>
				<span>{{user.role}}</span>
			</div>
			<!-- 用户提交 -->
			<div class="form-buttons">
				<input type="button" class="return-button" value="返回" @click="back()" />
			</div>
		</form>
	</div>
</template>
<script setup lang="ts">
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		useRouter,
		useRoute
	} from 'vue-router'
	import qs from 'qs'
	//创建路由对象,用于页面切换
	const router = useRouter();
	//创建路由操作对象，用于接收数据
	const route = useRoute();
	//获取路由传递数据，类型都是string
	let temp = route.query.user as string;
	//声明响应式对象,并赋值给user
	const user = ref({
		userCode: '',
		username: '',
		gender: '',
		birth: '',
		mobile: '',
		address: '',
		email: '',
		role: ''
	})
	//返回用户列表
	const goUserList = () => {
		router.push({
			path: '/home/user-list'
		})
	}
	//返回上一页
	const back = () => {
		router.go(-1);
	}
	//直接渲染数据
	onMounted(() => {
		user.value = qs.parse(temp)
	})
</script>

<style scoped>
	.user-detail {
		padding: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.location {
		margin-bottom: 10px;
		width: 100%;
	}

	.location>span {
		font-weight: bold;
		cursor: pointer;
	}

	.user-form {
		border: 1px solid #ccc;
		padding: 20px 10px;
		width: 400px;
		box-shadow: 1px 1px 2px 1px #eee;
	}

	/********表单样式*********/
	.form-item {
		margin-bottom: 15px;
	}

	.form-item label {
		display: inline-block;
		width: 100px;
		text-align: right;
		font-size: 20px;
		font-weight: bold;
		margin-right: 10px;
	}

	.form-item span {
		font-size: 20px;
	}

	/********表单中的按钮*********/
	.form-buttons {
		text-align: center;
		margin-top: 20px;
	}

	.return-button {
		background-color: #007bff;
		color: white;
		padding: 8px 20px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}

	.return-button:hover {
		/* 背景透明度 */
		opacity: 0.8;
	}
</style>