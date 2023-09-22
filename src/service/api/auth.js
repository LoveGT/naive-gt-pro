import { mockRequest } from '../request'

/**
 * 获取验证码
 * @param phone - 手机号
 * @returns - 返回boolean值表示是否发送成功
 */
export function fetchSmsCode(phone) {
	return mockRequest.post('/getSmsCode', { phone: phone })
}

/**
 * 登录
 * @param userName - 用户名
 * @param password - 密码
 */
export function fetchLogin(userName, password) {
	return mockRequest.post('/login', { userName, password })
}

/** 获取用户信息 */
export function fetchUserInfo() {
	return mockRequest.get('/getUserInfo')
}

/**
 * 获取用户路由数据
 * @param userId - 用户id
 * @description 后端根据用户id查询到对应的角色类型，并将路由筛选出对应角色的路由数据返回前端
 */
export function fetchUserRoutes(userId) {
	return mockRequest.post('/getUserRoutes', { userId })
}

/**
 * 刷新token
 * @param refreshToken
 */
export function fetchUpdateToken(refreshToken) {
	return mockRequest.post('/updateToken', { refreshToken })
}
