<template>
	<n-breadcrumb>
		<template v-for="breadcrumb in breadcrumbs" :key="breadcrumb.key">
			<n-breadcrumb-item>
				<n-dropdown
					v-if="breadcrumb.hasChildren"
					:options="breadcrumb.options"
					@select="dropdownSelect"
				>
					<span>
						<component
							:is="breadcrumb.icon"
							v-if="theme.header.crumb.showIcon"
							class="inline-block align-text-bottom mr-4px text-16px"
						></component>
						<span>{{ breadcrumb.label }}</span>
					</span>
				</n-dropdown>
				<template v-else>
					<component
						:is="breadcrumb.icon"
						v-if="theme.header.crumb.showIcon"
						class="inline-block align-text-bottom mr-4px text-16px"
						:class="{ 'text-#BBBBBB': theme.header.inverted }"
					/>
					<span :class="{ 'text-#BBBBBB': theme.header.inverted }">
						{{ breadcrumb.label }}
					</span>
				</template>
			</n-breadcrumb-item>
		</template>
	</n-breadcrumb>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { routePath } from '@/router'
import { useRouteStore, useThemeStore } from '@/store'
import { useRouterPush } from '@/composables'
import { getBreadcrumbByRouteKey } from '@/utils'

defineOptions({ name: 'GlobalBreadcrumb' })

const route = useRoute()
const theme = useThemeStore()
const routeStore = useRouteStore()

const { routerPush } = useRouterPush()

const breadcrumbs = computed(() =>
	getBreadcrumbByRouteKey(route.name, routeStore.menus, routePath('root')).map(
		(item) => ({
			...item
		})
	)
)

function dropdownSelect(key) {
	routerPush({ name: key })
}
</script>

<style lang="scss" scoped></style>
