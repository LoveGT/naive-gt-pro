/**
 * * 组件库按需引入插件
 * usage: 直接使用组件,无需在任何地方导入组件
 */
import VueDefineOption from 'unplugin-vue-define-options/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import {
	createStyleImportPlugin,
	VxeTableResolve
} from 'vite-plugin-style-import'

export default function unplugin(viteEnv) {
	return [
		VueDefineOption({}),
		Components({
			resolvers: [
				NaiveUiResolver(),
				IconsResolver({
					customCollections: [collectionName],
					componentPrefix: VITE_ICON_PREFIX
				})
			]
		}),
		createSvgIconsPlugin({
			iconDirs: [localIconPath],
			symbolId: `${VITE_ICON_LOCAL_PREFIX}-[dir]-[name]`,
			inject: 'body-last',
			customDomId: '__SVG_ICON_LOCAL__'
		}),
		createStyleImportPlugin({
			resolves: [VxeTableResolve()]
		})
	]
}
