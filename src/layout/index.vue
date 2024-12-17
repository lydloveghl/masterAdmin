<script lang="ts" setup>
import IndexAside from './components/IndexAside.vue'
</script>
<template>
  <div class="common-layout">
    <el-container>
      <IndexAside />
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.common-layout {
  height: 100%;
  .el-container {
    height: 100%;
    .el-header {
      width: '100%';
      height: 90px;
      background-color: pink;
    }
    .el-main {
      background-color: lightblue;
    }
    .el-footer {
      width: '100%';
      height: 40px;
      background-color: skyblue;
    }
  }
}
</style>
