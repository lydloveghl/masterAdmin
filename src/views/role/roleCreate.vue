<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { addRoleApi } from '@/api/role'
import { ElMessage } from 'element-plus/es/components/index.mjs'
import type { FormInstance } from 'element-plus/es/components/index.mjs'
const router = useRouter()
const roleCreateForm = ref({
  role_name: '',
  role_desc: '',
})
const roleAddRules = {
  role_name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
}
const ruleFormRef = ref<FormInstance>()
const submitForm = async () => {
  await ruleFormRef.value?.validate(async (valid) => {
    if (!valid) {
      ElMessage.error('请填写正确的信息')
      return
    } else {
      const res = await addRoleApi(roleCreateForm.value)
      console.log(res)
      if (res.data.state !== 201) {
        ElMessage.error(res.data.msg)
        return
      }
      ElMessage.success('创建成功')
      router.push('/role')
    }
  })
}
const resetForm = async () => {
  await ruleFormRef.value?.resetFields()
}
</script>
<template>
  <div class="roleCreate">
    <el-card style="width: 100%">
      <template #header>
        <div class="card-header">
          <span>角色创建</span>
          <el-button @click="router.back()">返回</el-button>
        </div>
      </template>
      <el-form
        ref="ruleFormRef"
        style="width: 100%"
        :model="roleCreateForm"
        :rules="roleAddRules"
        status-icon
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="role_name">
          <el-input
            v-model="roleCreateForm.role_name"
            type="text"
            autocomplete="off"
            placeholder="请输入角色名称"
          />
        </el-form-item>
        <el-form-item label="角色描述" prop="role_desc">
          <el-input
            v-model="roleCreateForm.role_desc"
            type="text"
            autocomplete="off"
            placeholder="请输入角色描述"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()"> 立即创建 </el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
.el-card {
  .el-card__header {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
