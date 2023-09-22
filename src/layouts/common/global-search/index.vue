<template>
	<div>
		<hover-container
			class="w-40px h-full"
			tooltip-content="搜索"
			:inverted="theme.header.inverted"
			@click="handleSearch"
		>
			<icon-uil-search class="text-20px"> </icon-uil-search>
		</hover-container>
		<search-modal v-model:value="show"></search-modal>
	</div>
</template>

<script setup>
import { useThemeStore } from '@/store'
import { useBoolean } from '@/hooks'

import SearchModal from './components/search-modal.vue'

defineOptions({ name: 'GlobalSearch' })

const { bool: show, toggle } = useBoolean()
const theme = useThemeStore()
const handleSearch = () => {
	toggle()
}
</script>

<style lang="scss" scoped></style>
