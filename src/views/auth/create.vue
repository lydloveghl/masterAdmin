<script lang="ts" setup>
import { ref } from 'vue'
import { getAuthListApi } from '@/api/auth'
import { addAuthApi } from '@/api/auth'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus/es/components/index.mjs'
const router = useRouter()
const authInfo = ref({
  auth_name: '',
  type: 1,
  path: '',
  keep_alive: 0,
  component: '',
  pid: 0,
})
const userAuthList = ref()
const getAuthList = async () => {
  const res = await getAuthListApi()
  userAuthList.value = res.data.data
}
getAuthList()
const addAuth = async () => {
  const res = await addAuthApi(authInfo.value)
  if (res.data.state !== 201) {
    return ElMessage.error(res.data.msg)
  }
  ElMessage.success(res.data.msg)
  router.push('/auth')
}
const authFormRef = ref<FormInstance>()
const resetAuthForm = async () => {
  console.log(authFormRef.value)
  await authFormRef.value?.resetFields()
}
</script>
<template>
  <div class="createAuth">
    <el-card style="width: 100%">
      <template #header>
        <div class="card-header">
          <span>权限创建</span>
        </div>
      </template>
      <el-form :model="authInfo" label-width="auto" style="max-width: 600px" ref="authFormRef">
        <el-form-item label="权限名称" prop="auth_name">
          <el-input v-model="authInfo.auth_name" placeholder="请输入权限名称" />
        </el-form-item>
        <el-form-item label="种类" prop="type">
          <el-radio-group v-model="authInfo.type">
            <el-radio :value="1" size="large" border>菜单</el-radio>
            <el-radio :value="2" size="large" border>按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="路由路径" v-if="authInfo.type === 1" prop="path">
          <el-input v-model="authInfo.path" placeholder="请输入路由"></el-input>
        </el-form-item>
        <el-form-item label="组件缓存" v-if="authInfo.type === 1" prop="keep_alive">
          <el-switch
            v-model="authInfo.keep_alive"
            class="ml-2"
            inline-prompt
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            active-text="已缓存"
            inactive-text="未缓存"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="组件路径" v-if="authInfo.type === 1" prop="component">
          <el-input v-model="authInfo.component" placeholder="请输入组件路径"></el-input>
        </el-form-item>
        <el-form-item label="所属权限" prop="pid">
          <el-select v-model="authInfo.pid" size="large" style="width: 240px">
            <el-option label="顶级权限" :value="0"></el-option>
            <el-option
              v-for="item in userAuthList"
              :key="item.auth_id"
              :label="item.auth_name"
              :value="item.auth_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addAuth">立即创建</el-button>
          <el-button @click="resetAuthForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<style lang="scss" scoped></style>
