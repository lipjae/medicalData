import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */{ store }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach(async (to, from, next) => {
    const isInitAuth = store.state.auth.initComplete

    if(!isInitAuth) {
      await store.dispatch('auth/initAuth')
      console.log('auth init !!')
    }
    
    const isLogin = store.state.auth.isLogin
    
    const { requireAuth } = to.meta

    if(requireAuth) {

      if(isLogin) {
        next()
      } else {
        next({ name: 'Login'})
      }

    } else {

      if(isLogin && to.name == 'Login'){
        next({ name: 'Admin'})
      } else {
        next()
      }
    }
  })

  return Router
})
