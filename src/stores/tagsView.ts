import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'
interface tagsList {
  title: string
  path: string
}
const useTagsViewStore = defineStore(
  'tagesView',
  () => {
    const tagsViewList = ref([] as tagsList[])
    const highLightItem = ref('')
    const addList = (newList: tagsList) => {
      const index = tagsViewList.value.findIndex((item) => {
        return newList.title === item.title
      })
      if (index !== -1) return
      tagsViewList.value.push(newList)
    }
    const removeList = (name: string) => {
      if (tagsViewList.value.length === 1) return ElMessage.warning('至少保留一个选项卡')
      const index = tagsViewList.value.findIndex((item) => {
        return item.path === name
      })
      if (index !== -1) {
        tagsViewList.value.splice(index, 1)
      }
      if (highLightItem.value === name) {
        highLightItem.value = tagsViewList.value[index - 1].path
      }
    }
    return { tagsViewList, addList, highLightItem, removeList }
  },
  {
    persist: true,
  },
)
export default useTagsViewStore
