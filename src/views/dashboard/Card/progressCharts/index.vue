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
        // 最小值和最大值的设置
        min: 0,
        max: 100
      },
      yAxis: {
        show: false,
        // 均分
        type: 'category'
      },
      series: [
        {
          type: 'bar',
          data: [78],
          barWidth: 10,
          color: 'yellowgreen',
          showBackground: true,
          backgroundStyle: {
            color: '#eee'
          },
          // 文本
          label: {
            show: true,
            formatter: '|',
            position: 'right'
          }
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
