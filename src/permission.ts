import router from './router'
import { useUserStore } from './stores/user'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useAsideStore } from './stores/aside'
const whiteList = ['/login', '/404']
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const userStore = useUserStore()
  const asideStore = useAsideStore()
  const token = userStore.token

  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (asideStore.authMenu.length === 0) {
        await asideStore.getMenu()
        next({ path: to.path, replace: true })
        return
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})
