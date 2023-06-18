import { createApp } from 'vue'
import App from './App.vue'
import { setupAssets } from './plugins'
import { setupRouter } from './router'
import { setupStore } from './store'
async function setupApp() {
	// import assets: js、css
	setupAssets()

	const app = createApp(App)

	// store plugin: pinia
	setupStore(app)

	// vue router
	await setupRouter(app)

	// mount app
	app.mount('#app')
}

setupApp()
