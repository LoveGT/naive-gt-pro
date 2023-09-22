<template>
	<n-drawer
		v-model:show="app.settingDrawerVisible"
		:width="330"
		@mask-click="app.closeSettingDrawer"
	>
		<n-drawer-content title="主题配置" :native-scrollbar="false">
			<dark-mode></dark-mode>
			<LayoutMode></LayoutMode>
			<ThemeColorSelect></ThemeColorSelect>
			<PageFunc></PageFunc>
			<PageView></PageView>
			<ThemeConfig></ThemeConfig>
		</n-drawer-content>
	</n-drawer>
	<DrawerButton v-if="showButton"></DrawerButton>
</template>

<script setup>
import { useAppStore } from '@/store'
import {
	DrawerButton,
	DarkMode,
	LayoutMode,
	ThemeColorSelect,
	PageFunc,
	PageView,
	ThemeConfig
} from './components'

defineOptions({ name: 'SettingDrawer' })

const app = useAppStore()

const showButton = import.meta.env.DEV || import.meta.env.VITE_VERCEL === 'Y'
</script>
