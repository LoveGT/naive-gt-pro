<template>
	<div
		class="dark:bg-dark dark:text-white :dark:text-opacity-82 transition-all"
		:class="inverted ? 'bg-#001428 text-white' : 'bg-white text-#333639'"
	>
		<slot></slot>
	</div>
</template>

<script setup>
defineOptions({
	name: 'DarkModeContainer'
})
defineProps({
	inverted: {
		type: Boolean,
		default: false
	}
})
</script>

<style lang="scss" scoped></style>
