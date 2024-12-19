import { ref } from 'vue'
import { defineStore } from 'pinia'
import { loginApi } from '@/api/user'
import type { loginType, loginData } from '@/types/user'
// import { userLoginCheck } from '@/apis/auth'
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const userData = ref<loginData>({} as loginData)
    /*   const userInfo = () => {
    return userLoginCheck(token.value)
  } */
    const login = async (data: loginType) => {
      const { data: res } = await loginApi(data)
      token.value = res.data.token
      userData.value = res.data
      localStorage.setItem('userInfo', JSON.stringify(res.data))
    }
    const logOut = async () => {
      token.value = ''
      userData.value = {} as loginData
    }
    return { token, login, userData, logOut }
  },
  {
    persist: true,
  },
)
