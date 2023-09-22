<template>
	<div class="flex flex-col">
		<n-form
			ref="formRef"
			inline
			:label-width="80"
			:model="formValue"
			:rules="rules"
			:size="size"
		>
			<n-form-item label="姓名" path="user.name">
				<n-input v-model:value="formValue.user.name" placeholder="输入姓名" />
			</n-form-item>
			<n-form-item label="年龄" path="user.age">
				<n-input v-model:value="formValue.user.age" placeholder="输入年龄" />
			</n-form-item>
			<n-form-item label="电话号码" path="phone">
				<n-input v-model:value="formValue.phone" placeholder="电话号码" />
			</n-form-item>
			<n-form-item>
				<n-button attr-type="button" @click="handleValidateClick">
					验证
				</n-button>
			</n-form-item>
		</n-form>
		<div class="h-full">
			<VxeGridTable
				flex="1"
				height="400"
				:columns="columns"
				:toolbar-config="toolbarConfig"
				:data="listData"
				:total="total"
			></VxeGridTable>
		</div>
	</div>
</template>

<script lang="jsx" setup>
import VxeGridTable from '@/components/common/vxe-grid-table.vue'
import { fetchUserList } from '@/service'
import { useLoading } from '@/hooks'
import { ref, reactive, onMounted } from 'vue'

const rules = ref({})
const formValue = ref({
	user: {
		name: '',
		age: ''
	},
	phone: ''
})
const size = ref('medium')
// const proxyConfig = {
// 	props: {
// 		result: 'result',
// 		total: 'total'
// 	},
// 	ajax: {
// 		// 接收 Promise
// 		query: async ({ page }) => {
// 			console.log(page, 'page')
// 			return await getUserList()
// 		},
// 		delete: async ({ body }) => {
// 			console.log('删除', body)
// 		},
// 		save: async ({ body }) => {
// 			console.log('新增', body)
// 		}
// 	}
// }
const toolbarConfig = reactive({
	slots: {
		buttons: (params) => {
			return [
				<n-button onClick={() => handleAdd(params)} type="primary">
					Primary
				</n-button>
			]
		}
	},
	// buttons: [
	// 	{
	// 		code: 'insert_actived',
	// 		name: '新增'
	// 		// buttonRender: {
	// 		// 	name: '$input'
	// 		// }
	// 	},
	// 	{ code: 'delete', name: '直接删除' },
	// 	{ code: 'reload', name: '刷新' },
	// 	{ code: 'save', name: '保存', status: 'success' }
	// ],
	refresh: true,
	custom: {
		// allowFixed: true,
		// trigger: 'hover'
	}
})
const handleAdd = () => {
	console.log(1111)
}
const columns = [
	{ type: 'radio', width: 60, fixed: 'left' },
	{ type: 'checkbox', width: 60, fixed: 'left' },
	{ type: 'seq', width: 60, fixed: 'left' },
	{
		field: 'id',
		title: 'ID',
		minWidth: '200',
		showOverflow: 'title',
		editRender: { enabled: true, name: '$input' }
	},
	{
		field: 'age',
		title: '年龄',
		minWidth: '200',
		sortable: true,
		editRender: { enabled: true, name: '$input' }
	},
	{
		field: 'email',
		title: '邮箱',
		minWidth: '200',
		showOverflow: 'title',
		editRender: { enabled: true, name: '$input' }
	},
	{
		field: 'gender',
		title: '性别',
		minWidth: '200',
		editRender: { enabled: true, name: '$input' }
	},
	{
		field: 'phone',
		title: '联系方式',
		minWidth: '200',
		editRender: { enabled: true, name: '$input' }
	},
	{
		field: 'userName',
		title: '用户姓名',
		minWidth: '200',
		editRender: { enabled: true, name: '$input' }
	},
	{
		field: 'userStatus',
		title: '用户状态',
		minWidth: '200',
		editRender: { enabled: true, name: '$input' }
	},
	{
		title: '操作',
		width: 200,
		fixed: 'right',
		align: 'center',
		slots: {
			default: ({ row }) => {
				return [
					<n-button-group>
						<n-button type="primary" size="small">
							编辑
						</n-button>
						<n-button type="error" size="small">
							删除
						</n-button>
						<n-button type="warning" size="small">
							详情
						</n-button>
					</n-button-group>
				]
			}
		}
		// slots: { default: 'operate' }
	}
]
const { loading, startLoading, endLoading } = useLoading()

const listData = ref([])
const total = ref(0)
// 获取用户列表数据
const getUserList = async () => {
	startLoading()
	const res = await fetchUserList()
	listData.value = res.data
	total.value = listData.value.length
	endLoading()
}
onMounted(() => {
	getUserList()
})
</script>

<style lang="scss" scoped></style>
