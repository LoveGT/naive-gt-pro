import qs from 'qs'
import FormData from 'form-data'
import { isArray, isFile } from '../common'

/**
 * 请求数据的转换
 * @param requestData - 请求数据
 * @param contentType - 请求头的Content-Type
 */
export async function transformRequestData(requestData, contentType) {
	// application/json类型不处理
	let data = requestData
	// form类型转换
	if (contentType === 'application/x-www-form-urlencoded') {
		data = qs.stringify(requestData)
	}
	// form-data类型转换
	if (contentType === 'multipart/form-data') {
		data = await handleFormData(requestData)
	}
	return data
}
