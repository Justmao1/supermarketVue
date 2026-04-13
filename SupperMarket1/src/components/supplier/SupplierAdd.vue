<template>
	<div class="supplier-add">
		<div class="location">你现在所在的位置是: <span @click="goSupplierList()">供应商管理页面</span>&gt;&gt;供应商添加页面</div>
		<form class="supplier-form">
			<div class="form-item">
				<label for="sCode">供应商编码:</label>
				<input type="text" v-model="supplier.sCode" id="sCode" placeholder="请输入供应商编码" required />
				<span class="required">*</span>
			</div>
			<div class="form-item">
				<label for="sname">供应商名称:</label>
				<input type="text" v-model="supplier.sname" id="sname" placeholder="请输入供应商名称" required />
				<span class="required">*</span>
			</div>
			<div class="form-item">
				<label for="concat">联系人:</label>
				<input type="text" v-model="supplier.concat" id="concat" placeholder="请输入联系人" required />
				<span class="required">*</span>
			</div>
			<div class="form-item">
				<label for="mobile">联系电话:</label>
				<input type="text" v-model="supplier.mobile" id="mobile" placeholder="请输入联系电话" required />
				<span class="required">*</span>
			</div>
			<div class="form-item">
				<label for="email">邮箱:</label>
				<input type="text" v-model="supplier.email" id="email" placeholder="请输入邮箱" />
			</div>
			<div class="form-item">
				<label for="date">创建日期:</label>
				<input type="date" v-model="supplier.date" id="date" required />
				<span class="required">*</span>
			</div>
			<div class="form-buttons">
				<input type="button" class="save-button" value="提交" @click="addSupplierInfo()" />
				<input type="button" class="return-button" value="返回" @click="back" />
			</div>
		</form>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { addSupplier } from '../../api/supplier.ts'
import { ElMessage } from 'element-plus';

const router = useRouter();
const back = () => { router.go(-1); }
const goSupplierList = () => { router.push({ path: '/home/supplier-list' }) }

const supplier = ref({
	sCode: "",
	sname: "",
	concat: "",
	mobile: "",
	email: "",
	date: ""
})

const addSupplierInfo = async () => {
	let temp = supplier.value;
	if (temp.sCode == "" || temp.sname == "") {
		ElMessage.warning('供应商编码和名称不能为空');
		return;
	} else if (temp.concat == "") {
		ElMessage.warning('联系人不能为空');
		return;
	} else if (temp.mobile == "") {
		ElMessage.warning('联系电话不能为空');
		return;
	} else if (temp.date == "") {
		ElMessage.warning('请选择创建日期');
		return;
	} else {
		const res = await addSupplier(supplier.value);
		if (res != null) {
			ElMessage.success('供应商添加成功');
		} else {
			ElMessage.error('添加失败');
		}
	}
}
</script>

<style scoped>
.supplier-add {
	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.location { margin-bottom: 10px; width: 100%; }
.location>span { font-weight: bold; cursor: pointer; }
.supplier-form { border: 1px solid #ccc; padding: 20px; }
.form-item { margin-bottom: 15px; }
.form-item label {
	display: inline-block;
	width: 110px;
	text-align: right;
	font-weight: bold;
	margin-right: 10px;
}
.form-item input[type="text"],
.form-item input[type="date"],
.form-item select { width: 300px; padding: 5px; }
.required { color: red; }
.form-buttons { text-align: center; margin-top: 20px; }
.save-button {
	background-color: #007bff; color: white;
	padding: 8px 20px; border: none; border-radius: 5px;
	cursor: pointer; margin-right: 10px;
}
.return-button {
	background-color: #999; color: white;
	padding: 8px 20px; border: none; border-radius: 5px;
	cursor: pointer;
}
</style>
