import colorJson from './color.json'

/** 中国传统颜色 */
export const traditionColors = colorJson

export function isInTraditionColors(color) {
	return traditionColors.some((item) => {
		const flag = item.data.some((v) => v.color === color)
		return flag
	})
}
