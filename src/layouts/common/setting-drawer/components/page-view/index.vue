<template>
	<n-divider title-placement="center">界面显示</n-divider>
	<n-space vertical size="large">
		<setting-menu label="面包屑">
			<n-switch v-model:value="theme.header.crumb.visible"></n-switch>
		</setting-menu>
		<setting-menu label="面包屑图标">
			<n-switch v-model:value="theme.header.crumb.showIcon"></n-switch>
		</setting-menu>
		<setting-menu label="多页签">
			<n-switch v-model:value="theme.header.crumb.showIcon"></n-switch>
		</setting-menu>
		<setting-menu label="多页签风格">
			<n-select
				v-model:value="theme.tab.mode"
				:options="theme.tab.modeList"
				class="w-120px"
				size="small"
			></n-select>
		</setting-menu>
		<setting-menu label="页面切换动画">
			<n-switch v-model:value="theme.page.animate"></n-switch>
		</setting-menu>
		<setting-menu label="页面切换类型">
			<n-select
				v-model:value="theme.page.animateMode"
				:options="theme.page.animateModeList"
				class="w-120px"
				size="small"
			></n-select>
		</setting-menu>
	</n-space>
</template>

<script setup>
import SettingMenu from '../setting-menu/index.vue'
import { useThemeStore } from '@/store'
defineOptions({ name: 'PageView' })

const theme = useThemeStore()
</script>

<style lang="scss" scoped></style>
