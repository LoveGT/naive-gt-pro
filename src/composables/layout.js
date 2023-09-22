import { computed, watch } from 'vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useAppStore, useThemeStore } from '@/store'

export function useBasicLayout() {
	const app = useAppStore()
	const theme = useThemeStore()
	const breakpoints = useBreakpoints(breakpointsTailwind)

	const mode = computed(() => {
		const vertical = 'vertical'
		const horizontal = 'horizontal'
		return theme.layout.mode.includes(vertical) ? vertical : horizontal
	})

	const isMobile = breakpoints.smaller('sm')

	const layoutHeaderProps = {
		vertical: {
			showLogo: false,
			showHeaderMenu: false,
			showMenuCollapse: true
		},
		'vertical-mix': {
			showLogo: false,
			showHeaderMenu: false,
			showMenuCollapse: false
		},
		horizontal: {
			showLogo: true,
			showHeaderMenu: true,
			showMenuCollapse: false
		},
		'horizontal-mix': {
			showLogo: true,
			showHeaderMenu: false,
			showMenuCollapse: true
		}
	}

	const headerProps = computed(() => layoutHeaderProps[theme.layout.mode])

	const siderVisible = computed(() => theme.layout.mode !== 'horizontal')
	const siderWidth = computed(() => {
		const { width, mixWidth, mixChildMenuWidth } = theme.sider
		const isVerticalMix = theme.layout.mode === 'vertical-mix'
		let w = isVerticalMix ? mixWidth : width
		if (isVerticalMix && app.mixSiderFixed) {
			w += mixChildMenuWidth
		}
		return w
	})
	const siderCollapsedWidth = computed(() => {
		const { collapsedWidth, mixCollapsedWidth, mixChildMenuWidth } = theme.sider
		const isVerticalMix = theme.layout.mode === 'vertical-mix'
		let w = isVerticalMix ? mixCollapsedWidth : collapsedWidth
		if (isVerticalMix && app.mixSiderFixed) {
			w += mixChildMenuWidth
		}
		return w
	})

	watch(
		isMobile,
		(newValue) => {
			if (newValue) {
				app.setSiderCollapse(true)
			}
		},
		{ immediate: true }
	)

	return {
		mode,
		isMobile,
		headerProps,
		siderVisible,
		siderWidth,
		siderCollapsedWidth
	}
}
