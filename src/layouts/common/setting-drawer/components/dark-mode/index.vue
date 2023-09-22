<template>
	<div>
		<n-divider> 主题模式 </n-divider>
		<n-space size="large" vertical>
			<setting-menu label="深色主题">
				<n-switch v-model:value="theme.darkMode">
					<template #checked>
						<icon-mdi-white-balance-sunny class="text-14px text-white" />
					</template>
					<template #unchecked>
						<icon-mdi-moon-waning-crescent class="text-14px text-white" />
					</template>
				</n-switch>
			</setting-menu>
			<setting-menu label="跟随系统">
				<n-switch v-model:value="theme.followSystemTheme">
					<template #checked>
						<icon-ic-baseline-do-not-disturb class="text-14px text-white" />
					</template>
					<template #unchecked>
						<icon-ic-round-hdr-auto class="text-14px text-white" />
					</template>
				</n-switch>
			</setting-menu>
			<setting-menu label="自定义暗黑主题动画过渡">
				<n-switch v-model:value="theme.isCustomizeDarkModeTransition">
					<template #checked>
						<icon-ic-baseline-do-not-disturb class="text-14px text-white" />
					</template>
					<template #unchecked>
						<icon-ic-round-hdr-auto class="text-14px text-white" />
					</template>
				</n-switch>
			</setting-menu>
			<setting-menu label="侧边栏深色">
				<n-switch v-model:value="theme.sider.inverted"> </n-switch>
			</setting-menu>
			<setting-menu label="头部深色深色">
				<n-switch v-model:value="theme.header.inverted"> </n-switch>
			</setting-menu>
			<setting-menu label="底部深色">
				<n-switch v-model:value="theme.footer.inverted"> </n-switch>
			</setting-menu>
		</n-space>
	</div>
</template>

<script setup>
import { useThemeStore } from '@/store'
import SettingMenu from '../setting-menu/index.vue'

defineOptions({ name: 'DarkMode' })

const theme = useThemeStore()
</script>

<style lang="scss" scoped></style>
