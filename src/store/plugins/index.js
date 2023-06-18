import { cloneDeep } from 'lodash-es'
/**
 * setup语法的重置状态插件
 * @param context
 * @description 请将用setup语法的状态id写入到setupSyntaxIds
 */

export function resetSetupStore(context) {
	const setupSyntaxIds = ['setup-store']
	if (setupSyntaxIds.includes(context.store.$id)) {
		const { $state } = context.store

		const defaultStore = cloneDeep($state)

		context.store.$reset = () => {
			context.store.$patch(defaultStore)
		}
	}
}
