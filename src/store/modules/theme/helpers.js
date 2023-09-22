import { cloneDeep } from 'lodash-es'
import { themeSetting } from '@/settings'
import { sessionStg, addColorAlpha, getColorPalette } from '@/utils'

export function initThemeSettings() {
	const isProd = import.meta.env.PROD
	// 生产环境才缓存主题配置，本地开发实时调整配置更改配置的json
	const storageSettings = sessionStg.get('themeSettings')

	if (isProd && storageSettings) {
		return sessionStg
	}

	const themeColor = sessionStg.get('themColor') || themeSetting.themeColor
	const info = themeSetting.isCustomizeInfoColor
		? themeSetting.otherColor.info
		: getColorPalette(themeColor, 7)
	const otherColor = { ...themeSetting.otherColor, info }
	const setting = cloneDeep({ ...themeSetting, themeColor, otherColor })
	return setting
}

/** 获取主题颜色的各种场景对应的颜色 */
function getThemeColors(colors) {
	console.log(colors, 'getThemeColors')
	const colorActions = [
		{ scene: '', handler: (color) => color },
		{ scene: 'Suppl', handler: (color) => color },
		{ scene: 'Hover', handler: (color) => getColorPalette(color, 5) },
		{ scene: 'Pressed', handler: (color) => getColorPalette(color, 7) },
		{ scene: 'Active', handler: (color) => addColorAlpha(color, 0.1) }
	]

	const themeColor = []
	colors.forEach((color) => {
		colorActions.forEach((action) => {
			const [colorType, colorValue] = color
			const colorKey = `${colorType}Color${action.scene}`
			themeColor[colorKey] = action.handler(colorValue)
		})
	})
	return themeColor
}

/** 获取naive的主题颜色 */
export function getNaiveThemeOverrides(colors) {
	console.log(colors, 'sssss')
	const { primary, success, warning, error } = colors
	const info = themeSetting.isCustomizeInfoColor
		? colors.info
		: getColorPalette(primary, 7)
	const themeColors = getThemeColors([
		['primary', primary],
		['info', info],
		['success', success],
		['warning', warning],
		['error', error]
	])

	const colorLoading = primary

	return {
		common: {
			...themeColors
		},
		LoadingBar: {
			colorLoading
		}
	}
}
