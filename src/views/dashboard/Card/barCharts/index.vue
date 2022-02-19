<template>
  <div ref="charts" class="charts" />
</template>
<script>
// 引入echarts
import * as echarts from 'echarts'
export default {
  name: '',
  mounted() {
    const lineChart = echarts.init(this.$refs.charts)
    lineChart.setOption({
      xAxis: {
        show: false,
        // 均分
        type: 'category'
      },
      yAxis: {
        show: false
      },
      series: [
        {
          type: 'bar',
          data: [5, 20, 36, 10, 50, 20, 40, 4, 15]
        }
      ],
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    })
  }
}
</script>
<style  scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
