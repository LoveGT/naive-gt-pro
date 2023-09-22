<template>
	<div
		class="border-2px rounded-6px cursor-pointer hover:border-primary"
		:class="[checked ? 'border-primary' : 'border-transparent']"
	>
		<n-tooltip :placement="activeConfig.placement" trigger="hover">
			<template #trigger>
				<div
					class="layout-checkbox__shadow relative w-56px h-48px bg-white rounded-4px overflow-hidden"
				>
					<div
						class="absolute-lt bg-#273352"
						:class="activeConfig.menuClass"
					></div>
					<div
						class="absolute-rb bg-#f0f2f5"
						:class="activeConfig.mainClass"
					></div>
				</div>
			</template>
			<span>{{ label }}</span>
		</n-tooltip>
	</div>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({ name: 'LayoutCard' })

const props = defineProps({
	/** 布局模式 */
	mode: { type: String, default: '' },
	/** 布局模式文本 */
	label: { type: String, default: '' },
	/** 选中状态 */
	checked: { type: String, default: '' }
})

const layoutConfig = {
	vertical: {
		placement: 'bottom-start',
		headerClass: '',
		menuClass: 'w-1/3 h-full',
		mainClass: 'w-2/3 h-3/4'
	},
	'vertical-mix': {
		placement: 'bottom',
		headerClass: '',
		menuClass: 'w-1/4 h-full',
		mainClass: 'w-2/3 h-3/4'
	},
	horizontal: {
		placement: 'bottom',
		headerClass: '',
		menuClass: 'w-full h-1/4',
		mainClass: 'w-full h-3/4'
	},
	'horizontal-mix': {
		placement: 'bottom-end',
		headerClass: '',
		menuClass: 'w-full h-1/4',
		mainClass: 'w-2/3 h-3/4'
	}
}

const activeConfig = computed(() => layoutConfig[props.mode])
</script>

<style lang="scss" scoped></style>
