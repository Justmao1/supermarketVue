<template>
	<div class="user-update">
		<div class="location">你现在所在的位置是: <span @click="goUserList">用户管理页面</span>&gt;&gt;用户修改页面</div>
		<form class="user-form">
			<div class="form-item">
				<label for="user-code">用户编码:</label>
				<input type="text" v-model="user.userCode" id="user-code" required/>
			</div>
			<div class="form-item">
				<label for="username">用户名称:</label>
				<input type="text" v-model="user.username" id="username" required />
				<span class="required">*</span>
			</div>
			<div class="form-item">
				<label for="gender">用户性别:</label>
				<select id="gender" v-model="user.gender">
					<option value="">请选择</option>
					<option value="男">男</option>
					<option value="女">女</option>
				</select>
			</div>
			<div class="form-item">
				<label for="birth">出生日期:</label>
				<input type="date" v-model="user.birth" value="2002-11-12" id="birth" required />
				<span class="required">*</span>
			</div>
			<div class="form-item">
				<label for="mobile">用户电话:</label>
				<input type="text" v-model="user.mobile" id="mobile" required />
				<span class="required">*</span>
			</div>
			<div class="form-item">
				<label for="address">用户地址:</label>
				<input type="text" v-model="user.address" id="address" />
			</div>
			<div class="form-item">
				<label for="role">用户角色:</label>
				<!-- 通过改变获取值@change="go" -->
				<select v-model="user.role" placeholder="请选择" required>
					<option v-for="item in roles" :key="item" :label="item" :value="item" />
				</select>
				<span class="required">*</span>
			</div>
			<!-- 用户提交 -->
			<div class="form-buttons">
				<!-- 注意这里的按钮事件 -->
				<input type="button" class="update-button" value="更新" @click="editUser()" />
				<input type="button" class="return-button" value="返回" @click="back" />
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
		useRouter
	} from 'vue-router'
	import {
		updateUser
	} from '../../api/user.ts'
	// 引入UI框架的消息提示
	import {
		ElMessage
	} from 'element-plus';
	const router = useRouter();
	//用户角色下拉菜单中的数据
	const roles = ref(['普通员工', '财务会计', '财务总监', '经理助理', '总经理', '技术总监', '行政主管', '销售经理', '产品经理']);
	//返回上一页
	const back = () => {
		//或router.go(-1);
		router.back();
	}
	//返回列表
	const goUserList = () => {
		router.push({
			path: '/home/user-list'
		})
	}
	//声明响应式对象
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
	//初始化
	onMounted(() => {
		//拿到需更新的数据
		user.value = JSON.parse(sessionStorage.getItem("user"))
		//console.log("------user:"+user.value.username);
	})
	//修改用户,均返回用户对象
	const editUser = async () => {
		////判断是否为空
		let temp = user.value;
		if (temp.username == ""||temp.userCode=="") {
			ElMessage.warning('用户名与用户编码不能为空');
			return;
		} else if (temp.gender == "" || temp.birth == "") {
			ElMessage.warning('性别与出生日期不能为空');
			return;
		} else if (temp.address == "" || temp.mobile == "") {
			ElMessage.warning('地址与电话不能为空');
			return;
		} else if (temp.role == "") {
			ElMessage.warning('用户角色不能为空');
			return;
		} else {
			//增删改均返回一个对象
			const us = await updateUser(user.value);
			if (us != null) {
				ElMessage.success('用户更新成功');
			} else {
				ElMessage.success('更新失败');
			}

		}
	}
</script>

<style scoped>
	.user-update {
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
		padding: 20px;
	}

	/********表单样式*********/
	.form-item {
		margin-bottom: 15px;
	}

	.form-item label {
		display: inline-block;
		width: 100px;
		text-align: right;
		font-weight: bold;
		margin-right: 10px;
	}

	/*********各种输入框*********/
	.form-item input[type="text"],
	.form-item input[type="password"],
	.form-item input[type="date"],
	.form-item select {
		width: 300px;
		padding: 5px;
	}

	.required {
		color: red;
	}

	/********表单中的按钮*********/
	.form-buttons {
		text-align: center;
		margin-top: 20px;
	}

	.update-button {
		background-color: #007bff;
		color: white;
		padding: 8px 20px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		margin-right: 10px;
	}

	.return-button {
		background-color: #999;
		color: white;
		padding: 8px 20px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}
</style>