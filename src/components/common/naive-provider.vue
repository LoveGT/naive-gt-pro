<template>
	<n-loading-bar-provider>
		<n-dialog-provider>
			<n-notification-provider>
				<n-message-provider>
					<slot></slot>
					<naive-provider-content />
				</n-message-provider>
			</n-notification-provider>
		</n-dialog-provider>
	</n-loading-bar-provider>
</template>

<script setup>
import { defineComponent, h } from 'vue'
import { useDialog, useLoadingBar, useMessage, useNotification } from 'naive-ui'

defineOptions({ name: 'NaiveProvider' })
/**
 * js 文件下使用这个做类型提示
 * @type import('naive-ui').GlobalThemeOverrides
 */
// const themeOverrides = {
// 	common: {
// 		primaryColor: '#316C72FF',
// 		primaryColorHover: '#316C72E3',
// 		primaryColorPressed: '#2B4C59FF',
// 		primaryColorSuppl: '#316C7263'
// 	}
// }

// 挂载naive组件的方法至window, 以便在路由钩子函数和请求函数里面调用
function registerNaiveTools() {
	window.$loadingBar = useLoadingBar()
	window.$dialog = useDialog()
	window.$message = useMessage()
	window.$notification = useNotification()
}

const NaiveProviderContent = defineComponent({
	name: 'NaiveProviderContent',
	setup() {
		registerNaiveTools()
	},
	render() {
		return h('div')
	}
})
</script>

<style scoped></style>
