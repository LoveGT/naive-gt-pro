<template>
	<div v-if="showTooltip">
		<n-tooltip :placement="placement" trigger="hover">
			<template #trigger>
				<div
					class="flex-center h-full cursor-pointer :dark:hover:bg-#333"
					:class="contentClass"
				>
					<slot></slot>
				</div>
			</template>
			{{ tooltipContent }}
		</n-tooltip>
	</div>
	<div
		v-else
		class="flex-center cursor-pointer dark:hover:bg-#333"
		:class="contentClassName"
	>
		<slot></slot>
	</div>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({ name: 'HoverContainer' })

const props = defineProps({
	tooltipContent: {
		type: String,
		default: ''
	},
	placement: {
		type: String,
		default: 'top'
	},
	contentClass: {
		type: String,
		default: ''
	},
	inverted: {
		type: Boolean,
		default: false
	}
})
const showTooltip = computed(() => Boolean(props.tooltipContent))

const contentClassName = computed(
	() =>
		`${props.contentClass} ${
			props.inverted ? 'hover:bg-primary' : 'hover:bg-#f6f6f6'
		}`
)
</script>

<style lang="scss" scoped></style>
