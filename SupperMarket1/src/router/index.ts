/////////路由配置//////////
//1.导路由与组件文件
import {
  createRouter,
  createWebHistory,
  RouteRecordRaw //引入 RouteRecordRaw 类型
} from 'vue-router'
import Login from '../components/user/Login.vue'
import Home from '../components/home/Home.vue'
import Tips from '../components/home/Tips.vue'
import ProductList from '../components/product/ProductList.vue'
//import ProductAdd from '../components/product/ProductAdd.vue'
import BillList from '../components/bill/BillList.vue'
//import BillAdd from '../components/bill/BillAdd.vue'
import SupplierList from '../components/supplier/SupplierList.vue'
//import SupplierAdd from '../components/supplier/SupplierAdd.vue'
import UserList from '../components/user/UserList.vue'
import UserAdd from '../components/user/UserAdd.vue'
import UserUpdate from '../components/user/UserUpdate.vue'
import UserDetail from '../components/user/UserDetail.vue'
import EditPass from '../components/user/EditPass.vue'

//2.创建路由数组，映射路径
const rs:RouteRecordRaw[] = [{
  path: '/', //默认加载到router-view中
  redirect: '/login'//重定向
}, {
  path: '/login', //语义化
  component: Login
},
            {
              path: '/home', //主路由
              component: Home,
              children: [ //配置子路由
                { //子路由根路径,自动加载
                  path: "/home/",
                  component: Tips
                },
                {
                  path: "/home/product-list",
                  component: ProductList
                },
                // {
                //   path: "/home/product-add",
                //   component: ProductAdd
                // },
                {
                  path: "/home/bill-list",
                  component: BillList
                },
                // {
                //   path: "/home/bill-add",
                //   component: BillAdd
                // },
                {
                  path: "/home/supplier-list",
                  component: SupplierList
                },
                // {
                //   path: "/home/supplier-add",
                //   component: SupplierAdd
                // },
                {
                  path: "/home/user-list",
                  component: UserList
                }, {
                  path: "/home/user-add",
                  component: UserAdd
                },
                {
                  path: "/home/user-update",
                  component: UserUpdate
                },
                {
                  path: "/home/user-detail",
                  component: UserDetail
                },
                {
                  path: '/home/edit-pass',
                  component: EditPass
                }
              ]
            }
           ]
//3.创建路由对象
const router = createRouter({
  history: createWebHistory(),
  routes: rs
})
//4.导出路由对象
export default router