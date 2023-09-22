import XEUtils from 'xe-utils'
import 'vxe-table/styles/cssvar.scss'
import 'vxe-table/lib/style.css'
import zhCN from 'vxe-table/es/locale/lang/zh-CN'
// 导入按需的组件
import {
	// 全局对象
	VXETable,

	// 表格功能
	Filter,
	Edit,
	Menu,
	Export,
	Keyboard,
	Validator,

	// 可选组件
	Icon,
	Column,
	Colgroup,
	Grid,
	Tooltip,
	Toolbar,
	Pager,
	Form,
	FormItem,
	FormGather,
	Checkbox,
	CheckboxGroup,
	Radio,
	RadioGroup,
	RadioButton,
	Switch,
	Input,
	Select,
	Optgroup,
	Option,
	Textarea,
	Button,
	Modal,
	List,
	Pulldown,

	// 表格
	Table
} from 'vxe-table'
export default function setupVXETable(app) {
	// 表格功能
	app.use(Filter).use(Edit).use(Menu).use(Export).use(Keyboard).use(Validator)
	// 可选组件
	app
		.use(Icon)
		.use(Column)
		.use(Colgroup)
		.use(Grid)
		.use(Tooltip)
		.use(Toolbar)
		.use(Pager)
		.use(Form)
		.use(FormItem)
		.use(FormGather)
		.use(Checkbox)
		.use(CheckboxGroup)
		.use(Radio)
		.use(RadioGroup)
		.use(RadioButton)
		.use(Switch)
		.use(Input)
		.use(Select)
		.use(Optgroup)
		.use(Option)
		.use(Textarea)
		.use(Button)
		.use(Modal)
		.use(List)
		.use(Pulldown)

		// 安装表格
		.use(Table)
}
