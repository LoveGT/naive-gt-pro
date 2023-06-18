<template>
	<div @click="increment">dashboard...{{ counter }}</div>
	<div @click="changeColor">dashboard...{{ themeColor }}</div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAppStore, useThemeStore } from '@/store'

const appStore = useAppStore()
const { counter } = storeToRefs(appStore)
const increment = () => {
	appStore.increment(11)
}
const themeStore = useThemeStore()
const { themeColor } = storeToRefs(themeStore)
const changeColor = () => {
	themeStore.changeThemeColor()
}
</script>

<style scoped></style>
