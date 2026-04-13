<template>
	<div class="bill-list">
		<el-container>
			<!-- 顶部 -->
			<el-header>
				<img src="/pic/home.png" />
				<h4>你现在所在的位置是：</h4>
				<h4>订单管理页</h4>
			</el-header>
			<!-- 中间 -->
			<el-main>
				<!-- 搜索 -->
				<div class="search">
					<h4>商品名称：</h4>
					<el-input v-model="pname" size="small" placeholder="请输入商品名称" />
					<h4>订单状态：</h4>
					<el-select v-model="flag" class="el-input" placeholder="请选择">
						<el-option v-for="item in flagList" :key="item" :label="item" :value="item" />
					</el-select>
					<!-- 查询 -->
					<el-button type="success" @click="queryBillList()">
						<img src="/pic/search.png" />查询
					</el-button>
					<el-button type="primary" @click="goAddBill">
						<img src="/pic/tianjia.png" />
						添加订单
					</el-button>
				</div>
				<!-- 表格 -->
				<div class="table">
					<el-table :data="myarr" stripe style="width: 100%">
						<el-table-column prop="billCode" label="订单编码" />
						<el-table-column prop="pname" label="商品名称" />
						<el-table-column prop="unit" label="单位" width="60" />
						<el-table-column prop="num" label="数量" width="60" />
						<el-table-column prop="total" label="总金额(元)">
							<template v-slot="scope">
								<span style="color: #e6a23c; font-weight: bold;">¥{{ scope.row.total }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="supplier" label="供应商" />
						<el-table-column prop="flag" label="订单状态">
							<template v-slot="scope">
								<el-tag :type="getTagType(scope.row.flag)">
									{{ scope.row.flag }}
								</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="date" label="下单日期" />
						<!-- 操作列 -->
						<el-table-column label="操作">
							<template v-slot="bs">
								<img src="/pic/read.png" @click="goDetail(bs.row)" />
								<img src="/pic/xiugai.png" @click="goUpdate(bs.row)" />
								<img src="/pic/schu.png" @click="deleteBill(bs.row)" />
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
	getBills, queryBills,
	delBill
} from '../../api/bill.ts'

// 搜索变量
const pname = ref('');
const flag = ref('');
const flagList = ref(['', '已完成', '待发货', '待收货', '待付款']);

///////////////分页效果/////////////////
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

//根据订单状态返回不同颜色的Tag
const getTagType = (flag: string) => {
	switch (flag) {
		case '已完成': return 'success';
		case '待发货': return 'warning';
		case '待收货': return '';
		case '待付款': return 'danger';
		default: return 'info';
	}
}

//// 1.初始化数据
onMounted(async () => {
	try {
		let temp = await getBills();
		if (temp instanceof Array) {
			tableData = temp;
			myarr.value = tableData.slice(0, 3);
			total.value = tableData.length;
		}
	} catch (error) {
		console.error('获取数据失败', error);
	}
})

////2.条件查询
const queryBillList = async () => {
	try {
		let temp1 = await queryBills(pname.value, flag.value);
		if (temp1 instanceof Array) {
			tableData = temp1;
			myarr.value = tableData.slice(0, 3);
			total.value = tableData.length;
		}
	} catch (error) {
		console.error('获取数据失败', error);
	}
}

////3.去添加订单页面
const goAddBill = () => {
	router.push('/home/bill-add');
}
////4.去详情页
const goDetail = (obj: any) => {
	router.push({
		path: '/home/bill-detail',
		query: {
			bill: qs.stringify(obj)
		}
	})
}
////5.去更新页
const goUpdate = (obj: any) => {
	sessionStorage.setItem("bill", JSON.stringify(obj));
	router.push("/home/bill-update")
}
////6.删除订单
const deleteBill = async (obj: any) => {
	let flag = confirm("确认删除该订单吗？");
	if (flag) {
		try {
			await delBill(obj.id);
			let temp2 = await getBills();
			if (temp2 instanceof Array) {
				tableData = temp2;
			}
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
}
//// 8.改变当前页后，重新获取数据
const handleCurrentChange = (val: any) => {
	currentPage.value = val;
	start = (currentPage.value - 1) * pageSize.value;
	end = currentPage.value * pageSize.value;
	myarr.value = tableData.slice(start, end);
}
</script>

<style scoped>
.bill-list {
	display: flex;
	flex-direction: column;
}

.bill-list .el-header {
	display: flex;
	height: 2vw;
	align-items: center;
	background-image: linear-gradient(to bottom, #eee, #fff);
	outline: 1px solid #ccc;
	border-radius: 8px;
}

.bill-list .el-header>img {
	width: 1vw;
	height: 1vw;
	vertical-align: middle;
	margin-right: 0.5vw;
}

.bill-list .el-header>h4:nth-of-type(2) {
	color: #4287C2;
}

.bill-list .el-main {
	display: flex;
	padding: 0;
	flex-direction: column;
}

.bill-list .el-main .search {
	display: flex;
	height: 3vw;
	align-items: center;
	background-color: #eee;
	text-align: center;
}

.bill-list .el-main .search>.el-input:nth-of-type(1) {
	flex-basis: 12vw;
	height: 1.8vw;
}

.bill-list .el-main .search>.el-input:nth-of-type(n+2) {
	flex-basis: 6vw;
	height: 1.8vw;
}

.bill-list .el-main .search>h4 {
	width: 160px;
	text-align: right;
}

.bill-list .el-main .search>.el-button {
	width: 5vw;
	margin-left: 1.5vw;
	margin-right: 4vw;
}

.bill-list .el-table img {
	width: 26px;
	height: 26px;
	cursor: pointer;
}

.bill-list .el-table img:nth-of-type(2) {
	margin: 0 12px;
}

.bill-list .demo-pagination-block {
	height: 3vw;
	line-height: 3vw;
}
</style>