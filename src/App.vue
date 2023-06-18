<template>
	<NaiveProvider>
		<n-space m-50>
			<n-button>Default</n-button>
			<n-button type="tertiary"> Tertiary </n-button>
			<n-button type="primary"> Primary </n-button>
			<n-button type="info"> Info </n-button>
			<n-button type="success"> Success </n-button>
			<n-button type="warning"> Warning </n-button>
			<n-button type="error"> Error </n-button>
		</n-space>
	</NaiveProvider>
</template>

<script setup>
import { onMounted } from 'vue'
import { isNumber, localStorage, sessionStorage } from '@/utils'
import NaiveProvider from './components/common/naive-provider.vue'

onMounted(() => {
	const vueNo = 1
	sessionStorage.set('vueNo', vueNo + 1)
	console.log(isNumber(1))
	$loadingBar.start()
	setTimeout(() => {
		$loadingBar.finish()
		$message.success('加载完成')
		console.log(sessionStorage.get('vueNo'))
	}, 500)
})
</script>

<style scoped></style>
