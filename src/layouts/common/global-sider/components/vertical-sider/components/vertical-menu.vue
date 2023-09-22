<template>
	<n-scrollbar class="flex-1-hidden">
		<n-menu
			:value="activeKey"
			:collapsed="app.siderCollapse"
			:collapsed-width="theme.sider.collapsedWidth"
			:collapsed-icon-size="22"
			:options="menus"
			:expanded-keys="expandedKeys"
			:indent="18"
			:inverted="!theme.darkMode && theme.sider.inverted"
			@update:value="handleUpdateMenu"
			@update:expanded-keys="handleUpdateExpandedKeys"
		/>
	</n-scrollbar>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore, useRouteStore, useThemeStore } from '@/store'
import { useRouterPush } from '@/composables'
import { getActiveKeyPathsOfMenus, translateMenuLabel } from '@/utils'

defineOptions({ name: 'VerticalMenu' })

const route = useRoute()
const app = useAppStore()
const theme = useThemeStore()
const routeStore = useRouteStore()
const { routerPush } = useRouterPush()

const menus = computed(() => translateMenuLabel(routeStore.menus))

const activeKey = computed(() =>
	route.meta?.activeMenu ? route.meta.activeMenu : route.name
)
const expandedKeys = ref([])

function handleUpdateMenu(_key, item) {
	const menuItem = item
	routerPush(menuItem.routePath)
}

function handleUpdateExpandedKeys(keys) {
	expandedKeys.value = keys
}

watch(
	() => route.name,
	() => {
		expandedKeys.value = getActiveKeyPathsOfMenus(activeKey.value, menus.value)
	},
	{ immediate: true }
)
</script>

<style scoped></style>
