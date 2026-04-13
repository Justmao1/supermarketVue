<template>
	<div class="edit-pass">
		<div class="location">你现在所在的位置是: <span>用户密码管理页面</span></div>
		<!-- 阻止默认提交，使用自定义提交 -->
		<form class="pass-form" @submit.prevent="handleSubmit">
			<div class="form-item">
				<label for="user-code">用户编码:</label>
				<span>{{userCode}}</span>
			</div>
			<div class="form-item">
				<label for="old-pass">原始密码:</label>
				<input type="password" v-model="oldPass" id="old-pass" placeholder="请输入原密码" required />
				<span class="required">*</span>
			</div>
			<div class="form-item">
				<label for="new-pass">输入新密码:</label>
				<input type="password" v-model="newPass" id="new-pass" required />
				<span class="required">*</span>
			</div>
			<div class="form-item">
				<label for="repass">确认新密码:</label>
				<input type="password" v-model="repass" id="repass" required />
				<span class="required">*</span>
			</div>
			<!-- 用户提交 -->
			<div class="form-buttons">
				<!-- 注意这里的按钮事件 -->
				<input type="submit" class="save-button" value="提交" />
				<input type="reset" class="reset-button" value="重置" />
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
		updatePass
	} from '../../api/user.ts'
	// 引入UI框架的消息提示
	import {
		ElMessage
	} from 'element-plus';
	//// 声明变量
	//必须通过id号来更新
	const id = ref('')
	const userCode = ref('')
	//声明密码变量
	const password = ref('')
	const oldPass = ref('')
	const newPass = ref('')
	const repass = ref('')
	// 声明用户对象
	const user = ref({
        id:0,
        password:''
    });
	//初始化
	onMounted(() => {
		id.value = localStorage.getItem('id') as string;
		userCode.value = localStorage.getItem('userCode');
		password.value = localStorage.getItem('password');
		//用户对象
		user.value = JSON.parse(localStorage.getItem('user'));
		console.log('====user:'+user.value)
	})
	//执行修改,添加异步
	const handleSubmit = async () => {
		if (oldPass.value != password.value) {
			ElMessage.warning("原始密码不正确")
			return;
		} else if (newPass.value != repass.value) {
			ElMessage.warning("两次密码不正确")
			return;
		} else { //注意修改的数据，要传入一个对象
			try {
				//更新用户密码后传参
				user.value.password = newPass.value;
				//别传错了,后边要为user.value,将id.value字符串转为数字
				await updatePass(Number.parseInt(id.value), user.value);
				ElMessage.info("密码更新成功")
			} catch (error) {
				console.log('更新失败', error);
			}
		}
	}
</script>

<style scoped>
	.edit-pass {
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

	.pass-form {
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
	.form-item span {
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

	.reset-button {
		background-color: #999;
		color: white;
		padding: 8px 20px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}
</style>