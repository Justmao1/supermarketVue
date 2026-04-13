<template>
	<div class="bill-detail">
		<div class="location">你现在所在的位置是: <span @click="goBillList()">订单管理页面</span>&gt;&gt;订单详情页面</div>
		<form class="bill-form">
			<div class="form-item">
				<label>订单编码:</label>
				<span>{{ bill.billCode }}</span>
			</div>
			<div class="form-item">
				<label>商品名称:</label>
				<span>{{ bill.pname }}</span>
			</div>
			<div class="form-item">
				<label>商品单位:</label>
				<span>{{ bill.unit }}</span>
			</div>
			<div class="form-item">
				<label>商品数量:</label>
				<span>{{ bill.num }}</span>
			</div>
			<div class="form-item">
				<label>总金额:</label>
				<span style="color: #e6a23c; font-weight: bold;">¥{{ bill.total }}</span>
			</div>
			<div class="form-item">
				<label>供应商:</label>
				<span>{{ bill.supplier }}</span>
			</div>
			<div class="form-item">
				<label>订单状态:</label>
				<span>{{ bill.flag }}</span>
			</div>
			<div class="form-item">
				<label>下单日期:</label>
				<span>{{ bill.date }}</span>
			</div>
			<!-- 返回按钮 -->
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

const router = useRouter();
const route = useRoute();
let temp = route.query.bill as string;

const bill = ref({
	billCode: '',
	pname: '',
	unit: '',
	num: 0,
	total: 0,
	supplier: '',
	flag: '',
	date: ''
})

const goBillList = () => {
	router.push({ path: '/home/bill-list' })
}
const back = () => {
	router.go(-1);
}

onMounted(() => {
	bill.value = qs.parse(temp)
})
</script>

<style scoped>
.bill-detail {
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

.bill-form {
	border: 1px solid #ccc;
	padding: 20px 10px;
	width: 400px;
	box-shadow: 1px 1px 2px 1px #eee;
}

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
	opacity: 0.8;
}
</style>
