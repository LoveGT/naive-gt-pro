import { handleModuleRoutes } from '@/utils'

const modules = import.meta.glob('./**/*.js', { eager: true })
export const routes = handleModuleRoutes(modules)
