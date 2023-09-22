<template>
	<n-divider>系统主题</n-divider>
	<n-grid :x-gap="8" :y-gap="12" :cols="8">
		<n-gi v-for="color in theme.themeColorList" :key="color">
			<color-checkbox
				:color="color"
				:checked="color === theme.themeColor"
				@click="theme.setThemeColor(color)"
			/>
		</n-gi>
	</n-grid>
	<n-space :vertical="true" class="pt-12px">
		<n-color-picker v-model:value="theme.themeColor" :show-alpha="false" />
		<n-button block :type="otherColorType" @click="openModal">
			更多颜色
		</n-button>
	</n-space>
	<color-modal :visible="visible" @close="closeModal" />
</template>

<script setup>
import { computed } from 'vue'
import { isInTraditionColors } from '@/settings'
import { useThemeStore } from '@/store'
import { useBoolean } from '@/hooks'
import { ColorCheckbox, ColorModal } from './components'

defineOptions({ name: 'ThemeColorSelect' })

const theme = useThemeStore()

const isInOther = computed(() => isInTraditionColors(theme.themeColor))

const otherColorType = computed(() => (isInOther.value ? 'primary' : 'default'))

const { bool: visible, setTrue: openModal, setFalse: closeModal } = useBoolean()
</script>

<style lang="scss" scoped></style>
