<template>
	<div class="user-list">
		<el-container>
			<!-- 顶部 -->
			<el-header>
				<img src="/pic/home.png" />
				<h4>你现在所在的位置是：</h4>
				<h4>用户管理页</h4>
			</el-header>
			<!-- 中间 -->
			<el-main>
				<!-- 搜索 -->
				<div class="search">
					<h4>用户名：</h4>
					<el-input v-model="username" size="small" placeholder="请输入用户名称" />
					<h4>用户角色：</h4>
					<el-select v-model="role" class="el-input" placeholder="请选择">
						<el-option v-for="item in roles" :key="item" :label="item" :value="item" />
					</el-select>
					<!-- 查询 -->
					<el-button type="success" @click="queryUsers()">
						<img src="/pic/search.png" />查询
					</el-button>
					<el-button type="primary" @click="addUser">
						<img src="/pic/tianjia.png" />
						添加用户
					</el-button>
				</div>
				<!-- element-plus表格中加载数组 -->
				<div class="table">
					<el-table :data="myarr" stripe style="width: 100%">
						<el-table-column prop="userCode" label="用户编码" />
						<el-table-column prop="username" label="用户名称" />
						<el-table-column prop="gender" label="性别" />
						<el-table-column prop="age" label="年龄" />
						<el-table-column prop="mobile" label="电话" />
						<el-table-column prop="role" label="用户角色" />
						<!-- 也可以 <el-table-column label="操作" #default="us"> -->
						<el-table-column label="操作">
							<!-- 在表格中，需要使用按钮的地方使用template标签包裹，然后使用v-solt="scope"插槽获取数据并传入父组件,
							scope.row获取当前行数据;scope可以其它名称,v-solt或以简写为#defalut;插槽可以直接放在子组件上.-->
							<template v-slot="us">
								<!-- <el-button type="primary">修改</el-button>
								<el-button type="danger">删除</el-button> -->
								<img src="/pic/read.png" @click="goDetail(us.row)" />
								<img src="/pic/xiugai.png" @click="goUpdate(us.row)" />
								<img src="/pic/schu.png" @click="deleteUser(us.row)" />
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
////// 通过pinia状态管理：实现大型项目管理 //////
import {
	ref,
	onMounted
} from 'vue'
//直接导入自定义路由配置文件作路由对象,也可以使用系统的路由vue-router
import router from '../../router';
//import qs from 'qs'
import {
	getUserList, getUsers,
   delUser
} from '../../api/user.ts'
//安装一个补丁npm i --save-dev @types/qs
import qs from 'qs';
//创建状态对象
// 声明响应式搜索变量，否则不能输入或内容不回显
const username = ref(''); //用户名
const role = ref(''); //用户角色
//用户下拉菜单中用户角色
const roles = ref(['', '普通员工', '销售经理', '财务会计', '财务总监', '行政主管', '经理助理', '总经理', '技术总监']);
///////////////分页效果，请与表格整合到一起/////////////////
//当前是第几页，这里默认为第一页
const currentPage = ref(1)
// 每一页的大小,这里默认设置为3条
const pageSize = ref(3)
// 是否为最小化方式,默认为否
const small = ref(false)
// 按钮的背景颜色
const background = ref(true)
// 分页按钮是否不可用,默认为false
const disabled = ref(false)
//加载到页面中的数组数据,分页加载数组
let myarr = ref(Array());
//临时存储的表格数据
let tableData = Array();//创建一个空数组
//存用户总数
let total = ref(0);
let start = 0; //存放数组中待复制的起始索引号
let end = 0; //存放数组中待复制结束的索引号
//// 1.初始化数据,用户列表,设置同步方法
onMounted(async () => {
	try {
		//执行user.ts对象中的方法
		let temp = await getUserList();
		if (temp instanceof Array) {
			tableData = temp;
			//取默认前三条记录
			myarr.value = tableData.slice(0, 3);
			//总的记录条数
			total.value = tableData.length;
		}
	} catch (error) {
		console.error('获取数据失败', error);
	}
})

////2.通过用户名或用户角色查询
const queryUsers = async () => {
	try {
		//传参后读取状态对象
		let temp1 = await getUsers(username.value, role.value);
		//读取状态对象
		if (temp1 instanceof Array) {
			tableData = temp1;
			//取默认前三条记录
			myarr.value = tableData.slice(0, 3);
			//总的记录条数
			total.value = tableData.length;
		}
	} catch (error) {
		console.error('获取数据失败', error);
	}
}

