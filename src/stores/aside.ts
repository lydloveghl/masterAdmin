import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useAsideStore = defineStore('aside', () => {
  const isCollapse = ref(false)

  return { isCollapse }
})
