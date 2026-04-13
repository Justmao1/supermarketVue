<template>
	<div class="product-update">
		<div class="location">你现在所在的位置是: <span @click="goProductList">商品管理页面</span>&gt;&gt;商品修改页面</div>
		<form class="product-form">
			<div class="form-item">
				<label for="pcode">商品编码:</label>
				<input type="text" v-model="product.pcode" id="pcode" required />
			</div>
			<div class="form-item">
				<label for="pname">商品名称:</label>
				<input type="text" v-model="product.pname" id="pname" required />
				<span class="required">*</span>
			</div>
			<div class="form-item">
				<label for="pic">商品图片:</label>
				<input type="text" v-model="product.pic" id="pic" />
			</div>
			<div class="form-item">
				<label for="price">商品价格:</label>
				<input type="number" v-model="product.price" id="price" required />
				<span class="required">*</span>
			</div>
			<div class="form-item">
				<label for="stock">商品库存:</label>
				<input type="number" v-model="product.stock" id="stock" required />
				<span class="required">*</span>
			</div>
			<div class="form-item">
				<label for="categoryId">商品分类:</label>
				<select v-model="product.categoryId" required>
					<option value="">请选择</option>
					<option v-for="item in categories" :key="item.id" :value="item.id">{{ item.cname }}</option>
				</select>
				<span class="required">*</span>
			</div>
			<div class="form-item">
				<label for="supplierId">供应商:</label>
				<select v-model="product.supplierId" required>
					<option value="">请选择</option>
					<option v-for="item in suppliers" :key="item.id" :value="item.id">{{ item.sname }}</option>
				</select>
				<span class="required">*</span>
			</div>
			<div class="form-item">
				<label for="status">商品状态:</label>
				<select id="status" v-model="product.status">
					<option value="上架">上架</option>
					<option value="下架">下架</option>
				</select>
			</div>
			<!-- 提交 -->
			<div class="form-buttons">
				<input type="button" class="update-button" value="更新" @click="editProduct()" />
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
	updateProduct
} from '../../api/product.ts'
import {
	ElMessage
} from 'element-plus';
import http from '../../utils/request.ts'

const router = useRouter();
//分类和供应商列表
const categories = ref([]);
const suppliers = ref([]);
//返回上一页
const back = () => {
	router.back();
}
//返回列表
const goProductList = () => {
	router.push({
		path: '/home/product-list'
	})
}
//声明响应式对象
const product = ref({
	id: 0,
	pcode: '',
	pname: '',
	pic: '',
	categoryId: '',
	supplierId: '',
	price: 0,
	stock: 0,
	status: ''
})
//初始化
onMounted(async () => {
	//拿到需更新的数据
	product.value = JSON.parse(sessionStorage.getItem("product"))
	//加载分类和供应商
	try {
		let catData = await http.get('category');
		if (catData instanceof Array) {
			categories.value = catData;
		}
		let supData = await http.get('supplier');
		if (supData instanceof Array) {
			suppliers.value = supData;
		}
	} catch (error) {
		console.error('获取分类/供应商数据失败', error);
	}
})
//修改商品
const editProduct = async () => {
	let temp = product.value;
	if (temp.pname == "" || temp.pcode == "") {
		ElMessage.warning('商品名称与编码不能为空');
		return;
	} else if (temp.price <= 0) {
		ElMessage.warning('价格必须大于0');
		return;
	} else if (temp.stock < 0) {
		ElMessage.warning('库存不能为负数');
		return;
	} else {
		const res = await updateProduct(product.value);
		if (res != null) {
			ElMessage.success('商品更新成功');
		} else {
			ElMessage.error('更新失败');
		}
	}
}
</script>

<style scoped>
.product-update {
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

.product-form {
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
.form-item input[type="number"],
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
