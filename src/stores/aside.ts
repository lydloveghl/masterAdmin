import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useAsideStore = defineStore('aside', () => {
  const isCollapse = ref(true)

  return { isCollapse }
})
