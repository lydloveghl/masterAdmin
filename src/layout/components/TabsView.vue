<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import useTagsViewStore from '@/stores/tagsView'
import { useRoute } from 'vue-router'
import type { TabsPaneContext, TabPaneName } from 'element-plus'
import { useRouter } from 'vue-router'
const tagsView = useTagsViewStore()
const route = useRoute()
const router = useRouter()
const editableTabsValue = ref(route.path)

watchEffect(() => {
  editableTabsValue.value = route.path
  tagsView.highLightItem = editableTabsValue.value
})
const handleRouterChange = (pane: TabsPaneContext) => {
  router.push(pane.props.name as string)
}
const removeTabItem = (name: TabPaneName) => {
  tagsView.removeList(name as string)
  if (name === route.path) router.push(tagsView.highLightItem)
}
</script>
<template>
  <div class="tabsView">
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      closable
      @tab-click="handleRouterChange"
      @tab-remove="removeTabItem"
    >
      <el-tab-pane
        v-for="item in tagsView.tagsViewList"
        :key="item.path"
        :label="item.title"
        :name="item.path"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style lang="scss" scoped></style>
