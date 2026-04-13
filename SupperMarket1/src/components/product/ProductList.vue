<template>
	<div class="product-list">
		<el-container>
			<!-- 顶部 -->
			<el-header>
				<img src="/pic/home.png" />
				<h4>你现在所在的位置是：</h4>
				<h4>商品管理页</h4>
			</el-header>
			<!-- 中间 -->
			<el-main>
				<!-- 搜索 -->
				<div class="search">
					<h4>商品名称：</h4>
					<el-input v-model="pname" size="small" placeholder="请输入商品名称" />
					<h4>商品状态：</h4>
					<el-select v-model="status" class="el-input" placeholder="请选择">
						<el-option v-for="item in statusList" :key="item" :label="item" :value="item" />
					</el-select>
					<!-- 查询 -->
					<el-button type="success" @click="queryProductList()">
						<img src="/pic/search.png" />查询
					</el-button>
					<el-button type="primary" @click="goAddProduct">
						<img src="/pic/tianjia.png" />
						添加商品
					</el-button>
				</div>
				<!-- element-plus表格中加载数组 -->
				<div class="table">
					<el-table :data="myarr" stripe style="width: 100%">
						<el-table-column prop="pcode" label="商品编码" />
						<el-table-column prop="pname" label="商品名称" />
						<el-table-column label="商品图片">
							<template v-slot="scope">
								<img :src="'http://localhost:3000/pic/' + scope.row.pic" class="product-img" />
							</template>
						</el-table-column>
						<el-table-column prop="price" label="价格(元)">
							<template v-slot="scope">
								<span style="color: #e6a23c; font-weight: bold;">¥{{ scope.row.price }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="stock" label="库存" />
						<el-table-column prop="status" label="状态">
							<template v-slot="scope">
								<el-tag :type="scope.row.status === '上架' ? 'success' : 'danger'">
									{{ scope.row.status }}
								</el-tag>
							</template>
						</el-table-column>
						<!-- 操作列 -->
						<el-table-column label="操作">
							<template v-slot="ps">
								<img src="/pic/read.png" @click="goDetail(ps.row)" />
								<img src="/pic/xiugai.png" @click="goUpdate(ps.row)" />
								<img src="/pic/schu.png" @click="deleteProduct(ps.row)" />
							</template>
						</el-table-column>
					</el-table>
				</div>
			</el-main>
			<!-- 底部分页 -->
			<el-footer>
				<div class="demo-pagination-block">
					<el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize"
						:page-sizes="[3, 4, 5]" :small="small" :disabled="disabled" :background="background"
						layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
						@current-change="handleCurrentChange" />
				</div>
			</el-footer>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import {
	ref,
	onMounted
} from 'vue'
import router from '../../router';
import qs from 'qs';
import {
	getProducts, queryProducts,
	delProduct
} from '../../api/product.ts'
// 声明响应式搜索变量
const pname = ref(''); //商品名称
const status = ref(''); //商品状态
//商品状态下拉菜单
const statusList = ref(['', '上架', '下架']);
///////////////分页效果/////////////////
const currentPage = ref(1)
const pageSize = ref(3)
const small = ref(false)
const background = ref(true)
const disabled = ref(false)
//加载到页面中的数组数据,分页加载数组
let myarr = ref(Array());
//临时存储的表格数据
let tableData = Array();
//存商品总数
let total = ref(0);
let start = 0;
let end = 0;

//// 1.初始化数据,商品列表
onMounted(async () => {
	try {
		let temp = await getProducts();
		if (temp instanceof Array) {
			tableData = temp;
			myarr.value = tableData.slice(0, 3);
			total.value = tableData.length;
		}
	} catch (error) {
		console.error('获取数据失败', error);
	}
})

////2.通过商品名称或商品状态查询
const queryProductList = async () => {
	try {
		let temp1 = await queryProducts(pname.value, status.value);
		if (temp1 instanceof Array) {
			tableData = temp1;
			myarr.value = tableData.slice(0, 3);
			total.value = tableData.length;
		}
	} catch (error) {
		console.error('获取数据失败', error);
	}
}

////3.去添加商品页面
const goAddProduct = () => {
	router.push('/home/product-add');
}
////4.去详情页
const goDetail = (obj: any) => {
	router.push({
		path: '/home/product-detail',
		query: {
			product: qs.stringify(obj)
		}
	})
}
////5.去更新页
const goUpdate = (obj: any) => {
	sessionStorage.setItem("product", JSON.stringify(obj));
	router.push("/home/product-update")
}
////6.删除商品
const deleteProduct = async (obj: any) => {
	let flag = confirm("确认删除该商品吗？");
	if (flag) {
		try {
			await delProduct(obj.id);
			let temp2 = await getProducts();
			if (temp2 instanceof Array) {
				tableData = temp2;
			}
			////重置分页
			currentPage.value = 1;
			pageSize.value = 3
			myarr.value = tableData.slice(0, 3);
			total.value = tableData.length;
		} catch (error) {
			console.error('数据删除失败', error);
		}
	}
}

//// 7.改变每一页显示的大小
const handleSizeChange = (val: any) => {
	pageSize.value = val;
	start = (currentPage.value - 1) * pageSize.value;
	end = currentPage.value * pageSize.value;
	myarr.value = tableData.slice(start, end);
	console.log(`每一页大小为：${val}`)
}
//// 8.改变当前页后，重新获取数据
const handleCurrentChange = (val: any) => {
	currentPage.value = val;
	start = (currentPage.value - 1) * pageSize.value;
	end = currentPage.value * pageSize.value;
	myarr.value = tableData.slice(start, end);
	console.log(`当前页数是: ${val} 页`)
}
</script>

<style scoped>
.product-list {
	/*设置为弹性盒子 */
	display: flex;
	/* 一定要设置好方向 */
	flex-direction: column;
}

/*************顶部提示样式******************/
.product-list .el-header {
	display: flex;
	height: 2vw;
	align-items: center;
	background-image: linear-gradient(to bottom, #eee, #fff);
	outline: 1px solid #ccc;
	border-radius: 8px;
}

.product-list .el-header>img {
	width: 1vw;
	height: 1vw;
	vertical-align: middle;
	margin-right: 0.5vw;
}

.product-list .el-header>h4:nth-of-type(2) {
	color: #4287C2;
}

/*************中间搜索与表格样式******************/
.product-list .el-main {
	display: flex;
	padding: 0;
	flex-direction: column;
}

/* 中间搜索部分 */
.product-list .el-main .search {
	display: flex;
	height: 3vw;
	align-items: center;
	background-color: #eee;
	text-align: center;
}

/* 弹性盒子中的子元素必须显式地设置宽度，高度 */
.product-list .el-main .search>.el-input:nth-of-type(1) {
	flex-basis: 12vw;
	height: 1.8vw;
}

.product-list .el-main .search>.el-input:nth-of-type(n+2) {
	flex-basis: 6vw;
	height: 1.8vw;
}

.product-list .el-main .search>h4 {
	width: 160px;
	text-align: right;
}

.product-list .el-main .search>.el-button {
	width: 5vw;
	margin-left: 1.5vw;
	margin-right: 4vw;
}

/**************表格样式************/
.product-list .el-table img {
	width: 26px;
	height: 26px;
	cursor: pointer;
}

.product-list .el-table img:nth-of-type(2) {
	margin: 0 12px;
}

/* 商品图片样式 */
.product-img {
	width: 40px !important;
	height: 40px !important;
	object-fit: cover;
	border-radius: 4px;
	cursor: default !important;
}

/**************分页样式************/
.product-list .demo-pagination-block {
	height: 3vw;
	line-height: 3vw;
}
</style>