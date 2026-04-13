<template>
	<div class="user-add">
		<div class="location">你现在所在的位置是: <span @click="goUserList()">用户管理页面</span>&gt;&gt;用户添加页面</div>
		<form class="user-form">
			<div class="form-item">
				<label for="user-code">用户编码:</label>
				<input type="text" v-model="user.userCode" id="user-code" placeholder="请输入用户编码" required />
				<span class="required">*</span>
			</div>
			<div class="form-item">
				<label for="username">用户名称:</label>
				<input type="text" v-model="user.username" id="username" required />
				<span class="required">*</span>
			</div>
			<div class="form-item">
				<label for="password">用户密码:</label>
				<input type="password" v-model="user.password" id="password" required />
				<span class="required">*</span>
			</div>
			<div class="form-item">
				<label for="repassword">确认密码:</label>
				<input type="password" v-model="repass" id="repassword" required />
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
				<input type="date" v-model="user.birth" id="birth" required />
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
				<label for="email">用户邮箱:</label>
				<input type="text" v-model="user.email" id="email" />
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
				<input type="button" class="save-button" value="提交" @click="addUserInfo()" />
				<input type="button" class="return-button" value="返回" @click="back" />
			</div>
		</form>
	</div>
</template>
<script setup lang="ts">
	import {
		ref
	} from 'vue'
	import {
		useRouter
	} from 'vue-router'
	import {
		addUser
	} from '../../api/user.ts'
	// 引入UI框架的消息提示
	import {
		ElMessage
	} from 'element-plus';
	const router = useRouter();
	// 用户角色下拉获取值
	const repass = ref('');
	//用户角色下拉菜单中的数据
	const roles = ref(['普通员工', '财务会计', '财务总监', '经理助理', '总经理', '技术总监', '行政主管', '销售经理', '产品经理']);
	//返回上一页
	const back = () => {
		router.go(-1);
	}
	const goUserList = () => {
		router.push({
			path: '/home/user-list'
		})
	}
	//声明响应式对象
	const user = ref({
		userCode: "ck1090",
		username: "test",
		password: "1234",
		gender: "男",
		birth: "2005-11-16",
		address: "苏州市园林区",
		mobile: "13121234567",
		email: "test@sina.com",
		role: "普通员工"
	})
	//添加用户,返回用户对象
	const addUserInfo = async () => {
		////判断是否为空
		let temp = user.value;
		if (temp.userCode == "" || temp.username == "") {
			ElMessage.warning('用户编码或用户名不能为空');
			return;
		} else if (temp.password == "" || repass.value == "") {
			ElMessage.warning('密码不能为空');
			return;
		} else if (temp.birth == "" || temp.mobile == "") {
			ElMessage.warning('出生日期或电话不能为空');
			return;
		} else if (repass.value != user.value.password) {
			ElMessage.warning('两次密码不一致')
			return;
		} else {
			//增删改均返回一个对象
			const us = await addUser(user.value);
			if (us != null) {
				ElMessage.success('用户注册成功');
			} else {
				ElMessage.success('注册失败');
			}

		}
	}
</script>

<style scoped>
	.user-add {
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

	.save-button {
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