////3.去添加用户页面,可以使用插槽或子组件卡方式使用
const addUser = () => {
	router.push('/home/user-add');
}
////4.去详情页,可以使用插槽或子组件卡方式使用
const goDetail = (obj: any) => { //传入当前行对象
	//通过路由传参
	router.push({
		path: '/home/user-detail',
		query: {//将当前行对象转为json字符串
			user: qs.stringify(obj)
		}
	})
}
////4.去更新页,可以使用插槽或子组件卡方式使用
const goUpdate = (obj: any) => { //传入当前行对象
	//通过路由传参，也可以通过sessionStorage传递
	sessionStorage.setItem("user", JSON.stringify(obj));
	router.push("/home/user-update")
}
////5.删除用户,传入当前用户,用到异步操作
const deleteUser = async (obj: any) => {
	let flag = confirm("确认删除");
	if (flag) { //点击确认后删除，否则取消
		try {
			// 按id号删除
			await delUser(obj.id);
			//重新查一遍，并再次初始化
			let temp2 = await getUserList();
			if (temp2 instanceof Array) {//ts需要判断
				tableData = temp2;
			}
			////重置分页
			currentPage.value = 1;
			pageSize.value = 3
			//取默认前三条记录
			myarr.value = tableData.slice(0, 3);
			//总的记录条数
			total.value = tableData.length;
		} catch (error) {
			console.error('数据删除失败', error);
		}
	}
}

//// 6.改变每一页显示的大小
const handleSizeChange = (val:any) => {
	pageSize.value = val; //获取每一页实际大小
	start = (currentPage.value - 1) * pageSize.value;
	end = currentPage.value * pageSize.value; //数组数据动态更新
	myarr.value = tableData.slice(start, end);
	console.log(`每一页大小为：${val}`)
}
//// 7.改变当前页后，重新获取数据
const handleCurrentChange = (val:any) => {
	currentPage.value = val;
	////改变表格中实现显示的数组元素
	start = (currentPage.value - 1) * pageSize.value;
	end = currentPage.value * pageSize.value;
	//数组数据动态更新
	myarr.value = tableData.slice(start, end);
	console.log(`当前页数是: ${val} 页`)
}
</script>

<style scoped>
.user-list {
	/*设置为弹性盒子 */
	display: flex;
	/* 一定要设置好方向 */
	flex-direction: column;
}

/*************顶部提示样式******************/
.user-list .el-header {
	display: flex;
	height: 2vw;
	align-items: center;
	background-image: linear-gradient(to bottom, #eee, #fff);
	outline: 1px solid #ccc;
	border-radius: 8px;
}

.user-list .el-header>img {
	width: 1vw;
	height: 1vw;
	vertical-align: middle;
	margin-right: 0.5vw;
}

.user-list .el-header>h4:nth-of-type(2) {
	color: #4287C2;
}

/*************中间搜索与表格样式******************/
.user-list .el-main {
	/* 第一个水平默认全屏 */
	display: flex;
	/* el的容器必须重置内外边距 */
	padding: 0;
	flex-direction: column;
}

/* 中间搜索部分 */
.user-list .el-main .search {
	display: flex;
	/* 宽度默认为父元素 */
	/* width: 100%; */
	height: 3vw;
	align-items: center;
	background-color: #eee;
	text-align: center;
}

/* 弹性盒子中的子元素必须显式地设置宽度，高度 */
.user-list .el-main .search>.el-input:nth-of-type(1) {
	/* 设置主轴的大小 */
	flex-basis: 12vw;
	height: 1.8vw;
}

.user-list .el-main .search>.el-input:nth-of-type(n+2) {
	/* 设置主轴的大小 */
	flex-basis: 6vw;
	height: 1.8vw;
}

.user-list .el-main .search>h4 {
	/* 显式地设置大小 */
	width: 160px;
	/* 右对齐 */
	text-align: right;
}

.user-list .el-main .search>p {
	width: 7vw;
	text-align: right;
}

.user-list .el-main .search>.el-button {
	width: 5vw;
	margin-left: 1.5vw;
	margin-right: 4vw;
}

/**************表格样式************/
.user-list .el-table img {
	width: 26px;
	height: 26px;
	cursor: pointer;
}

.user-list .el-table img:nth-of-type(2) {
	margin: 0 12px;
}

/**************分页样式************/
.user-list .demo-pagination-block {
	height: 3vw;
	line-height: 3vw;
}
</style>