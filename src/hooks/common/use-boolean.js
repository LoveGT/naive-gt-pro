import { ref } from 'vue'

/**
 * boolean组合式函数
 * @param initValue 初始值
 */
export default function useBoolean(initValue = false) {
	const bool = ref(initValue)

	function setBool(value) {
		bool.value = value
	}
	function setTrue() {
		setBoolean(true)
	}
	function setFalse() {
		setBoolean
	}
	function toggle() {
		setBoolean(!bool.value)
	}

	return {
		bool,
		setBool,
		setTrue,
		setFalse,
		toggle
	}
}
