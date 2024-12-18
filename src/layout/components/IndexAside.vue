<script lang="ts" setup>
import menuList from '@/mock/menu/index'
import { useAsideStore } from '@/stores/aside'
const asideStore = useAsideStore()
</script>
<template>
  <el-aside :class="{ 'is-collapse': !asideStore.isCollapse }">
    <p class="logo">
      <img src="@/assets/images/logo.png" alt="" /><span v-show="asideStore.isCollapse"
        >锋团运营平台</span
      >
    </p>
    <!-- 菜单 -->
    <el-menu
      active-text-color="#409eff"
      background-color="#2d3a4b"
      class="el-menu-vertical-demo"
      text-color="#fff"
      :collapse="!asideStore.isCollapse"
      :collapse-transition="false"
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
        >
          <i class="iconfont" :class="menuItem.icon"></i>
          {{ menuItem.auth_name }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>
<style lang="scss">
.el-aside {
  width: 200px;
  height: 100%;
  background-color: $qf-bg-color;
  transition: all 0.2s linear;
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
      text-wrap: nowrap;
    }
  }
  .el-menu {
    border: 0;
    .iconfont {
      margin-right: 5px;
    }
  }
}
.el-aside.is-collapse {
  width: 64px;
}
.el-aside::-webkit-scrollbar {
  display: none;
}
</style>
