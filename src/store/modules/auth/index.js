import { unref, nextTick } from 'vue'
import { defineStore } from 'pinia'
import { router } from '@/router'
import { useRouterPush } from '@/composables'
import { localStg } from '@/utils'
import { fetchLogin, fetchUserInfo } from '@/service'
import { useTabStore } from '../tab'
import { useRouteStore } from '../route'
import { getToken, getUserInfo, clearAuthStorage } from './helpers'

export const useAuthStore = defineStore('auth-store', {
	state: () => ({
		userInfo: {},
		token: '',
		loginLoading: false
	}),
	getters: {
		isLogin(state) {
			return Boolean(state.token)
		}
	},
	actions: {
		/** 重置auth状态 */
		resetAuthStore() {
			const { toLogin } = useRouterPush(false)
			const { resetTabStore } = useTabStore()
			const { resetRouteStore } = useRouteStore()
			const route = unref(router.currentRoute)

			clearAuthStorage()
			this.$reset()

			if (route.meta.requiresAuth) {
				toLogin()
			}

			nextTick(() => {
				resetTabStore()
				resetRouteStore()
			})
		},
		/**
		 * 处理登录后成功或失败的逻辑
		 * @param backendToken - 返回的token
		 */
		async handleActionAfterLogin(backendToken) {
			const route = useRouteStore()
			const { toLoginRedirect } = useRouterPush(false)

			const loginSuccess = await this.loginByToken(backendToken)

			if (loginSuccess) {
				await route.initAuthRoute()

				// 跳转登录后的地址
				toLoginRedirect()

				// 登录成功弹出欢迎提示
				if (route.isInitAuthRoute) {
					window.$notification?.success({
						title: '登录成功',
						content: `'欢迎回来，${this.userInfo.userName}!'`,
						duration: 3000
					})
				}

				return
			}

			// 不成功则重置状态
			this.resetAuthStore()
		},

		/**
		 * 根据token进行登录
		 * @param backendToken - 返回的token
		 */

		async loginByToken(backendToken) {
			let successFlag = false

			// 先把token存储到缓存中(后面接口的请求头需要token)
			const { token, refreshToken } = backendToken
			localStg.set('token', token)
			localStg.set('refreshToken', refreshToken)

			// 获取用户信息
			const { data } = await fetchUserInfo()
			if (data) {
				// 成功后把用户信息存储到缓存中
				localStg.set('userInfo', data)

				// 更新状态
				this.userInfo = data
				this.token = token

				successFlag = true
			}

			return successFlag
		},

		/**
		 * 登录
		 * @param userName - 用户名
		 * @param password - 密码
		 */
		async login(userName, password) {
			this.loginLoading = true
			const { data } = await fetchLogin(userName, password)
			if (data) {
				await this.handleActionAfterLogin(data)
			}
			this.loginLoading = false
		},
		/**
		 * 更换用户权限(切换账号)
		 * @param userRole
		 */
		async updateUserRole(userRole) {
			const { resetRouteStore, initAuthRoute } = useRouteStore()

			const accounts = {
				super: {
					userName: 'Super',
					password: 'super123'
				},
				admin: {
					userName: 'Admin',
					password: 'admin123'
				},
				user: {
					userName: 'User01',
					password: 'user01123'
				}
			}
			const { userName, password } = accounts[userRole]
			const { data } = await fetchLogin(userName, password)
			if (data) {
				await this.loginByToken(data)
				resetRouteStore()
				initAuthRoute()
			}
		}
	}
})
