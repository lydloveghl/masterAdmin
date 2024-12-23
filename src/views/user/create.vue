<script lang="ts" setup>
import { ref } from 'vue'
import { checkMobile } from '@/utils/validate'
import { ElMessage, type FormInstance } from 'element-plus'
import { userAddApi } from '@/api/user'
import { useRouter } from 'vue-router'
const router = useRouter()
// import { FormRules } from 'element-plus';
const formData = ref({
  username: '',
  password: '',
  mobile: '',
})
const rules = ref({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '长度在6~12位之间', trigger: 'blur' },
  ],
  mobile: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (checkMobile(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的手机号'))
        }
      },
      trigger: 'blur',
    },
  ],
})
const ruleFormRef = ref<FormInstance | null>(null)
const addUser = () => {
  ruleFormRef.value?.validate(async (valid) => {
    if (!valid) {
      return
    } else {
      const res = await userAddApi(formData.value)
      if (res.data.state !== 201) {
        ElMessage.error(res.data.msg)
        return
      }
      router.push('/user')
    }
  })
}
</script>
<template>
  <div class="create">
    <el-card style="width: 100%">
      <template #header>
        <div class="card-header">
          <span>用户创建</span>
        </div>
      </template>
      <el-form
        ref="ruleFormRef"
        :model="formData"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model.number="formData.mobile" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addUser"> 立即创建 </el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
