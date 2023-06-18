import { mockRequest } from '../request'

/**
 * 刷新token
 * @param refreshToken
 */
export function fetchUpdateToken(refreshToken) {
	return mockRequest.post('/updateToken', { refreshToken })
}
