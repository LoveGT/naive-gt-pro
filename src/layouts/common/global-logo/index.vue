<template>
	<router-link :to="routerHomePath" class="flex-center w-full nowrap-hidden">
		<SystemLogo class="text-32px text-primary"></SystemLogo>
		<h2
			v-show="showTitle"
			class="pl-8px text-16px font-bold text-primary transition duration-300 ease-in-out"
		>
			Soybean管理系统
		</h2>
	</router-link>
</template>

<script setup>
import { routePath } from '@/router'
defineOptions({
	name: 'GlobalLogo'
})

defineProps({
	showTitle: {
		type: Boolean,
		default: true
	}
})
const routerHomePath = routePath('root')
</script>

<style lang="scss" scoped></style>
