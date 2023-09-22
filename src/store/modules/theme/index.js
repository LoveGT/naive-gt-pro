import { defineStore } from 'pinia'
import { darkTheme } from 'naive-ui'
import { sessionStg } from '@/utils'
import { getNaiveThemeOverrides, initThemeSettings } from './helpers'

export const useThemeStore = defineStore('theme-store', {
	state: () => initThemeSettings(),
	getters: {
		naiveThemeOverrides(state) {
			const overrides = getNaiveThemeOverrides({
				primary: state.themeColor,
				...state.otherColor
			})
			console.log(overrides, 'overrides')
			return overrides
		},
		/** naive-ui暗黑主题 */
		naiveTheme(state) {
			return state.darkMode ? darkTheme : undefined
		},
		/** 页面动画模式 */
		pageAnimateMode(state) {
			return state.page.animate ? state.page.animateMode : undefined
		}
	},
	actions: {
		/** 重置theme状态 */
		resetThemeStore() {
			sessionStg.remove('themeSettings')
			this.$reset()
		},
		/** 缓存主题配置 */
		cacheThemeSettings() {
			const isProd = import.meta.env.PROD
			if (isProd) {
				sessionStg.set('themeSettings', this.$state)
			}
		},
		/** 设置暗黑模式 */
		setDarkMode(darkMode) {
			this.darkMode = darkMode
		},
		/** 设置自动跟随系统主题 */
		setFollowSystemTheme(visible) {
			this.followSystemTheme = visible
		},
		/** 设置自动跟随系统主题 */
		setIsCustomizeDarkModeTransition(isCustomize) {
			this.isCustomizeDarkModeTransition = isCustomize
		},
		/** 自动跟随系统主题 */
		setAutoFollowSystemMode(darkMode) {
			if (this.followSystemTheme) {
				this.darkMode = darkMode
			}
		},
		/** 切换/关闭 暗黑模式 */
		toggleDarkMode() {
			this.darkMode = !this.darkMode
		},
		/** 设置布局最小宽度 */
		setLayoutMinWidth(minWidth) {
			this.layout.minWidth = minWidth
		},
		/** 设置布局模式 */
		setLayoutMode(mode) {
			console.log(mode, 'mode')
			this.layout.mode = mode
		},
		/** 设置滚动模式 */
		setScrollMode(mode) {
			this.scrollMode = mode
		},
		/** 设置侧边栏反转色 */
		setSiderInverted(isInverted) {
			this.sider.inverted = isInverted
		},
		/** 设置头部反转色 */
		setHeaderInverted(isInverted) {
			this.header.inverted = isInverted
		},
		/** 设置系统主题颜色 */
		setThemeColor(themeColor) {
			this.themeColor = themeColor
		},
		/** 设置固定头部和多页签 */
		setIsFixedHeaderAndTab(isFixed) {
			this.fixedHeaderAndTab = isFixed
		},
		/** 设置重载按钮可见状态 */
		setReloadVisible(visible) {
			this.showReload = visible
		},
		/** 设置头部高度 */
		setHeaderHeight(height) {
			if (height) {
				this.header.height = height
			}
		},
		/** 设置头部面包屑可见 */
		setHeaderCrumbVisible(visible) {
			this.header.crumb.visible = visible
		},
		/** 设置头部面包屑图标可见 */
		setHeaderCrumbIconVisible(visible) {
			this.header.crumb.showIcon = visible
		},
		/** 设置多页签可见 */
		setTabVisible(visible) {
			this.tab.visible = visible
		},
		/** 设置多页签高度 */
		setTabHeight(height) {
			if (height) {
				this.tab.height = height
			}
		},
		/** 设置多页签风格 */
		setTabMode(mode) {
			this.tab.mode = mode
		},
		/** 设置多页签缓存 */
		setTabIsCache(isCache) {
			this.tab.isCache = isCache
		},
		/** 侧边栏宽度 */
		setSiderWidth(width) {
			if (width) {
				this.sider.width = width
			}
		},
		/** 侧边栏折叠时的宽度 */
		setSiderCollapsedWidth(width) {
			this.sider.collapsedWidth = width
		},
		/** vertical-mix模式下侧边栏宽度 */
		setMixSiderWidth(width) {
			if (width) {
				this.sider.mixWidth = width
			}
		},
		/** vertical-mix模式下侧边栏折叠时的宽度 */
		setMixSiderCollapsedWidth(width) {
			this.sider.mixCollapsedWidth = width
		},
		/** vertical-mix模式下侧边栏展示子菜单的宽度 */
		setMixSiderChildMenuWidth(width) {
			this.sider.mixChildMenuWidth = width
		},
		/** 设置水平模式的菜单的位置 */
		setHorizontalMenuPosition(position) {
			this.menu.horizontalPosition = position
		},
		/** 设置底部是否显示 */
		setFooterVisible(isVisible) {
			this.footer.visible = isVisible
		},
		/** 设置底部是否固定 */
		setFooterIsFixed(isFixed) {
			this.footer.fixed = isFixed
		},
		/** 设置底部是否固定 */
		setFooterIsRight(right) {
			this.footer.right = right
		},
		/** 设置底部高度 */
		setFooterHeight(height) {
			this.footer.height = height
		},
		/** 设置底部高度 */
		setFooterInverted(inverted) {
			this.footer.inverted = inverted
		},
		/** 设置切换页面时是否过渡动画 */
		setPageIsAnimate(animate) {
			this.page.animate = animate
		},
		/** 设置页面过渡动画类型 */
		setPageAnimateMode(mode) {
			this.page.animateMode = mode
		}
	}
})
