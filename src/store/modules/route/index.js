import { defineStore } from 'pinia'
import {
	ROOT_ROUTE,
	constantRoutes,
	router,
	routes as staticRoutes
} from '@/router'
import {
	localStg,
	filterAuthRoutesByUserPermission,
	getCacheRoutes,
	getConstantRouteNames,
	transformAuthRouteToVueRoutes,
	transformAuthRouteToVueRoute,
	transformAuthRouteToMenu,
	transformAuthRouteToSearchMenus,
	transformRouteNameToRoutePath,
	transformRoutePathToRouteName,
	sortRoutes
} from '@/utils'
import { useAuthStore } from '../auth'
import { useTabStore } from '../tab'
import { fetchUserRoutes } from '@/service'

export const useRouteStore = defineStore('route-store', {
	state: () => ({
		authRouteMode: import.meta.env.VITE_AUTH_ROUTE_MODE,
		isInitAuthRoute: false,
		routeHomeName: '',
		menus: [],
		searchMenus: [],
		cacheRoutes: []
	}),
	actions: {
		/** 重置路由的store */
		resetRouteStore() {
			this.resetRoutes()
			this.$reset()
		},
		/** 重置路由数据，保留固定路由 */
		resetRoutes() {
			const routes = router.getRoutes()
			routes.forEach((route) => {
				const name = route.name || 'root'
				if (!this.isConstantRoute(name)) {
					router.removeRoute(name)
				}
			})
		},
		/**
		 * 是否是固定路由
		 * @param name 路由名称
		 */
		isConstantRoute(name) {
			const constantRouteNames = getConstantRouteNames(constantRoutes)
			return constantRouteNames.includes(name)
		},
		/**
		 * 是否是有效的固定路由
		 * @param name 路由名称
		 */
		isValidConstantRoute(name) {
			const NOT_FOUND_PAGE_NAME = 'not-found'
			const constantRouteNames = getConstantRouteNames(constantRoutes)
			return constantRouteNames.includes(name) && name !== NOT_FOUND_PAGE_NAME
		},
		/**
		 * 处理权限路由
		 * @param routes - 权限路由
		 */
		handleAuthRoute(routes) {
			this.menus = transformAuthRouteToMenu(routes)
			this.searchMenus = transformAuthRouteToSearchMenus(routes)

			const vueRoutes = transformAuthRouteToVueRoutes(routes)

			vueRoutes.forEach((route) => {
				router.addRoute(route)
			})

			this.cacheRoutes = getCacheRoutes(vueRoutes)
		},
		/** 动态路由模式下：更新根路由的重定向 */
		handleUpdateRootRedirect(routeKey) {
			if (routeKey === 'root' || routeKey === 'not-found') {
				throw new Error('routeKey的值不能为root或者not-found')
			}
			const rootRoute = {
				...ROOT_ROUTE,
				redirect: transformRouteNameToRoutePath(routeKey)
			}
			const rootRouteName = 'root'
			router.removeRoute(rootRouteName)
			const rootVueRoute = transformAuthRouteToVueRoute(rootRoute)[0]
			router.addRoute(rootVueRoute)
		},
		/** 初始化动态路由 */
		async initDynamicRoute() {
			const { resetAuthStore } = useAuthStore()
			const { initHomeTab } = useTabStore()

			const { userId } = localStg.get('userInfo') || {}

			if (!userId) {
				throw new Error('userId 不能为空!')
			}

			const { error, data } = await fetchUserRoutes(userId)
			if (!error) {
				this.routeHomeName = data.home
				this.handleUpdateRootRedirect(data.home)
				this.handleAuthRoute(sortRoutes(data.routes))

				initHomeTab(data.home, router)

				this.isInitAuthRoute = true
			} else {
				resetAuthStore()
			}
		},
		/** 初始化静态路由 */
		async initStaticRoute() {
			const { initHomeTab } = useTabStore()
			const auth = useAuthStore()

			const routes = filterAuthRoutesByUserPermission(
				staticRoutes,
				auth.userInfo.userRole
			)
			this.handleAuthRoute(routes)

			initHomeTab(this.routeHomeName, router)

			this.isInitAuthRoute = true
		},
		/** 初始化权限路由 */
		async initAuthRoute() {
			if (this.authRouteMode === 'dynamic') {
				await this.initDynamicRoute()
			} else {
				await this.initStaticRoute()
			}
		},

		/** 从缓存路由中去除某个路由 */
		removeCacheRoute(name) {
			const index = this.cacheRoutes.indexOf(name)
			if (index > -1) {
				this.cacheRoutes.splice(index, 1)
			}
		},

		/** 添加某个缓存路由 */
		addCacheRoute(name) {
			const index = this.cacheRoutes.indexOf(name)
			if (index === -1) {
				this.cacheRoutes.push(name)
			}
		}
	}
})
