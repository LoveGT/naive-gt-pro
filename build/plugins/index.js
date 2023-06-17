import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import progress from 'vite-plugin-progress'
import visualizer from './visualizer'
import compress from './compress'
import pwa from './pwa'
import unplugin from './unplugin'

/**
 * vite插件
 * @param viteEnv - 环境变量配置
 */
export function setupVitePlugins(viteEnv) {
	const plugins = [vue(), vueJsx(), ...unplugin(viteEnv), UnoCSS(), progress()]
	if (viteEnv.VITE_VISUALIZER === 'Y') {
		plugins.push(visualizer)
	}
	if (viteEnv.VITE_COMPRESS === 'Y') {
		plugins.push(compress(viteEnv))
	}
	if (viteEnv.VITE_PWA === 'Y' || viteEnv.VITE_VERCEL === 'Y') {
		plugins.push(pwa())
	}
	return plugins
}
