<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
const activeName = ref('pie')
const pieRef = ref(null)
onMounted(() => {
  const pieChart = echarts.init(pieRef.value)
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    series: [
      {
        name: '点位统计',
        type: 'pie',
        radius: ['10%', '70%'],
        center: ['50%', '50%'],
        roseType: 'radius',
        label: {
          fontSize: 10,
        },
        labelLine: {
          length: 6,
          length2: 8,
        },
        data: [
          { value: 20, name: '云南' },
          { value: 26, name: '北京' },
          { value: 24, name: '山东' },
          { value: 25, name: '河北' },
          { value: 20, name: '江苏' },
          { value: 25, name: '浙江' },
          { value: 30, name: '四川' },
          { value: 42, name: '湖北' },
        ],
      },
    ],
  }
  pieChart.setOption(option)
})
</script>
<template>
  <div class="dataAnalysis">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <template #header> 总销售额 </template>
          <div class="num">
            <i class="iconfont icon-moneycollect"></i>
            <span>33,350</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <template #header>访问量 </template>
          <div class="num">
            <i class="iconfont icon-IE" style="background-color: #098afb"></i>
            <span>39911</span>
          </div>
        </el-card>
        <div></div>
      </el-col>
      <el-col :span="6">
        <el-card>
          <template #header> 总用户 </template>
          <div class="num">
            <i class="iconfont icon-geren" style="background-color: #000a01"></i>
            <span>12211</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <template #header> 今日新增 </template>
          <div class="num">
            <i class="iconfont icon-yaoqingpengyou" style="background-color: #f90cff"></i>
            <span>12322</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="柱状图" name="bar">
        <div class="bar chart"></div>
      </el-tab-pane>
      <el-tab-pane label="折线图" name="line">
        <div class="line chart"></div>
      </el-tab-pane>
      <el-tab-pane label="饼状图" name="pie">
        <div class="pie chart" ref="pieRef"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style lang="scss" scoped>
.dataAnalysis {
  ::v-deep(.el-card__header) {
    border: 0;
  }
  .iconfont {
    display: inline-block;
    text-align: center;
    line-height: 50px;
    font-size: 25px;
    color: #fff;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #ff0067;
    margin-right: 10px;
  }
  span {
    font-size: 35px;
  }
}

.demo-tabs {
  height: 500px;
}

.pie {
  width: 100%;
  height: 420px;
}
</style>
