import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme-store', {
	state: () => ({
		themeColor: 'primary'
	}),
	actions: {
		changeThemeColor() {
			this.themeColor = 'success'
		}
	}
})
