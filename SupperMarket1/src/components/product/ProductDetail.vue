<template>
	<div class="product-detail">
		<div class="location">你现在所在的位置是: <span @click="goProductList()">商品管理页面</span>&gt;&gt;商品详情页面</div>
		<form class="product-form">
			<div class="form-item">
				<label>商品编码:</label>
				<span>{{ product.pcode }}</span>
			</div>
			<div class="form-item">
				<label>商品名称:</label>
				<span>{{ product.pname }}</span>
			</div>
			<div class="form-item">
				<label>商品图片:</label>
				<img :src="'http://localhost:3000/pic/' + product.pic" class="detail-img" />
			</div>
			<div class="form-item">
				<label>商品价格:</label>
				<span style="color: #e6a23c; font-weight: bold;">¥{{ product.price }}</span>
			</div>
			<div class="form-item">
				<label>商品库存:</label>
				<span>{{ product.stock }}</span>
			</div>
			<div class="form-item">
				<label>商品状态:</label>
				<span>{{ product.status }}</span>
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
//创建路由对象,用于页面切换
const router = useRouter();
//创建路由操作对象，用于接收数据
const route = useRoute();
//获取路由传递数据
let temp = route.query.product as string;
//声明响应式对象
const product = ref({
	pcode: '',
	pname: '',
	pic: '',
	price: 0,
	stock: 0,
	status: ''
})
//返回商品列表
const goProductList = () => {
	router.push({
		path: '/home/product-list'
	})
}
//返回上一页
const back = () => {
	router.go(-1);
}
//直接渲染数据
onMounted(() => {
	product.value = qs.parse(temp)
})
</script>

<style scoped>
.product-detail {
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

/* 详情页商品图片 */
.detail-img {
	width: 120px;
	height: 120px;
	object-fit: cover;
	border-radius: 8px;
	border: 1px solid #eee;
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
	opacity: 0.8;
}
</style>
