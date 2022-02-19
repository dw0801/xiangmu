<template>
  <el-card class="box-card" style="margin:10px 0">
    <!-- 头部 -->
    <div slot="header" class="clearfix">
      <!-- 头部左侧内容 -->
      <el-tabs v-model="activeName" class="tab" @tab-click="handleClick">
        <!-- v-model="activeName" @tab-click="handleClick" -->
        <el-tab-pane label="销售额" name="sale" />
        <el-tab-pane label="访问量" name="visit" />
      </el-tabs>
      <!-- 头部右侧内容 -->
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <el-date-picker v-model="date" value-format="yyyy-MM-dd" class="date" size="mini" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" />
      </div>
    </div>
    <!-- 内容 -->
    <div>
      <el-row>
        <el-col :span="18">
          <div ref="charts" class="charts" />
        </el-col>
        <el-col :span="6">
          <span class="title">门店{{ title }}排名</span>
          <ul>
            <li>
              <span class="index1">1</span>
              <span>肯德基</span>
              <span class="index3">1234534</span>
            </li>
            <li>
              <span class="index1">2</span>
              <span>肯德基</span>
              <span class="index3">1234534</span>
            </li>
            <li>
              <span class="index1">3</span>
              <span>肯德基</span>
              <span class="index3">1234534</span>
            </li>
            <li>
              <span class="index2">4</span>
              <span>肯德基</span>
              <span class="index3">1234534</span>
            </li>
            <li>
              <span class="index2">5</span>
              <span>肯德基</span>
              <span class="index3">1234534</span>
            </li>
            <li>
              <span class="index2">6</span>
              <span>肯德基</span>
              <span class="index3">1234534</span>
            </li>
            <li>
              <span class="index2">7</span>
              <span>肯德基</span>
              <span class="index3">1234534</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>
<script>
// 引入echarts
import * as echarts from 'echarts'
import dayjs from 'dayjs'
export default {
  name: '',
  data() {
    return {
      activeName: 'sale',
      myChart: null,
      // 收集日历数据
      date: []
    }
  },
  computed: {
    // 计算属性-标题
    title() {
      return this.activeName === 'sale' ? '销售额趋势' : '访问量趋势'
    }
  },
  mounted() {
    // 初始化echarts
    this.myChart = echarts.init(this.$refs.charts)
    this.myChart.setOption({
      title: {
        text: '销售额趋势'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '40%',
          data: [10, 52, 200, 334, 390, 330, 220, 100, 50, 150, 20, 170],
          color: 'yellowgreen'
        }
      ]
    })
  },
  methods: {
    // 今天
    setDay() {
      const day = dayjs().format('YYYY-MM-DD')
      this.date = [day, day]
    },
    // 本周
    setWeek() {
      const start = dayjs().day(1).format('YYYY-MM-DD')
      const end = dayjs().day(7).format('YYYY-MM-DD')
      this.date = [start, end]
    },
    // 本月
    setMonth() {
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.date = [start, end]
    },
    // 本年
    setYear() {
      const start = dayjs().startOf('year').format('YYYY-MM-DD')
      const end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.date = [start, end]
    },
    handleClick() {
      // 修改图表的配置数据
      this.myChart.setOption({
        title: {
          text: this.title
        }
      })
    }
  }
}
</script>
<style  scoped>
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
  top: 5px;
}
.right span {
  margin-right: 20px;
  font-size: 14px;
  cursor: pointer;
}
.date {
  width: 250px;
}
.charts {
  width: 100%;
  height: 300px;
}
.title {
  font-size: 18px;
  font-weight: 700;
}
ul {
  padding: 0;
  list-style: none;
  width: 100%;
  height: 300px;
}
ul li {
  height: 12%;
}
.index1 {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: #000;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  margin-right: 30px;
  font-size: 14px;
  line-height: 20px;
}
.index2 {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: #ebebec;
  color: #000;
  border-radius: 50%;
  text-align: center;
  margin-right: 30px;
  font-size: 14px;
  line-height: 20px;
}
.index3 {
  float: right;
  margin-right: 10px;
}
</style>
