<template>
	<div class="supplier-update">
		<div class="location">你现在所在的位置是: <span @click="goSupplierList">供应商管理页面</span>&gt;&gt;供应商修改页面</div>
		<form class="supplier-form">
			<div class="form-item">
				<label for="sCode">供应商编码:</label>
				<input type="text" v-model="supplier.sCode" id="sCode" required />
			</div>
			<div class="form-item">
				<label for="sname">供应商名称:</label>
				<input type="text" v-model="supplier.sname" id="sname" required />
				<span class="required">*</span>
			</div>
			<div class="form-item">
				<label for="concat">联系人:</label>
				<input type="text" v-model="supplier.concat" id="concat" required />
				<span class="required">*</span>
			</div>
			<div class="form-item">
				<label for="mobile">联系电话:</label>
				<input type="text" v-model="supplier.mobile" id="mobile" required />
				<span class="required">*</span>
			</div>
			<div class="form-item">
				<label for="email">邮箱:</label>
				<input type="text" v-model="supplier.email" id="email" />
			</div>
			<div class="form-item">
				<label for="date">创建日期:</label>
				<input type="date" v-model="supplier.date" id="date" required />
				<span class="required">*</span>
			</div>
			<div class="form-buttons">
				<input type="button" class="update-button" value="更新" @click="editSupplier()" />
				<input type="button" class="return-button" value="返回" @click="back" />
			</div>
		</form>
	</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { updateSupplier } from '../../api/supplier.ts'
import { ElMessage } from 'element-plus';

const router = useRouter();
const back = () => { router.back(); }
const goSupplierList = () => { router.push({ path: '/home/supplier-list' }) }

const supplier = ref({
	id: 0,
	sCode: '',
	sname: '',
	concat: '',
	mobile: '',
	email: '',
	date: ''
})

onMounted(() => {
	supplier.value = JSON.parse(sessionStorage.getItem("supplier"))
})

const editSupplier = async () => {
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
	} else {
		const res = await updateSupplier(supplier.value);
		if (res != null) {
			ElMessage.success('供应商更新成功');
		} else {
			ElMessage.error('更新失败');
		}
	}
}
</script>

<style scoped>
.supplier-update {
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
.update-button {
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
