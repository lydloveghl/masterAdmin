<script lang="ts" setup>
import { ref } from 'vue'
import { getAuthListApi } from '@/api/auth/index'
const userAuthList = ref()
const getAuthList = async () => {
  const res = await getAuthListApi()
  userAuthList.value = res.data.data
}
getAuthList()
</script>
<template>
  <div class="authList">
    <el-card style="width: 100%">
      <el-table :data="userAuthList" height="250" style="width: 100%">
        <el-table-column prop="auth_name" label="权限名称" width="180" align="center" />
        <el-table-column prop="type" label="种类" width="180" align="center">
          <template v-slot="{ row }"> </template>
        </el-table-column>
        <el-table-column prop="path" label="路由" align="center" />
        <el-table-column prop="keep_alive" label="组件缓存" align="center">
          <template v-slot="{ row }"> </template>
        </el-table-column>
        <el-table-column prop="component" label="组件路径" align="center" />
        <el-table-column label="操作" align="center">
          <template v-slot="{ row }"> </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<style lang="scss"></style>
