// scr/api/user.ts
//ts:TypeScript的数据类型：基本数据类型：string，number，boolean，null，undefined，any，void；引用类型：对象，数组，函数，Date日期类型
import http from '../utils/request.ts'
// 1.1封装获取所有用户信息的API
export const getUserList = () => {
	return http.get('user');
}

// 1.2查询用户编码与密码,登录
export const getUser = (data:any) => {
	//如果查id可以用路径变量，用户名与密码则为通用传参方式
	//返回用户信息均为数组
	return http.get("user?userCode=" + data.userCode + "&password=" + data.password);
}
// 1.3 通过用户名或用户角色查询
export const getUsers = (username:string, role:string) => {
	if (username != "" && role == "") { //只查用户
		return http.get("user?username=" + username);
	} else if (username == "" && role != "") { //只查角色
		return http.get("user?role=" + role);
	} else if (username != "" && role != "") { //查用户与角色
		return http.get("user?username=" + username + "&role=" + role);
	}
	////查所有用户,上边1.1可以省略
	return http.get("user");
}

//2.添加用户信息,注册
export const addUser = (data:any) => {
	//注册用户
	return http.post("user", data);
}

// 3.1修改用户信息,根据id号更新
export const updateUser = (user:any) => {
	return http.put("user/" + user.id, user);
}

////3.2 修改用户密码,第二个参数要传除id外所有其它字段
export const updatePass = (id:number, user:any) => {
	return http.put("user/" + id, user)
}

// 4.删除用户信息
export const delUser = (id:number) => {
	return http.delete("user/" + id);
}