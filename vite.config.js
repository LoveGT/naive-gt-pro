import { defineConfig, loadEnv } from 'vite'
import {
	getRootPath,
	getSrcPath,
	createViteProxy,
	setupVitePlugins
} from './build'
import { getServiceEnvConfig } from './.env-config'
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	const viteEnv = loadEnv(mode, process.cwd())

	const rootPath = getRootPath()
	const srcPath = getSrcPath()

	const isOpenProxy = viteEnv.VITE_HTTP_PROXY === 'Y'
	const envConfig = getServiceEnvConfig(viteEnv)

	return {
		basePath: viteEnv.VITE_BASE_URL,
		resolve: {
			alias: {
				'~': rootPath,
				'@': srcPath
			}
		},
		plugins: setupVitePlugins(viteEnv),
		css: {
			preprocessorOptions: {
				//define global scss variable
				scss: {
					additionalData: `@use "./src/styles/scss/global.scss" as *;`
				}
			}
		},
		server: {
			host: '0.0.0.0',
			port: viteEnv.VITE_PORT,
			open: true,
			proxy: createViteProxy(isOpenProxy, envConfig)
		}
	}
})
