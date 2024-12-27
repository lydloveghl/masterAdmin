import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAuthMenuApi } from '@/api/auth'
import type { AuthList } from '@/types/auth'
import router from '@/router'
function view(path: string) {
  const modules = import.meta.glob('../**/*.vue')
  return modules['../views/' + path.replace('@/views/', '')]
}
export const useAsideStore = defineStore('aside', () => {
  const isCollapse = ref(true)
  const authMenu = ref([] as AuthList[])
  const getMenu = async () => {
    const res = await getAuthMenuApi()
    authMenu.value = res.data.data
    res.data.data.forEach((oneMenu: AuthList, onel: number) => {
      if (oneMenu.children && oneMenu.children.length > 0) {
        oneMenu.children.forEach((twoMenu: any, twol: number) => {
          router.addRoute('layout', {
            name: `adminSon${onel}${twol}`,
            path: twoMenu.path,
            component: view(twoMenu.component),
            meta: {
              name1: twoMenu.auth_pname,
              name2: twoMenu.auth_name,
              keep_alive: twoMenu.keep_alive,
            },
          })
        })
      }
    })
  }
  const clearAuthMenu = () => {
    authMenu.value.forEach((oneMenu: AuthList, onel: number) => {
      if (oneMenu.children && oneMenu.children.length > 0) {
        oneMenu.children.forEach((twoMenu: any, twol: number) => {
          router.removeRoute(`adminSon${onel}${twol}`)
        })
      }
    })
    authMenu.value = []
  }
  return { isCollapse, getMenu, authMenu, clearAuthMenu }
})
