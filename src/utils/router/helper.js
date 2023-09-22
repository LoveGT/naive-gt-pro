/**
 * 获取所有固定路由的名称集合
 * @param routes - 固定路由
 */
export function getConstantRouteNames(routes) {
	// return ['root', 'login', 'constant-page', '403', '404', '500', 'not-found']
	return routes.map((route) => getConstantRouteName(route)).flat(1)
}

/**
 * 获取所有固定路由的名称集合
 * @param route - 固定路由
 */
function getConstantRouteName(route) {
	const names = [route.name]
	if (route.children?.length) {
		names.push(
			...route.children.map((item) => getConstantRouteName(item)).flat(1)
		)
	}
	return names
}
