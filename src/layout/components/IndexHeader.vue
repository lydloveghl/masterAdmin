<script lang="ts" setup>
import {
  Fold,
  ArrowRight,
  Setting,
  FullScreen,
  Plus,
  CirclePlusFilled,
  CirclePlus,
  Check,
  CircleCheck,
  ArrowDown,
  Expand,
} from '@element-plus/icons-vue'
import { reactive, toRefs } from 'vue'
import { useAsideStore } from '@/stores/aside'
const asideStore = useAsideStore()
const showAsideNav = () => {
  asideStore.isCollapse = !asideStore.isCollapse
}
const state = reactive({
  circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
  sizeList: ['small', '', 'large'] as const,
})

const { circleUrl } = toRefs(state)
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
              <el-avatar :src="circleUrl" />
              神龙教主<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :icon="Plus">Action 1</el-dropdown-item>
                <el-dropdown-item :icon="CirclePlusFilled"> Action 2 </el-dropdown-item>
                <el-dropdown-item :icon="CirclePlus">Action 3</el-dropdown-item>
                <el-dropdown-item :icon="Check">Action 4</el-dropdown-item>
                <el-dropdown-item :icon="CircleCheck">Action 5</el-dropdown-item>
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
