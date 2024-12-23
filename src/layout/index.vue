<script lang="ts" setup>
import IndexAside from './components/IndexAside.vue'
import IndexHeader from './components/IndexHeader.vue'
</script>
<template>
  <div class="common-layout">
    <el-container>
      <IndexAside />
      <el-container>
        <index-header></index-header>
        <el-main><router-view></router-view></el-main>
        <el-footer>2023 © QFADMIN 前端扛把子@千锋教育 🔥 👊🏻👊🏻👊🏻</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.common-layout {
  height: 100%;
  .el-container {
    height: 100%;

    .el-main {
      background-color: #f0f2f5;
    }
    .el-footer {
      width: '100%';
      height: 40px;
      // background-color: skyblue;
      text-align: center;
      line-height: 40px;
      font-size: 12px;
    }
  }
}
</style>
