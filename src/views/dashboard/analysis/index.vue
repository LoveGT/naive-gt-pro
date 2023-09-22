<template>
	<div class="h-full overflow-hidden flex flex-col">
		<div>
			<icon-mdi-emoticon class="text-24px text-red" />
			<icon-mdi:emoticon style="font-size: 24px; color: #f00" />
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { fetchUserList } from '@/service'
import { useLoading } from '@/hooks'

defineOptions({
	name: 'DashboardAnalysis'
})
const { loading, startLoading, endLoading } = useLoading()
const userList = ref([])
// 获取用户列表数据
const getUserList = async () => {
	startLoading()
	return await fetchUserList().then((res) => {
		return {
			result: res.data,
			total: res.data.length
		}
	})
}

const handleQuery = (data) => {
	console.log(data, 'data')
}

const xGridRef = ref(null)
const hasActiveEditRow = (row) => {
	const $grid = xGridRef.value
	if ($grid) {
		return $grid.isEditByRow(row)
	}
	return false
}

const editRowEvent = (row) => {
	const $grid = xGridRef.value
	if ($grid) {
		$grid.setEditRow(row)
	}
}

const clearRowEvent = () => {
	const $grid = xGridRef.value
	if ($grid) {
		$grid.clearEdit()
	}
}

const saveRowEvent = async (row) => {
	const $grid = xGridRef.value
	if ($grid) {
		await $grid.clearEdit()
		gridOptions.loading = true
		// 模拟异步保存
		setTimeout(() => {
			gridOptions.loading = false
			VXETable.modal.message({
				content: `${JSON.stringify(row)}`,
				status: 'success'
			})
		}, 300)
	}
}

const removeRowEvent = async (row) => {
	const type = await VXETable.modal.confirm('您确定要删除该数据?')
	const $grid = xGrid.value
	if ($grid) {
		if (type === 'confirm') {
			await $grid.remove(row)
		}
	}
}
const gridOptions = reactive({
	border: true,
	round: true,
	size: 'large',
	height: 'auto',
	align: null,
	loading: false,
	align: 'center',
	// showFooter: true,
	rowConfig: {
		keyField: 'id',
		isCurrent: true,
		isHover: true
	},
	checkboxConfig: {
		reserve: true
	},
	sortConfig: {
		trigger: 'cell'
		// remote: true
	},
	columnConfig: {
		resizable: true,
		isCurrent: true,
		isHover: true
	},
	loadingConfig: { icon: 'vxe-icon-indicator roll', text: '正在拼命加载中...' },
	printConfig: {},
	importConfig: {},
	exportConfig: {},
	toolbarConfig: {
		refresh: true,
		import: true,
		export: true,
		print: true,
		zoom: true,
		custom: true,
		slots: {
			buttons: 'toolbar_buttons'
		}
	},
	// 右鍵菜单功能配置项
	// menuConfig: {
	// 	enabled: true,
	// 	body: {
	// 		options: [
	// 			[
	// 				{
	// 					code: 'copy',
	// 					name: '复制内容',
	// 					prefixIcon: 'vxe-icon-copy',
	// 					visible: true,
	// 					disabled: false
	// 				},
	// 				{ code: 'clear', name: '清除内容', visible: true, disabled: false },
	// 				{ code: 'reload', name: '刷新表格', visible: true, disabled: false }
	// 			],
	// 			[
	// 				{
	// 					code: 'myPrint',
	// 					name: '打印',
	// 					prefixIcon: 'vxe-icon-print',
	// 					visible: true,
	// 					disabled: false
	// 				},
	// 				{
	// 					code: 'myExport',
	// 					name: '导出.csv',
	// 					prefixIcon: 'vxe-icon-download',
	// 					visible: true,
	// 					disabled: false
	// 				}
	// 			]
	// 		]
	// 	}
	// },
	formConfig: {
		data: {
			age: '',
			gender: ''
		},
		items: [
			{
				field: 'age',
				title: '年齡',
				itemRender: {},
				slots: { default: 'name_item' }
			},
			{
				field: 'gender',
				title: '性别',
				itemRender: {},
				slots: { default: 'sex_item' }
			},
			{
				slots: {
					default: ({ row }) => {
						return '详情'
					}
				}
			}
		]
	},
	pagerConfig: {
		enabled: true,
		pageSize: 10
	},
	editConfig: {
		trigger: 'click',
		mode: 'row'
		// showStatus: true
	},
	editRules: {
		age: [
			{ required: true, message: 'app.body.valid.rName' },
			{ min: 3, max: 50, message: '名称长度在 3 到 50 个字符' }
		],
		email: [{ required: true, message: '邮件必须填写' }],
		gender: [{ required: true, message: '角色必须填写' }]
	},
	columns: [
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
			slots: { default: 'operate' }
		}
	],
	proxyConfig: {
		props: {
			result: 'result',
			total: 'total'
		},
		ajax: {
			// 接收 Promise
			query: async ({ page, form }) => {
				console.log(page, 'page')
				console.log(form, 'form')
				return await getUserList()
			}
		}
	}
})
const tablePage = reactive({
	total: 10,
	currentPage: 1,
	pageSize: 100
})
const sexList = ref([])

// 异步更新下拉选项
setTimeout(() => {
	sexList.value = [
		{ value: '1', label: '男' },
		{ value: '0', label: '女' }
	]
})

const onClearData = () => {
	loading.value = true
	setTimeout(() => {
		gridOptions.data = []
		loading.value = false
	}, 1500)
}
const onRollBackData = () => {
	getUserList()
}
</script>
