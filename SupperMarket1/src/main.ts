// 导vue库中的createApp对象
import {
	createApp
} from 'vue'
//导入根组件
import App from './App.vue'
//全局导入路由配置文件
import router from './router/index.ts'
//全局引入全局样式文件
import './style.css';
import 'element-plus/dist/index.css'
// 导入图标字体样式
import '@fortawesome/fontawesome-free/css/all.css';
////路由守护：不登录，不允许打开其它页
router.beforeEach(function(to, from, next) { //路由前置守护
	//用户登录成功后缓存数据到会话对象
	let userCode = localStorage.getItem('userCode');
	//除了登录、注册之外，都需要判断是否登录
	if (!(to.path == '/' || to.path == '/login' || to.path == '/register')) {
		if (userCode == null || userCode == undefined) {
			//如果用户没有登录则直接跳到登录页
			router.push('/login');
		}
	}
	//如果请求路径（接口）是允许(合法)的，则继续往后执行
	next();
});
//创建vue对象
const app = createApp(App);
//加载路由配置对象
app.use(router);
//挂载容器
app.mount('#app')