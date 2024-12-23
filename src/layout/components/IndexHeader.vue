<script lang="ts" setup>
import {
  Fold,
  ArrowRight,
  Setting,
  FullScreen,
  ArrowDown,
  Expand,
  SwitchButton,
} from '@element-plus/icons-vue'
import { useAsideStore } from '@/stores/aside'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
const router = useRouter()
const asideStore = useAsideStore()
const showAsideNav = () => {
  asideStore.isCollapse = !asideStore.isCollapse
}
const handleLogout = async () => {
  const res = await ElMessageBox.confirm('确认退出登录吗?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).catch((error) => error)
  if (res === 'cancel') {
    ElMessage.warning('已取消')
    return
  }
  ElMessage.success('退出成功')
  userStore.logOut()
  router.push('/login')
}
const userStore = useUserStore()
</script>
<template>
  <div class="header">
    <el-header>
      <p class="pageRouter">
        <span>
          <el-icon @click="showAsideNav()" v-show="asideStore.isCollapse"><Fold /></el-icon>
          <el-icon @click="showAsideNav()" v-show="!asideStore.isCollapse"><Expand /></el-icon>
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>后台首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据分析</el-breadcrumb-item>
          </el-breadcrumb>
        </span>
        <span>
          <el-icon><Setting /></el-icon>
          <el-icon><FullScreen /></el-icon>
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar :src="userStore.userData.avatar" alt="/" />
              {{ userStore.userData.username
              }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item disabled>{{ userStore.userData.role_name }}</el-dropdown-item>
                <el-dropdown-item :icon="SwitchButton" @click="handleLogout"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </span>
      </p>
      <p class="moreTitle"></p>
    </el-header>
  </div>
</template>
<style lang="scss" scoped>
.el-header {
  width: '100%';
  height: 90px;
  //   background-color: pink;
  display: flex;
  flex-direction: column;
  padding: 0;
  .pageRouter {
    height: 50px;
    width: 100%;
    // background-color: thistle;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    span {
      display: flex;
      align-items: center;
      .el-icon {
        margin-right: 10px;
        font-size: 24px;
      }
      .el-dropdown {
        .el-dropdown-link {
          .el-avatar {
            margin-right: 5px;
            width: 30px;
            height: 30px;
          }
        }
      }
    }
  }
  .moreTitle {
    flex: 1;
  }
}
</style>
