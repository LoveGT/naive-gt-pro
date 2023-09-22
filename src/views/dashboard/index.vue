<template>
	<div class="admin-layout-demo h-full">
		<div class="mt-5px flex-x-center">
			<icon-local-activity class="text-40px text-success" />
		</div>
		<div class="grid grid-cols-10">
			<div
				v-for="(fileName, index) in localIcons"
				:key="index"
				class="mt-5px flex-x-center"
			>
				<svg-icon :local-icon="fileName" class="text-30px text-blue" />
			</div>
		</div>
		<div class="grid grid-cols-10">
			<template v-for="item in icons" :key="item">
				<div class="mt-5px flex-x-center">
					<svg-icon :icon="item" class="text-30px" />
				</div>
			</template>
		</div>
		<n-input-group>
			<n-input v-model:value="phone" :style="{ width: '50%' }" />
			<n-button :loading="loading" type="primary" ghost @click="getSmsCode">
				发送验证码
			</n-button>
		</n-input-group>
		<div>
			<vxe-toolbar>
				<template #buttons>
					<vxe-button @click="allAlign = 'left'">居左</vxe-button>
					<vxe-button @click="allAlign = 'center'">居中</vxe-button>
					<vxe-button @click="allAlign = 'right'">居右</vxe-button>
				</template>
			</vxe-toolbar>

			<vxe-table border :align="allAlign" :data="tableData">
				<vxe-column type="seq" width="60"></vxe-column>
				<vxe-column field="name" title="Name"></vxe-column>
				<vxe-column field="sex" title="Sex"></vxe-column>
				<vxe-column field="age" title="Age"></vxe-column>
			</vxe-table>
		</div>
		<system-logo></system-logo>
		<hover-container tooltip-content="hello Vue">
			<span>vue3是世界上最好的语言</span>
		</hover-container>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { AdminLayout, PageTab } from '@soybeanjs/vue-materials'
import '@soybeanjs/vue-materials/dist/style.css'
import ChromeTabBg from './chrome-tab-bg.vue'
import SystemLogo from '@/components/common/system-logo.vue'
import HoverContainer from '@/components/common/hover-container.vue'
import { icons } from './icons'
import { fetchSmsCode } from '@/serviece'
import { REGEXP_PHONE } from '@/config'
import { useLoading } from '@/hooks/common'
defineOptions({
	name: 'AdminLayout'
})

const allAlign = ref('center')
const tableData = ref([
	{
		id: 10001,
		name: 'Test1',
		role: 'Develop',
		sex: 'Man',
		age: 28,
		address: 'test abc'
	},
	{
		id: 10002,
		name: 'Test2',
		role: 'Test',
		sex: 'Women',
		age: 22,
		address: 'Guangzhou'
	},
	{
		id: 10003,
		name: 'Test3',
		role: 'PM',
		sex: 'Man',
		age: 32,
		address: 'Shanghai'
	},
	{
		id: 10004,
		name: 'Test4',
		role: 'Designer',
		sex: 'Women',
		age: 24,
		address: 'Shanghai'
	}
])
const localIcons = [
	'custom-icon',
	'activity',
	'at-sign',
	'cast',
	'chrome',
	'copy',
	'wind'
]
/** 判断手机号码格式是否正确 */
const isPhoneValid = () => {
	let valid = true
	if (phone.value.trim() === '') {
		window.$message.error('手机号码不能为空')
		valid = false
	} else if (!REGEXP_PHONE.test(phone.value)) {
		window.$message.error('手机格式错误')
		valid = false
	}
	return valid
}
const { loading, startLoading, endLoading } = useLoading()
const phone = ref(null)
const getSmsCode = async () => {
	const valid = isPhoneValid(phone.value)
	if (!valid || loading.value) return
	startLoading()
	const { data } = await fetchSmsCode(phone.value)
	endLoading()
}
</script>

<style scoped lang="scss"></style>
