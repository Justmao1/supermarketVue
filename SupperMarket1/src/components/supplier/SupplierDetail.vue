<template>
	<div class="supplier-detail">
		<div class="location">你现在所在的位置是: <span @click="goSupplierList()">供应商管理页面</span>&gt;&gt;供应商详情页面</div>
		<form class="supplier-form">
			<div class="form-item">
				<label>供应商编码:</label>
				<span>{{ supplier.sCode }}</span>
			</div>
			<div class="form-item">
				<label>供应商名称:</label>
				<span>{{ supplier.sname }}</span>
			</div>
			<div class="form-item">
				<label>联系人:</label>
				<span>{{ supplier.concat }}</span>
			</div>
			<div class="form-item">
				<label>联系电话:</label>
				<span>{{ supplier.mobile }}</span>
			</div>
			<div class="form-item">
				<label>邮箱:</label>
				<span>{{ supplier.email }}</span>
			</div>
			<div class="form-item">
				<label>创建日期:</label>
				<span>{{ supplier.date }}</span>
			</div>
			<div class="form-buttons">
				<input type="button" class="return-button" value="返回" @click="back()" />
			</div>
		</form>
	</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import qs from 'qs'

const router = useRouter();
const route = useRoute();
let temp = route.query.supplier as string;

const supplier = ref({
	sCode: '',
	sname: '',
	concat: '',
	mobile: '',
	email: '',
	date: ''
})

const goSupplierList = () => { router.push({ path: '/home/supplier-list' }) }
const back = () => { router.go(-1); }

onMounted(() => {
	supplier.value = qs.parse(temp)
})
</script>

<style scoped>
.supplier-detail {
	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.location { margin-bottom: 10px; width: 100%; }
.location>span { font-weight: bold; cursor: pointer; }
.supplier-form {
	border: 1px solid #ccc;
	padding: 20px 10px;
	width: 400px;
	box-shadow: 1px 1px 2px 1px #eee;
}
.form-item { margin-bottom: 15px; }
.form-item label {
	display: inline-block;
	width: 110px;
	text-align: right;
	font-size: 20px;
	font-weight: bold;
	margin-right: 10px;
}
.form-item span { font-size: 20px; }
.form-buttons { text-align: center; margin-top: 20px; }
.return-button {
	background-color: #007bff; color: white;
	padding: 8px 20px; border: none; border-radius: 5px;
	cursor: pointer;
}
.return-button:hover { opacity: 0.8; }
</style>
