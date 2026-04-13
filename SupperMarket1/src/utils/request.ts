// src/utils/request.ts
import axios from 'axios';

// 创建axios实例，并初始化配置
const http = axios.create({
	// 此处url可以动态获取:process.env.VUE_APP_API_BASE
    //此处为json-server服务器的地址
	baseURL: 'http://localhost:3000/',
    // 超时时间
	timeout: 5000,
    // 请求头,指定请求数据的格式
	headers: {
		'Content-Type': 'application/json'
	}
});

// 请求拦截器，设置客户端发送给服务器的数据的格式与配置
http.interceptors.request.use(
	(config) => {//正常返回请求数据
		// 可以在这里添加token等认证信息
		//token =localStorage.getItem('token');
		//if (token!=null){}
		// config.headers.Authorization = `Bearer ${token}`;
		console.log('---resquest yes---')
		return config;
	},
	(error) => {//请求失败
		return Promise.reject(error);
	}
);

// 响应拦截器自动执行,获取服务器返回的数据
http .interceptors.response.use(
	//可以判断返回:response.data.code==200
	(response) => {
		console.log('-----response ok------')
        //此处返回数据为json数据
		return response.data;
	},
	(error) => {//系统有误返回
		console.error('系统有误:'+error);
		return Promise.reject(error);
	}
);
////导出请求对象
export default http;