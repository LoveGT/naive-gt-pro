/** 统一失败和成功的请求结果的数据类型 */
export async function handleServiceResult(error, data) {
	if (error) {
		const fail = {
			error,
			data: null
		}
		return fail
	}
	const success = {
		error: null,
		data
	}
	return success
}
