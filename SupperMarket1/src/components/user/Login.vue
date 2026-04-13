<!-- 模板标签，用于渲染网页内容：放网页标签 -->
<!-- 其中的最外层只能有一个块级父元素 -->
<template>
    <div class="login">
        <div class="wrap">
            <h2>超市后台管理系统</h2>
            <!-- submit按钮返回为真则跳转，为假则呆在原地 -->
            <form>
                <!-- 用户名 -->
                <p>
                    <span>
                        用户名：
                    </span>
                    <input type="text" placeholder="请输入用户名" v-model="user.userCode" required />
                </p>
                <!-- 密码 -->
                <p>
                    <span>
                        密&ensp;&ensp;码：
                    </span>
                    <input type="password" placeholder="请输入密码" v-model="user.password" required />
                </p>
                <!-- 登录 -->
                <p>
                    <!-- 注意这里的按钮事件 -->
                    <!-- @click="go()"与@submit调用时返回值不一样 -->
                    <input type="button" value="登录" @click="go()" />
                    <input type="button" value="重置" @click="reset()">
                    <!-- 后台管理系统,无用户注册由管理员后台添加 -->
                    <!-- <a @click="play">去注册</a> -->
                </p>
            </form>
        </div>
    </div>
</template>
<!-- js程序代码:默认为选项目式vue3语法 -->
<!-- 建议vue3组合式语法格式:使用setup语法糖 -->
<script setup lang="ts">
//导入响应工具
import {
    ref
} from 'vue'
//导路由工具
import {
    useRouter
} from 'vue-router'
import {
    getUser
} from '../../api/user.ts'
// 引入UI框架的消息提示
import {
    ElMessage
} from 'element-plus';
////用户编码登录系统用userCode
const user = ref({
    userCode: "",
    password: ""
})
//创建路由对象
const router = useRouter();
////登录成功后，跳转到主页
const go = async () => {
    if (user.value.userCode == "" || user.value.password == "") {
        ElMessage.error('用户码或密码不能为空')
        return;
    } else {
        //获取返回的数组对象
        const arr = await getUser(user.value);
        if (arr instanceof Array) {
            //正常提交
            if (arr.length > 0) {
                //json-server更新需要id
                localStorage.setItem('id', arr[0].id);
                console.log('当前用户id',arr[0].id)
                //用于路由拦载
                localStorage.setItem('userCode', user.value.userCode)
                //保存用户名与密码，以便之后调用
                localStorage.setItem('password', user.value.password);
                //用于显示
                localStorage.setItem('username', arr[0].username);
                ////转换后存用户信息,用作更新用////
                localStorage.setItem('user', JSON.stringify(arr[0]));
                //路由跳转
                router.push('/home');
            } else {
                ElMessage.error('用户名或密码有误')
                return;
            }
        }
    }//if-end
}
////重置
const reset = () => {
    user.value.userCode = "";
    user.value.password = "";
}
</script>
<!-- 组件文件样式 -->
<!-- scoped表示以下样式只影响当前组件页 -->
<style scoped>
/*****************整体样式********************/
.login {
    width: 100vw;
    height: 100vh;
    /* 设置为边框盒子,防止子元素撑开 */
    box-sizing: border-box;
    background: url('/pic/login_bg.jpg') no-repeat;
    background-size: 100% 100%;
    background-color: grey;
    display: flex;
    justify-content: center;
    align-items: center;
}

/*****************表单样式********************/
.wrap {
    width: 22vw;
    height: 30vh;
    /* background-color: pink; */
}

.wrap>h2 {
    height: 6vh;
    text-align: center;
    color: white;
    text-shadow: 2px 2px 8px black;
}

.wrap>form {
    /* background-color: green; */
    height: 100%;
    width: 100%;
    background: url('/pic/formBg.png') no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding-top: 4.5vw;
    text-align: center;
}

.wrap>form>p {
    height: 3.5vw;
    /* background-color: pink; */
    font-size: 1.122vw;
}

.wrap>form>p:nth-of-type(-n+2)>input {
    height: 2.5vw;
    width: 14vw;
    font-size: 0.8vw;
    color: gray;
    /* border: 1px solid red; */
}

.wrap>form>p:nth-of-type(3)>input {
    width: 4vw;
    height: 2.5vw;
    border: 2px solid white;
    background-color: #54A4D7;
    font-size: 1vw;
    color: white;
    font-weight: bold;
}

.wrap>form>p:nth-of-type(3)>input:nth-of-type(2) {
    margin-left: 1.2vw;
    margin-right: 1vw;
}

.wrap>form>p:nth-of-type(3)>a {
    font-size: 0.8vw;
    color: #54A4D7;
    font-weight: bold;
}

.wrap>form>p:nth-of-type(3)>a:hover {
    color: coral;
    /* 光标外观,手形 */
    cursor: pointer;
}
</style>