import { decrypto, encrypto } from '../crypto'

function createSessionStorage() {
	function set(key, value) {
		const json = encrypto(value)
		window.sessionStorage.setItem(key, json)
	}

	function get(key) {
		const json = window.sessionStorage.getItem(key)
		let storageData = null
		if (json) {
			try {
				storageData = decrypto(json)
			} catch {
				// 防止解析失败
			}
			return storageData
		}
		return null
	}

	function remove(key) {
		window.sessionStorage.removeItem(key)
	}
	function clear() {
		window.sessionStorage.clear()
	}

	return {
		set,
		get,
		remove,
		clear
	}
}

export const sessionStg = createSessionStorage()
