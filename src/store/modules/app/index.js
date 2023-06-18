import { defineStore } from 'pinia'

export const useAppStore = defineStore('app-store', {
	state: () => ({
		counter: 0
	}),
	actions: {
		increment(n) {
			this.counter += n
		},
		decrement(n) {
			this.counter -= n
		}
	}
})
