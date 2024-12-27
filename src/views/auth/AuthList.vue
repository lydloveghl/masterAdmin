<script lang="ts" setup>
import { ref } from 'vue'
import { delAuthApi, getAuthListApi } from '@/api/auth/index'
import { Delete, Edit } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const userAuthList = ref()
const getAuthList = async () => {
  const res = await getAuthListApi()
  userAuthList.value = res.data.data
}
getAuthList()
const delAuth = async (row: any) => {
  const res = await delAuthApi(row)
  console.log(res)
  if (res.data.state !== 200) {
    return ElMessage.error(res.data.msg)
  }
  ElMessage.success(res.data.msg)
  getAuthList()
}
</script>
<template>
  <div class="authList">
    <el-card style="width: 100%; height: 100%">
      <el-table :data="userAuthList" height="250" style="width: 100%" border row-key="auth_id">
        <el-table-column prop="auth_name" label="权限名称" width="180" align="center" sortable />
        <el-table-column prop="type" label="种类" width="180" align="center" sortable>
          <template v-slot="{ row }">
            <el-tag v-if="row.type === 1" type="primary">菜单</el-tag>
            <el-tag v-else type="success">按钮</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="path" label="路由" align="center" sortable />
        <el-table-column prop="keep_alive" label="组件缓存" align="center" sortable>
          <template v-slot="{ row }">
            <el-switch
              v-model="row.keep_alive"
              inline-prompt
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
              active-text="已缓存"
              inactive-text="未缓存"
              :active-value="1"
              :inactive-value="0"
              disabled
            />
          </template>
        </el-table-column>
        <el-table-column prop="component" label="组件路径" align="center" sortable />
        <el-table-column label="操作" align="center" sortable>
          <template #default="{ row }">
            <el-button :icon="Edit" type="primary"></el-button>
            <el-button type="danger" :icon="Delete" @click="delAuth(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<style lang="scss"></style>
