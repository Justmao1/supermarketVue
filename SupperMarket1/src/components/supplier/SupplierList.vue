<template>
	<div class="supplier-list">
		<el-container>
			<el-header>
				<img src="/pic/home.png" />
				<h4>你现在所在的位置是：</h4>
				<h4>供应商管理页</h4>
			</el-header>
			<el-main>
				<div class="search">
					<h4>供应商名称：</h4>
					<el-input v-model="sname" size="small" placeholder="请输入供应商名称" />
					<h4>联系人：</h4>
					<el-input v-model="concat" size="small" placeholder="请输入联系人" />
					<el-button type="success" @click="querySupplierList()">
						<img src="/pic/search.png" />查询
					</el-button>
					<el-button type="primary" @click="goAddSupplier">
						<img src="/pic/tianjia.png" />
						添加供应商
					</el-button>
				</div>
				<div class="table">
					<el-table :data="myarr" stripe style="width: 100%">
						<el-table-column prop="sCode" label="供应商编码" />
						<el-table-column prop="sname" label="供应商名称" />
						<el-table-column prop="concat" label="联系人" />
						<el-table-column prop="mobile" label="联系电话" />
						<el-table-column prop="email" label="邮箱" />
						<el-table-column prop="date" label="创建日期" />
						<el-table-column label="操作">
							<template v-slot="ss">
								<img src="/pic/read.png" @click="goDetail(ss.row)" />
								<img src="/pic/xiugai.png" @click="goUpdate(ss.row)" />
								<img src="/pic/schu.png" @click="deleteSupplier(ss.row)" />
							</template>
						</el-table-column>
					</el-table>
				</div>
			</el-main>
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
	getSuppliers, querySuppliers,
	delSupplier
} from '../../api/supplier.ts'

const sname = ref('');
const concat = ref('');

const currentPage = ref(1)
const pageSize = ref(3)
const small = ref(false)
const background = ref(true)
const disabled = ref(false)
let myarr = ref(Array());
let tableData = Array();
let total = ref(0);
let start = 0;
let end = 0;

onMounted(async () => {
	try {
		let temp = await getSuppliers();
		if (temp instanceof Array) {
			tableData = temp;
			myarr.value = tableData.slice(0, 3);
			total.value = tableData.length;
		}
	} catch (error) {
		console.error('获取数据失败', error);
	}
})

const querySupplierList = async () => {
	try {
		let temp1 = await querySuppliers(sname.value, concat.value);
		if (temp1 instanceof Array) {
			tableData = temp1;
			myarr.value = tableData.slice(0, 3);
			total.value = tableData.length;
		}
	} catch (error) {
		console.error('获取数据失败', error);
	}
}

const goAddSupplier = () => {
	router.push('/home/supplier-add');
}
const goDetail = (obj: any) => {
	router.push({
		path: '/home/supplier-detail',
		query: {
			supplier: qs.stringify(obj)
		}
	})
}
const goUpdate = (obj: any) => {
	sessionStorage.setItem("supplier", JSON.stringify(obj));
	router.push("/home/supplier-update")
}
const deleteSupplier = async (obj: any) => {
	let flag = confirm("确认删除该供应商吗？");
	if (flag) {
		try {
			await delSupplier(obj.id);
			let temp2 = await getSuppliers();
			if (temp2 instanceof Array) {
				tableData = temp2;
			}
			currentPage.value = 1;
			pageSize.value = 3;
			myarr.value = tableData.slice(0, 3);
			total.value = tableData.length;
		} catch (error) {
			console.error('数据删除失败', error);
		}
	}
}

const handleSizeChange = (val: any) => {
	pageSize.value = val;
	start = (currentPage.value - 1) * pageSize.value;
	end = currentPage.value * pageSize.value;
	myarr.value = tableData.slice(start, end);
}
const handleCurrentChange = (val: any) => {
	currentPage.value = val;
	start = (currentPage.value - 1) * pageSize.value;
	end = currentPage.value * pageSize.value;
	myarr.value = tableData.slice(start, end);
}
</script>

<style scoped>
.supplier-list {
	display: flex;
	flex-direction: column;
}

.supplier-list .el-header {
	display: flex;
	height: 2vw;
	align-items: center;
	background-image: linear-gradient(to bottom, #eee, #fff);
	outline: 1px solid #ccc;
	border-radius: 8px;
}

.supplier-list .el-header>img {
	width: 1vw;
	height: 1vw;
	vertical-align: middle;
	margin-right: 0.5vw;
}

.supplier-list .el-header>h4:nth-of-type(2) {
	color: #4287C2;
}

.supplier-list .el-main {
	display: flex;
	padding: 0;
	flex-direction: column;
}

.supplier-list .el-main .search {
	display: flex;
	height: 3vw;
	align-items: center;
	background-color: #eee;
	text-align: center;
}

.supplier-list .el-main .search>.el-input:nth-of-type(1) {
	flex-basis: 12vw;
	height: 1.8vw;
}

.supplier-list .el-main .search>.el-input:nth-of-type(n+2) {
	flex-basis: 8vw;
	height: 1.8vw;
}

.supplier-list .el-main .search>h4 {
	width: 160px;
	text-align: right;
}

.supplier-list .el-main .search>.el-button {
	width: 5vw;
	margin-left: 1.5vw;
	margin-right: 2vw;
}

.supplier-list .el-table img {
	width: 26px;
	height: 26px;
	cursor: pointer;
}

.supplier-list .el-table img:nth-of-type(2) {
	margin: 0 12px;
}

.supplier-list .demo-pagination-block {
	height: 3vw;
	line-height: 3vw;
}
</style>