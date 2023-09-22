import axios from 'axios'
import { REFRESH_TOKEN_CODE } from '@/config'
import {
	localStg,
	transformRequestData,
	handleAxiosError,
	handleServiceResult,
	handleBackendError,
	handleResponseError
} from '@/utils'
import { handleRefreshToken } from './helper'

/**
 * 封装axios请求类
 * @author GaoTao<gaotao166888@gmail.com>
 */
export default class CustomerInstance {
	/**
	 *
	 * @param axiosConfig - axios配置
	 * @param backendConfig - 后端返回的数据配置
	 */
	constructor(
		axiosConfig,
		backendConfig = {
			codeKey: 'code',
			dataKey: 'data',
			msgKey: 'message',
			successCode: 200
		}
	) {
		this.backendConfig = backendConfig
		this.instance = axios.create(axiosConfig)
		this.setInterceptor()
	}

	/** 设置请求拦截器 */
	setInterceptor() {
		this.instance.interceptors.request.use(
			async (config) => {
				const handleConfig = { ...config }
				if (handleConfig.headers) {
					// 数据转换
					const contentType = config.headers['Content-Type']
					handleConfig.data = await transformRequestData(handleConfig.data)
					// 设置token
					handleConfig.headers.Authorization = localStg.get('token') || ''
				}
				return handleConfig
			},
			(axiosError) => {
				const error = handleAxiosError(axiosError)
				return handleServiceResult(error, null)
			}
		)
		this.instance.interceptors.response.use(
			async (response) => {
				const { status } = response
				if (status === 200 || status < 300 || status === 304) {
					const backend = response.data
					const { codeKey, dataKey, successCode } = this.backendConfig
					// 请求成功
					if (backend[codeKey] === successCode) {
						return handleServiceResult(null, backend[dataKey])
					}

					// token失效，刷新token
					if (REFRESH_TOKEN_CODE) {
						const config = await handleRefreshToken(response.config)
						if (config) {
							return this.instance.request(config)
						}
					}
					const error = handleBackendError(backend, this.backendConfig)
					return handleServiceResult(error, null)
				}
				const error = handleResponseError(response)
				return handleServiceResult(error, null)
			},
			(axiosError) => {
				const error = handleAxiosError(axiosError)
				return handleServiceResult(error, null)
			}
		)
	}
}
