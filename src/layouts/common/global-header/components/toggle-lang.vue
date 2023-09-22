<template>
	<HoverContainer class="w-40px h-full" :inverted="theme.header.inverted">
		<n-dropdown
			:options="options"
			trigger="hover"
			:value="language"
			@select="handleSelect"
		>
			<icon-cil:language class="text-18px outline-transparent" />
		</n-dropdown>
	</HoverContainer>
</template>

<script setup>
import { ref } from 'vue'
import { useThemeStore } from '@/store'
import { localStg } from '@/utils'

defineOptions({ name: 'ToggleLang' })

const theme = useThemeStore()

const language = ref(localStg.get('lang' || 'zh-CN'))

const options = [
	{
		label: '中文',
		key: 'zh-CN'
	},
	{
		label: 'English',
		key: 'en'
	},
	{
		label: 'ភាសាខ្មែរ',
		key: 'km-KH'
	}
]

const handleSelect = (key) => {
	language.value = key
	localStg.set('lang', key)
}
</script>

<style lang="scss" scoped></style>
