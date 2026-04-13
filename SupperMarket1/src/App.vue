<template>
  <div id="app">
  <!-- 路由渲染的容器：用于显示所有.vue文件的内容 -->
   <router-view />
  </div>
</template>
<!--导入组件Login.vue -->
<script setup lang="ts">
</script>
<style scoped>
	#app{
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
	}
</style>