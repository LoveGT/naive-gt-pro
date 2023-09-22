<template>
	<div class="relative flex-center wh-full bg-#646cff">
		<n-card
			:bordered="false"
			size="large"
			class="z-4 !w-auto rounded-20px shadow-sm"
		>
			<header class="flex-center justify-between">
				<SystemLogo class="text-64px text-#646cff"></SystemLogo>
				<n-gradient-text type="primary" :size="28"
					>Soybean管理系统</n-gradient-text
				>
			</header>
			<main class="pt-24px">
				<h3 class="text-18px text-#646cff font-medium">密码登录</h3>
				<p class="pt-24px">
					<transition name="fade-slide" mode="out-in" appear>
						<component :is="activeModule.component"></component>
					</transition>
				</p>
			</main>
		</n-card>
	</div>
</template>

<script setup>
import { computed } from 'vue'
import { loginModuleLabels } from '@/constants'
import { PwdLogin } from './components'

defineOptions({
	name: 'AppLogin'
})
const props = defineProps({
	module: { type: String, default: '' }
})
const modules = [
	{
		key: 'pwd-login',
		label: loginModuleLabels['pwd-login'],
		component: PwdLogin
	}
	// { key: 'code-login', label: loginModuleLabels['code-login'], component: CodeLogin },
	// { key: 'register', label: loginModuleLabels.register, component: Register },
	// { key: 'reset-pwd', label: loginModuleLabels['reset-pwd'], component: ResetPwd },
	// { key: 'bind-wechat', label: loginModuleLabels['bind-wechat'], component: BindWechat }
]

const activeModule = computed(() => {
	const active = { ...modules[0] }
	const findItem = modules.find((item) => (item.key = props.module))
	if (findItem) {
		Object.assign(active, findItem)
	}
	return active
})
</script>

<style lang="scss" scoped></style>
