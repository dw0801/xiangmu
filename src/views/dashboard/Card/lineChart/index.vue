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
        type: 'category'
      },
      yAxis: {
        show: false
      },
      series: [
        {
          type: 'line',
          data: [5, 20, 36, 10, 50, 20, 40, 4, 15],
          // 拐点的样式
          itemStyle: {
            opacity: 0
          },
          // 线条的平滑度
          smooth: 0.4,
          // 线条样式
          lineStyle: {
            color: 'purple'
          },
          // 填充颜色
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'purple' // 0% 处的颜色
              }, {
                offset: 1, color: '#fff' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }

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
