<template>
	<n-config-provider class="h-full">
		<NaiveProvider>
			<router-view v-slot="{ Component }">
				<component :is="Component" />
			</router-view>
		</NaiveProvider>
	</n-config-provider>
</template>

<script setup>
import NaiveProvider from './components/common/naive-provider.vue'
</script>

<style scoped></style>
