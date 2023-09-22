<template>
	<router-view v-slot="{ Component, route }">
		<transition
			mode="out-in"
			:appear="true"
			@before-leave="app.setDisableMainXScroll(true)"
			@after-enter="app.setDisableMainXScroll(false)"
		>
			<keep-alive :include="routeStore.cacheRoutes">
				<component
					:is="Component"
					v-if="app.reloadFlag"
					:key="route.fullPath"
					:class="{ 'p-16px': showPadding }"
					class="flex-grow bg-#f6f9f8 dark:bg-#101014 transition duration-300 ease-in-out"
				></component>
			</keep-alive>
		</transition>
	</router-view>
</template>

<script setup>
import { useAppStore, useRouteStore, useThemeStore } from '@/store'

defineOptions({
	name: 'GlobalContent'
})

defineProps({
	showPadding: { type: Boolean, default: true }
})

const app = useAppStore()
const theme = useThemeStore()
const routeStore = useRouteStore()
</script>

<style lang="scss" scoped>
/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
