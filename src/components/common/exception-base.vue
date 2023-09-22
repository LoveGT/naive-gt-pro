<template>
	<div class="flex-col-center gap-24px min-h-520px wh-full overflow-hidden">
		<div class="flex text-400px text-primary">
			<icon-local-no-permission v-if="type === '403'" />
			<icon-local-not-found v-if="type === '404'" />
			<icon-local-service-error v-if="type === '500'" />
		</div>
		<router-link :to="{ name: routeHomePath }">
			<n-button type="primary">回到首页</n-button>
		</router-link>
	</div>
</template>

<script setup>
import { routeName } from '@/router'
defineOptions({
	name: 'ExceptionBase'
})
defineProps({
	type: {
		type: String,
		default: '404'
	}
})

const routeHomePath = routeName('root')
</script>

<style lang="scss" scoped></style>
