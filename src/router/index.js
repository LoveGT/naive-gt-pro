import { createRouter, createWebHashHistory } from 'vue-router'
import { basicRoutes as routes } from './routes'

export const router = createRouter({
	history: createWebHashHistory('/'),
	routes,
	scrollBehavior: () => ({ left: 0, top: 0 })
})

/** setup vue router. - [安装vue路由] */
export async function setupRouter(app) {
	app.use(router)
}
