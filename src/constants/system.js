import { transformObjectToOption } from './_shared'
export const themeLayoutModelLabel = {
	vertical: '左侧菜单模式',
	horizontal: '顶部菜单模式',
	'vertical-mix': '左侧菜单混合模式',
	'horizontal-mix': '顶部菜单混合模式'
}

export const themeLayoutModeOptions = transformObjectToOption(
	themeLayoutModelLabel
)

export const themeScrollModeLabels = {
	wrapper: '外层滚动',
	content: '主体滚动'
}
export const themeScrollModeOptions = transformObjectToOption(
	themeScrollModeLabels
)

export const themeTabModeLabels = {
	chrome: '谷歌风格',
	button: '按钮风格'
}
export const themeTabModeOptions = transformObjectToOption(themeTabModeLabels)

export const themeHorizontalMenuPositionLabels = {
	'flex-start': '居左',
	center: '居中',
	'flex-end': '居右'
}
export const themeHorizontalMenuPositionOptions = transformObjectToOption(
	themeHorizontalMenuPositionLabels
)

export const themeAnimateModeLabels = {
	'zoom-fade': '渐变',
	'zoom-out': '闪现',
	'fade-slide': '滑动',
	fade: '消退',
	'fade-bottom': '底部消退',
	'fade-scale': '缩放消退'
}
export const themeAnimateModeOptions = transformObjectToOption(
	themeAnimateModeLabels
)
