<template>
	<n-divider title-placement="center">主题配置</n-divider>
	<textarea
		id="themeConfigCopyTarget"
		v-model="dataClipboardText"
		class="absolute opacity-0"
	></textarea>
	<n-space vertical>
		<div ref="copyRef" data-clipboard-target="#themeConfigCopyTarget">
			<n-button type="primary" block>拷贝当前配置</n-button>
		</div>
		<n-button type="warning" block @click="handleResetConfig"
			>重置当前配置</n-button
		>
	</n-space>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import Clipboard from 'clipboard'
import { useThemeStore } from '@/store'

defineOptions({ name: 'ThemeConfig' })

const theme = useThemeStore()

const copyRef = ref(null)

const dataClipboardText = ref(getClipboardText())

function getClipboardText() {
	return JSON.stringify(theme.$state)
}

function handleResetConfig() {
	theme.resetThemeStore()
	window.$message?.success('已重置配置，请重新拷贝！')
}

function clipboardEventListener() {
	if (!copyRef.value) return
	const copy = new Clipboard(copyRef.value)
	copy.on('success', () => {
		window.$dialog.success({
			title: '操作成功',
			content: '复制成功,请替换 src/settings/theme.json的内容!',
			positiveText: '确认'
		})
	})
}

const stop = watch(
	() => theme.$state,
	() => {
		dataClipboardText.value = getClipboardText()
	},
	{
		deep: true
	}
)

onMounted(() => {
	console.log('mounted')
	clipboardEventListener()
})
onUnmounted(() => {
	stop()
})
</script>

<style lang="scss" scoped></style>
