import { dataTypeLabels } from '@/constants'

function getDataTypeString(value) {
	return Object.prototype.toString.call(value)
}

export function isNumber(val) {
	return getDataTypeString(val) === dataTypeLabels.number
}

export function isString(val) {
	return getDataTypeString(val) === dataTypeLabels.string
}

export function isBoolean(val) {
	return getDataTypeString(val) === dataTypeLabels.boolean
}

export function isNull(val) {
	return getDataTypeString(val) === dataTypeLabels.null
}

export function isUndefined(val) {
	return getDataTypeString(val) === dataTypeLabels.undefined
}

export function isSymbol(val) {
	return getDataTypeString(val) === dataTypeLabels.symbol
}
export function isBigInt(val) {
	return getDataTypeString(val) === dataTypeLabels.bigInt
}
export function isObject(val) {
	return getDataTypeString(val) === dataTypeLabels.object
}
export function isArray(val) {
	return getDataTypeString(val) === dataTypeLabels.array
}
export function isFunction(val) {
	return getDataTypeString(val) === dataTypeLabels.function
}
export function isDate(val) {
	return getDataTypeString(val) === dataTypeLabels.date
}
export function isRegExp(val) {
	return getDataTypeString(val) === dataTypeLabels.regExp
}
export function isPromise(val) {
	return getDataTypeString(val) === dataTypeLabels.promise
}
export function isSet(val) {
	return getDataTypeString(val) === dataTypeLabels.set
}
export function isMap(val) {
	return getDataTypeString(val) === dataTypeLabels.map
}
export function isFile(val) {
	return getDataTypeString(val) === dataTypeLabels.file
}
