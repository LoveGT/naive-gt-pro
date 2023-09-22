import UAParser from 'ua-parser-js'
import { useAuthStore } from '@/store'
import { isArray, isString } from '@/utils'

/** 获取设备信息 */
export function useDeviceInfo() {
	const parser = new UAParser()
	const result = parser.getResult()
	return result
}

/** 权限判断 */
export function usePermission() {
	const auth = useAuthStore()

	function hasPermission(permission) {
		const { userRole } = auth.userInfo

		let has = userRole === 'super'
		if (!has) {
			if (isArray(permission)) {
				has = permission.includes(userRole)
			}
			if (isString(permission)) {
				has = permission === userRole
			}
		}
		return has
	}

	return {
		hasPermission
	}
}
