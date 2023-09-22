<template>
	<div class="vxe-grid-wrapper">
		<vxe-grid
			ref="xGridRef"
			:data="data"
			v-bind="gridOptions"
			class="vxt-grid-table"
		>
			<template #empty>
				<loading-empty-wrapper :empty="data.length"></loading-empty-wrapper>
			</template>
		</vxe-grid>
	</div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { VXETable } from 'vxe-table'
defineOptions({
	name: 'VGridTable'
})

const props = defineProps({
	border: {
		type: String,
		default: 'default' // default（默认）, full（完整边框）, outer（外边框）, inner（内边框）, none（无边框）
	},
	size: {
		type: String,
		default: 'medium' // medium, small, mini
	},
	round: {
		type: Boolean,
		default: false
	},
	align: {
		type: String,
		default: 'center' // 	left（左对齐）, center（居中对齐）, right（右对齐）
	},
	data: {
		type: Array,
		default: () => []
	},
	total: {
		type: Number,
		default: 0
	},
	toolbarConfig: {
		type: Object,
		default: () => ({
			refresh: true,
			// import: true,
			// export: true,
			// print: true,
			zoom: true,
			custom: true
		})
	},
	sortConfig: {
		type: Object,
		default: () => ({
			defaultSort: {
				field: 'age',
				order: 'asc' // asc（升序）,desc（降序）, null
			},
			trigger: 'cell' // default（点击按钮触发）, cell（点击表头触发）
		})
	},
	customConfig: {
		type: Object,
		default: () => ({
			storage: {
				visible: true,
				fixed: true,
				resizable: true
			}
		})
	},
	loadingConfig: {
		type: Object,
		default: () => ({
			icon: 'vxe-icon-indicator roll',
			text: '正在拼命加载中...'
		})
	},
	editConfig: {
		type: Object,
		default: () => ({
			trigger: 'manual', // manual（手动触发方式，只能用于 mode=row）,click（点击触发编辑）,dblclick（双击触发编辑）
			mode: 'row', // cell（单元格编辑模式）,row（行编辑模式）
			showIcon: false, // 是否显示列头编辑图标
			showStatus: true // 是否显示单元格新增与修改状态
			// showUpdateStatus: true, // 是否显示单元格修改状态
			// showInsertStatus: true // 是否显示单元格新增状态
		})
	},
	editRules: {
		type: Object,
		default: () => ({
			age: [
				{ required: true, message: 'app.body.valid.rName' },
				{ min: 3, max: 50, message: '名称长度在 3 到 50 个字符' }
			],
			email: [{ required: true, message: '邮件必须填写' }],
			gender: [{ required: true, message: '角色必须填写' }]
		})
	},
	//	列配置
	columns: {
		type: Array,
		default: () => []
	},
	proxyConfig: {
		type: Object,
		default: () => ({})
	},
	height: [Number, String]
})

const gridOptions = reactive({
	id: 'ID',
	border: props.border,
	round: props.round,
	size: props.size,
	height: props.height,
	align: null,
	loading: false,
	align: props.align,
	keepSource: true,
	// showFooter: true,
	rowConfig: {
		// keyField: 'id', 不设置的话自动生成
		isCurrent: true,
		isHover: true
	},
	checkboxConfig: {
		labelField: '',
		reserve: true,
		highlight: true,
		range: true
	},
	radioConfig: {
		labelField: '',
		reserve: true,
		highlight: true
	},
	sortConfig: props.sortConfig,
	columnConfig: {
		resizable: true,
		isCurrent: true,
		isHover: true
	},
	loadingConfig: props.loadingConfig,
	printConfig: {},
	importConfig: {},
	exportConfig: {},
	toolbarConfig: props.toolbarConfig,
	// formConfig: {
	// 	data: {
	// 		age: '',
	// 		gender: ''
	// 	},
	// 	items: [
	// 		{
	// 			field: 'age',
	// 			title: '年齡',
	// 			itemRender: {},
	// 			slots: { default: 'name_item' }
	// 		},
	// 		{
	// 			field: 'gender',
	// 			title: '性别',
	// 			itemRender: {},
	// 			slots: { default: 'sex_item' }
	// 		},
	// 		{ slots: { default: 'operate_item' } }
	// 	]
	// },
	// 分页配置项
	pagerConfig: {
		enabled: true,
		pageSize: 10
	},
	customConfig: props.customConfig, // 个性化信息配置项
	editConfig: props.editConfig,
	editRules: props.editRules,
	columns: props.columns
})
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
	const $grid = xGridRef.value
	if ($grid) {
		if (type === 'confirm') {
			await $grid.remove(row)
		}
	}
}
</script>

<style lang="scss" scoped>
.vxe-grid-wrapper {
	width: 100%;
	height: 100%;
	// .vxt-grid-table {
	// 	border: 1px solid red;
	// 	height: 100%;
	// 	display: flex;
	// 	flex-direction: column;
	// 	:deep(.vxe-table) {
	// 		border: 1px solid blue;
	// 		height: 100%;
	// 		.vxe-table--render-wrapper,
	// 		.vxe-table--main-wrapper {
	// 			border: 2px solid deeppink;
	// 			height: 100%;
	// 		}
	// 	}
	// }
}
</style>
