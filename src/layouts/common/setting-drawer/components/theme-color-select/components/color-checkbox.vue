<template>
	<div
		class="flex-center w-20px h-20px rounded-2px shadow cursor-pointer"
		:style="{ backgroundColor: color }"
	>
		<icon-ic-outline-check
			v-if="checked"
			:class="[iconClass, isWhite ? 'text-gray-700' : 'text-white']"
		/>
	</div>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({ name: 'ColorCheckbox' })

const props = defineProps({
	color: { type: String, default: '' },
	checked: { type: Boolean, default: false },
	iconClass: { type: String, default: 'text-14px' }
})

const whiteColors = ['#ffffff', '#fff', 'rgb(255,255,255)']
const isWhite = computed(() => {
	return whiteColors.includes(props.color)
})
</script>

<style lang="scss" scoped></style>
