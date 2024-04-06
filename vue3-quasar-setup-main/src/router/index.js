import { route } from 'quasar/wrappers'
// unplugin-vue-router
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router/auto'
// vite-plugin-vue-layouts
import { setupLayouts } from 'virtual:generated-layouts'
//import routes from './routes'



export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    // routes,
    extendRoutes: (routes) => setupLayouts(routes),
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  return Router
})
