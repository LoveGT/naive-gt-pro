/**
 * * 组件库按需引入插件
 * usage: 直接使用组件,无需在任何地方导入组件
 */
import VueDefineOption from 'unplugin-vue-define-options/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default function unplugin(viteEnv) {
	return [
		VueDefineOption({}),
		Components({
			resolvers: [NaiveUiResolver()]
		})
	]
}
