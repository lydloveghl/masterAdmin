<script lang="ts" setup>
import menuList from '@/mock/menu/index'
</script>
<template>
  <el-aside width="200px">
    <p class="logo"><img src="@/assets/images/logo.png" alt="" /><span>锋团运营平台</span></p>
    <!-- 菜单 -->
    <el-menu
      active-text-color="#409eff"
      background-color="#2d3a4b"
      class="el-menu-vertical-demo"
      text-color="#fff"
    >
      <el-sub-menu v-for="item in menuList" :key="item.auth_id" :index="item.auth_id">
        <template #title>
          <i class="iconfont" :class="item.icon"></i>
          <span>{{ item.auth_name }}</span>
        </template>
        <el-menu-item
          v-for="menuItem in item.children"
          :key="menuItem.auth_id"
          :index="menuItem.auth_id"
          >{{ menuItem.auth_name }}</el-menu-item
        >
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>
<style lang="scss">
.el-aside {
  width: 200px;
  height: 100%;
  background-color: $qf-bg-color;
  .logo {
    display: flex;
    align-items: center;
    color: $qf-text-color;
    width: '100%';
    justify-content: center;
    height: 50px;
    span {
      font-size: 20px;
      font-weight: 700px;
      margin-left: 10px;
    }
  }
  .el-menu {
    border: 0;
    .iconfont {
      margin-right: 5px;
    }
  }
}
.el-aside::-webkit-scrollbar {
  display: none;
}
</style>
