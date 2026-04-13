<template>
	<!-- 信息提示与Home.vue直接整合 -->
	<div class="tips">
		<div class="left">
			<img src="/pic/clock.jpg" />
		</div>
		<div class="right">
			<h1>系统管理员</h1>
			<p>欢迎来到超市后台管理系统</p>
		</div>

	</div>
</template>

<script setup lang="ts">
</script>

<style scoped>
	.tips {
		display: flex;
	}

	.tips>.left {
		width: 10vw;
		height: 20vh;
		/* background-color: pink; */
		text-align: center;
		line-height: 20vh;
	}

	.tips>.left>img {
		vertical-align: middle;
	}

	.tips>.right {
		width: 14vw;
		height: 20vh;
		/* background-color: grey; */
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.tips>.right>h1 {
		color: dodgerblue;
	}

	.tips>.right>p {
		color: dimgrey;
		height: 2vw;
		line-height: 2vw;
	}
</style>