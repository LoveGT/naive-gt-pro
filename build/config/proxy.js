/**
 * 设置网络代理
 * @param isOpenProxy - 是否开启代理
 * @param envConfig - env环境配置
 */

export function createViteProxy(isOpenProxy, envConfig) {
	if (!isOpenProxy) return undefined

	const proxy = {
		[envConfig.proxyPattern]: {
			target: envConfig.target,
			changeOrigin: true,
			ws: true,
			pathRewrite: (path) =>
				path.replace(new RegExp(`^${envConfig.proxyPattern}`), '')
		}
	}

	return proxy
}
