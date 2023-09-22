<template>
	<div class="flex-1-hidden h-full px-1opx">
		<n-scrollbar flex-1-hidden h-full x-scrollable content-class="h-full">
			<div
				class="flex-y-center h-full"
				:style="{ justifyContent: theme.menu.horizontalPosition }"
			>
				<n-menu
					:value="activeKey"
					mode="horizontal"
					:options="menus"
					:inverted="theme.header.inverted"
					@update:value="handleUpdateMenu"
				/>
			</div>
		</n-scrollbar>
	</div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRouteStore, useThemeStore } from '@/store'
import { useRouterPush } from '@/composables'
import { translateMenuLabel } from '@/utils'

defineOptions({ name: 'HeaderMenu' })

const route = useRoute()
const routeStore = useRouteStore()
const theme = useThemeStore()
const { routerPush } = useRouterPush()

const menus = computed(() => translateMenuLabel(routeStore.menus))
const activeKey = computed(() =>
	route.meta?.activeMenu ? route.meta.activeMenu : route.name
)

function handleUpdateMenu(_key, item) {
	const menuItem = item
	routerPush(menuItem.routePath)
}
</script>

<style lang="scss" scoped></style>
