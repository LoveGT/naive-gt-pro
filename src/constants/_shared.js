export function transformObjectToOption(obj) {
	return Object.entries(obj).map(([value, label]) => ({
		value,
		label
	}))
}
