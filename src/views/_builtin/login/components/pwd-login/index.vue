<template>
	<n-form
		ref="formRef"
		:model="model"
		:rules="rules"
		size="large"
		:show-label="false"
	>
		<n-form-item path="userName">
			<n-input
				v-model:value="model.userName"
				placeholder="请输入用户名"
			></n-input>
		</n-form-item>
		<n-form-item path="password">
			<n-input
				v-model:value="model.password"
				placeholder="请输入密码"
			></n-input>
		</n-form-item>
		<n-space :vertical="true" :size="24">
			<div class="flex-y-center justify-between">
				<n-checkbox>记住我</n-checkbox>
				<n-button :text="true">忘记密码？</n-button>
			</div>
			<n-button
				type="primary"
				size="large"
				:round="true"
				:block="true"
				:loading="auth.loginLoading"
				@click="handleSubmit"
			>
				确定
			</n-button>
		</n-space>
	</n-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/store'
import { useRouterPush } from '@/composables'

defineOptions({
	name: 'PwdLogin'
})

const auth = useAuthStore()
const { login } = useAuthStore()
const { toLoginModule } = useRouterPush()

const formRef = ref(null)
const model = reactive({
	userName: 'Soybean',
	password: 'soybean123'
})

const rules = {}

const handleSubmit = async () => {
	const { userName, password } = model
	login(userName, password)
}
</script>

<style scoped></style>
