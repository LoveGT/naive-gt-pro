<template>
	<n-divider title-placement="center">界面功能</n-divider>
	<n-space vertical size="large">
		<setting-menu label="滚动模式">
			<n-select
				v-model:value="theme.scrollMode"
				class="w-120px"
				size="small"
				:options="theme.scrollModeList"
			/>
		</setting-menu>
		<setting-menu label="固定头部和多页签">
			<n-switch v-model:value="theme.fixedHeaderAndTab" />
		</setting-menu>
		<setting-menu label="顶部菜单位置">
			<n-select
				v-model:value="theme.menu.horizontalPosition"
				class="w-120px"
				size="small"
				:options="theme.menu.horizontalPositionList"
			/>
		</setting-menu>
		<setting-menu label="头部高度">
			<n-input-number
				v-model:value="theme.header.height"
				class="w-120px"
				size="small"
				:step="1"
			/>
		</setting-menu>
		<setting-menu label="多页签高度">
			<n-input-number
				v-model:value="theme.tab.height"
				class="w-120px"
				size="small"
				:step="1"
			/>
		</setting-menu>
		<setting-menu label="多页签缓存">
			<n-switch v-model:value="theme.tab.isCache" />
		</setting-menu>
		<setting-menu label="侧边栏展开宽度">
			<n-input-number
				v-model:value="theme.sider.width"
				class="w-120px"
				size="small"
				:step="1"
			/>
		</setting-menu>
		<setting-menu label="左侧混合侧边栏展开宽度">
			<n-input-number
				v-model:value="theme.sider.mixWidth"
				class="w-120px"
				size="small"
				:step="1"
			/>
		</setting-menu>
		<setting-menu label="显示底部">
			<n-switch v-model:value="theme.footer.visible" />
		</setting-menu>
		<setting-menu label="固定底部">
			<n-switch v-model:value="theme.footer.fixed" />
		</setting-menu>
		<setting-menu label="底部居右">
			<n-switch v-model:value="theme.footer.right" />
		</setting-menu>
	</n-space>
</template>

<script setup>
import { useThemeStore } from '@/store'
import SettingMenu from '../setting-menu/index.vue'

defineOptions({ name: 'PageFunc' })

const theme = useThemeStore()
</script>

<style lang="scss" scoped></style>
