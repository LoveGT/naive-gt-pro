<template>
	<DarkModeContainer
		class="global-header flex-y-center h-full"
		:inverted="theme.header.inverted"
	>
		<GlobalLogo
			v-if="showLogo"
			:show-title="true"
			class="h-full"
			:style="{ width: theme.sider.width + 'px' }"
		></GlobalLogo>
		<div v-if="!showHeaderMenu" class="flex-1-hidden flex-y-center h-full">
			<MenuCollapse v-if="showMenuCollapse || isMobile"></MenuCollapse>
			<GlobalBreadcrumb
				v-if="theme.header.crumb.visible && !isMobile"
			></GlobalBreadcrumb>
		</div>
		<HeaderMenu v-else></HeaderMenu>
		<div class="flex justify-end h-full">
			<global-search></global-search>
			<github-site></github-site>
			<full-screen></full-screen>
			<theme-mode></theme-mode>
			<toggle-lang></toggle-lang>
			<system-message />
			<setting-button v-if="showButton" />
			<user-avatar></user-avatar>
		</div>
	</DarkModeContainer>
</template>

<script setup>
import { useThemeStore } from '@/store'
import GlobalSearch from '../global-search/index.vue'
import { GlobalLogo } from '..'
import {
	GlobalBreadcrumb,
	MenuCollapse,
	HeaderMenu,
	GithubSite,
	FullScreen,
	ThemeMode,
	ToggleLang,
	MessageList,
	UserAvatar,
	SettingButton,
	SystemMessage
} from './components'

defineOptions({
	name: 'GlobalHeader'
})
defineProps({
	showLogo: {
		type: Boolean,
		default: false
	},
	showHeaderMenu: {
		type: Boolean,
		default: false
	},
	showMenuCollapse: {
		type: Boolean,
		default: true
	}
})
const theme = useThemeStore()

const showButton = import.meta.env.PROD && import.meta.env.VITE_VERCEL !== 'Y'
</script>

<style lang="scss" scoped>
.global-header {
	box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
