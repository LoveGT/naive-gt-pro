<template>
	<n-dropdown
		:show="dropdownVisible"
		:options="options"
		placement="bottom-start"
		:x="x"
		:y="y"
		@clickoutside="hide"
		@select="handleDropdown"
	/>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore, useTabStore } from '@/store'
import { useIconRender } from '@/composables'

defineOptions({ name: 'ContextMenu' })

const props = defineProps({
	visible: {
		type: Boolean,
		default: false
	},
	currentPath: {
		type: String,
		default: ''
	}
})

const emit = defineEmits(['update:visible'])

const app = useAppStore()
const tab = useTabStore()
const { iconRender } = useIconRender()

const dropdownVisible = computed({
	get() {
		return props.visible
	},
	set(visible) {
		emit('update:visible', visible)
	}
})

function hide() {
	dropdownVisible.value = false
}
const options = computed(() => [
	{
		label: '内容全屏',
		key: 'full-content',
		icon: iconRender({ icon: 'gridicons-fullscreen' })
	},
	{
		label: '重新加载',
		key: 'reload-current',
		disabled: props.currentPath !== tab.activeTab,
		icon: iconRender({ icon: 'ant-design:reload-outlined' })
	},
	{
		label: '关闭',
		key: 'close-current',
		disabled:
			props.currentPath === tab.homeTab.fullPath || Boolean(props.affix),
		icon: iconRender({ icon: 'ant-design:close-outlined' })
	},
	{
		label: '关闭其他',
		key: 'close-other',
		icon: iconRender({ icon: 'ant-design:column-width-outlined' })
	},
	{
		label: '关闭左侧',
		key: 'close-left',
		icon: iconRender({ icon: 'mdi:format-horizontal-align-left' })
	},
	{
		label: '关闭右侧',
		key: 'close-right',
		icon: iconRender({ icon: 'mdi:format-horizontal-align-right' })
	},
	{
		label: '关闭所有',
		key: 'close-all',
		icon: iconRender({ icon: 'ant-design:line-outlined' })
	}
])
</script>

<style lang="scss" scoped></style>
