import { ref } from 'vue'
import { defineStore } from 'pinia'
// import { userLoginCheck } from '@/apis/auth'
export const useCounterStore = defineStore('counter', () => {
  const token = ref('')
  /*   const userInfo = () => {
    return userLoginCheck(token.value)
  } */
  return { token }
})
