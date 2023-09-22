<template>
	<n-config-provider
		:theme="theme.naiveTheme"
		:theme-overrides="theme.naiveThemeOverrides"
		:locale="zhCN"
		:date-locale="dateZhCN"
		class="h-full"
	>
		<NaiveProvider>
			<router-view> </router-view>
		</NaiveProvider>
	</n-config-provider>
</template>

<script setup>
import { subscribeStore, useThemeStore } from '@/store'
import NaiveProvider from './components/common/naive-provider.vue'
import { useGlobalEvents } from '@/composables'

const theme = useThemeStore()

subscribeStore()
useGlobalEvents()
</script>

<style scoped></style>
