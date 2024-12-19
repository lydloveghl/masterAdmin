<script setup lang="ts">
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
import { useUserStore } from '@/stores/user'
const loginStore = useUserStore()
const loginForm = ref({
  username: '神龙教主',
  password: 'admin888',
})
const loginRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '请输入6到16位密码', trigger: 'blur' },
  ],
}
const loginElement = ref<FormInstance>()
const handleLogin = () => {
  loginElement.value!.validate(async (valid) => {
    if (!valid) return
    loginStore.login(loginForm.value)
  })
}
</script>

<template>
  <div class="login-container">
    <div class="loginBox">
      <div class="left">
        <img src="@/assets/images/loginBg.png" alt="" />
      </div>
      <div class="right">
        <div class="title">
          <img src="@/assets/images/logo.png" alt="" />
          锋团运营平台
        </div>
        <el-form
          :model="loginForm"
          label-width="auto"
          style="max-width: 380px"
          :rules="loginRules"
          ref="loginElement"
        >
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" :prefix-icon="User" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              :prefix-icon="Lock"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
  padding: 25px;

  .loginBox {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 0 100px;

    .left {
      flex: 1;
      img {
        width: 100%;
        object-fit: cover;
      }
    }

    .right {
      width: 500px;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 2px 12px #0000001a;

      .title {
        font-size: 50px;
        font-weight: 700;
        margin-bottom: 30px;
        img {
          width: 50px;
        }
      }

      .el-input {
        height: 40px;
      }

      .el-button {
        width: 100%;
        height: 40px;
      }
    }
  }
}
</style>
