import {
	createRouter,
	createWebHashHistory,
	createWebHistory
} from 'vue-router'
import { constantRoutes } from './routes'
import {
	transformAuthRouteToVueRoutes,
	transformRouteNameToRoutePath
} from '@/utils'
import { createRouterGuard } from './guard'

const { VITE_HASH_ROUTE = 'N', VITE_BASE_URL } = import.meta.env

export const router = createRouter({
	history:
		VITE_HASH_ROUTE === 'Y'
			? createWebHashHistory(VITE_BASE_URL)
			: createWebHistory(VITE_BASE_URL),
	routes: transformAuthRouteToVueRoutes(constantRoutes),
	scrollBehavior: () => ({ left: 0, top: 0 })
})

/** setup vue router. - [安装vue路由] */
export async function setupRouter(app) {
	app.use(router)
	createRouterGuard(router)
	await router.isReady()
}

/** 路由名称 */
export const routeName = (key) => key
/** 路由路径 */
export const routePath = (key) => transformRouteNameToRoutePath(key)

export * from './routes'
export * from './modules'
