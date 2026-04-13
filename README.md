# 超市后台管理系统 (Supermarket Admin System)

基于 Vue 3 + TypeScript + Vite 构建的前后端分离后台管理系统，UI 层采用 Element Plus，后端使用 JSON Server 提供模拟接口服务。

## 🛠️ 技术栈
- **前端框架**：Vue 3 (Composition API / setup 语法糖)
- **开发语言**：TypeScript
- **构建工具**：Vite
- **UI 框架**：Element Plus (按需引入)
- **路由管理**：Vue Router 5
- **网络请求**：Axios (封装在 `src/utils/request.ts`)
- **伪后端服务**：JSON Server (`json-server@0.17.4`，数据库文件 `shopdb.json`)

---

## 🚀 项目运行指南

由于这是一个前后端分离项目，需要分别启动模拟后台服务器和前端开发服务器。

### 1. 启动后端接口服务 (JSON Server)
**注意：** 因为代码数据类型原因，请务必使用 `0.17.4` 版本的 `json-server`（新版会出现类型匹配问题）。

进入 `myserver` 目录并运行以下命令：
```bash
cd myserver
npx json-server@0.17.4 --watch shopdb.json --port 3000 --static public
```
后端将在 `http://localhost:3000` 端口启动。

### 2. 启动前端项目
再新开一个终端窗口，进入 `SupperMarket1` 目录：
```bash
cd SupperMarket1
npm install   # 第一次运行前请先安装配置依赖
npm run dev   # 启动前端开发服务器
```

### 3. 测试登录
- **登录页面访问**：`http://localhost:5173/login` (实际端口依终端显示为准)
- **测试账号**：`ck4001`
- **测试密码**：`1234`

---

## 🎯 功能完成情况统计

### ✅ 已完成模块
- 🔐 **登录及鉴权体系** 
  - 通过 `userCode` 与密码登录。
  - Vue Router 全局路由前置守卫，未登录不能直接访问内容页。
  - 成功捕获异常登录状态并进行前端验证。
- 🏠 **系统整体 UI 框架**
  - 左侧全局菜单导航导航实现与选定样式。
  - 顶部动态时间组件、打招呼提示与页眉布局。
- 👥 **用户管理 (核心模块)**
  - 表格分页展示 (`Pagination`)
  - 数据按用户名与职位的复合条件搜索。
  - 新增用户。
  - 编辑现有用户信息。
  - 用户详细信息预览（组件间路由传参）。
  - 用户信息软/硬删除操作。
- 🔑 **密码系统** 
  - “密码修改”页面构建及逻辑交互。

### 🚧 尚待开发 (TODO List)
目前这些模块的页面仅使用占位符，具体的 API 对接和表单搭建有待补充：
- [ ] 📦 **商品管理模块** 
  - 需对接后台 `http://localhost:3000/product` 数据
  - 建立商品的新增、修改、删除及列表维护。
- [ ] 📋 **订单管理模块**
  - 需对接 `http://localhost:3000/bill` 数据
  - 建立订单生成、关联和状态变更体系。
- [ ] 🏭 **供应商管理模块**
  - 需对接 `http://localhost:3000/supplier` 数据
  - 处理企业级供应商信息的聚合和修改。
