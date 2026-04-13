<template>
	<div class="bill-add">
		<div class="location">你现在所在的位置是: <span @click="goBillList()">订单管理页面</span>&gt;&gt;订单添加页面</div>
		<form class="bill-form">
			<div class="form-item">
				<label for="billCode">订单编码:</label>
				<input type="text" v-model="bill.billCode" id="billCode" placeholder="请输入订单编码" required />
				<span class="required">*</span>
			</div>
			<div class="form-item">
				<label for="pname">商品名称:</label>
				<input type="text" v-model="bill.pname" id="pname" placeholder="请输入商品名称" required />
				<span class="required">*</span>
			</div>
			<div class="form-item">
				<label for="pic">商品图片:</label>
				<input type="text" v-model="bill.pic" id="pic" placeholder="如: product.jpg" />
			</div>
			<div class="form-item">
				<label for="unit">商品单位:</label>
				<select v-model="bill.unit">
					<option value="部">部</option>
					<option value="台">台</option>
					<option value="个">个</option>
					<option value="件">件</option>
				</select>
			</div>
			<div class="form-item">
				<label for="num">商品数量:</label>
				<input type="number" v-model="bill.num" id="num" placeholder="请输入数量" required />
				<span class="required">*</span>
			</div>
			<div class="form-item">
				<label for="total">总金额:</label>
				<input type="number" v-model="bill.total" id="total" placeholder="请输入总金额" required />
				<span class="required">*</span>
			</div>
			<div class="form-item">
				<label for="supplier">供应商:</label>
				<input type="text" v-model="bill.supplier" id="supplier" placeholder="请输入供应商名称" required />
				<span class="required">*</span>
			</div>
			<div class="form-item">
				<label for="flag">订单状态:</label>
				<select v-model="bill.flag" required>
					<option value="待付款">待付款</option>
					<option value="待发货">待发货</option>
					<option value="待收货">待收货</option>
					<option value="已完成">已完成</option>
				</select>
				<span class="required">*</span>
			</div>
			<div class="form-item">
				<label for="date">下单日期:</label>
				<input type="date" v-model="bill.date" id="date" required />
				<span class="required">*</span>
			</div>
			<!-- 提交 -->
			<div class="form-buttons">
				<input type="button" class="save-button" value="提交" @click="addBillInfo()" />
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
	addBill
} from '../../api/bill.ts'
import {
	ElMessage
} from 'element-plus';

const router = useRouter();
const back = () => {
	router.go(-1);
}
const goBillList = () => {
	router.push({ path: '/home/bill-list' })
}

const bill = ref({
	billCode: "",
	pname: "",
	pic: "product.jpg",
	unit: "部",
	num: 1,
	total: 0,
	flag: "待付款",
	supplier: "",
	date: ""
})

const addBillInfo = async () => {
	let temp = bill.value;
	if (temp.billCode == "" || temp.pname == "") {
		ElMessage.warning('订单编码和商品名称不能为空');
		return;
	} else if (temp.num <= 0) {
		ElMessage.warning('数量必须大于0');
		return;
	} else if (temp.total <= 0) {
		ElMessage.warning('总金额必须大于0');
		return;
	} else if (temp.supplier == "") {
		ElMessage.warning('供应商不能为空');
		return;
	} else if (temp.date == "") {
		ElMessage.warning('请选择下单日期');
		return;
	} else {
		const res = await addBill(bill.value);
		if (res != null) {
			ElMessage.success('订单添加成功');
		} else {
			ElMessage.error('添加失败');
		}
	}
}
</script>

<style scoped>
.bill-add {
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
	padding: 20px;
}

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

.form-item input[type="text"],
.form-item input[type="number"],
.form-item input[type="date"],
.form-item select {
	width: 300px;
	padding: 5px;
}

.required {
	color: red;
}

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
