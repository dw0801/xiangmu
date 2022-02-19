<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="category-header">
        <span>销售额类别占比</span>
        <el-radio-group v-model="value" size="mini">
          <el-radio-button label="全部渠道" />
          <el-radio-button label="线上" />
          <el-radio-button label="门店" />
        </el-radio-group>
      </div>
      <div>
        <div ref="charts" class="charts" />
      </div>
    </el-card>
  </div>
</template>
<script>
import * as echarts from 'echarts'
import { mapState } from 'vuex'
export default {
  name: '',
  data() {
    return {
      value: '全部渠道',
      myChart: null
    }
  },
  watch: {
    value() {
      if (this.value === '全部渠道') {
        this.myChart.setOption({
          title: {
            text: this.listState.saleRank.online.name[0],
            subtext: (this.listState.saleRank.online.value[0] + this.listState.saleRank.shop.value[0]) / 2 + '%',
            left: 'center',
            top: 'center'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 5,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: true,
                position: 'outside'
              },
              labelLine: {
                show: true
              },
              data: [
                { value: (this.listState.saleRank.online.value[0] + this.listState.saleRank.shop.value[0]) / 2, name: this.listState.saleRank.online.name[0] },
                { value: (this.listState.saleRank.online.value[1] + this.listState.saleRank.shop.value[1]) / 2, name: this.listState.saleRank.online.name[1] },
                { value: (this.listState.saleRank.online.value[2] + this.listState.saleRank.shop.value[2]) / 2, name: this.listState.saleRank.online.name[2] },
                { value: (this.listState.saleRank.online.value[3] + this.listState.saleRank.shop.value[3]) / 2, name: this.listState.saleRank.online.name[3] },
                { value: (this.listState.saleRank.online.value[4] + this.listState.saleRank.shop.value[4]) / 2, name: this.listState.saleRank.online.name[4] },
                { value: (this.listState.saleRank.online.value[5] + this.listState.saleRank.shop.value[5]) / 2, name: this.listState.saleRank.online.name[5] }
              ]
            }
          ]
        })
      } else if (this.value === '线上') {
        this.myChart.setOption({
          title: {
            text: this.listState.saleRank.online.name[0],
            subtext: this.listState.saleRank.online.value[0] + '%',
            left: 'center',
            top: 'center'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 5,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: true,
                position: 'outside'
              },
              labelLine: {
                show: true
              },
              data: [
                { value: this.listState.saleRank.online.value[0], name: this.listState.saleRank.online.name[0] },
                { value: this.listState.saleRank.online.value[1], name: this.listState.saleRank.online.name[1] },
                { value: this.listState.saleRank.online.value[2], name: this.listState.saleRank.online.name[2] },
                { value: this.listState.saleRank.online.value[3], name: this.listState.saleRank.online.name[3] },
                { value: this.listState.saleRank.online.value[4], name: this.listState.saleRank.online.name[4] },
                { value: this.listState.saleRank.online.value[5], name: this.listState.saleRank.online.name[5] }
              ]
            }
          ]
        })
      } else {
        this.myChart.setOption({
          title: {
            text: this.listState.saleRank.shop.name[0],
            subtext: this.listState.saleRank.shop.value[0] + '%',
            left: 'center',
            top: 'center'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 5,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: true,
                position: 'outside'
              },
              labelLine: {
                show: true
              },
              data: [
                { value: this.listState.saleRank.shop.value[0], name: this.listState.saleRank.online.name[0] },
                { value: this.listState.saleRank.shop.value[1], name: this.listState.saleRank.online.name[1] },
                { value: this.listState.saleRank.shop.value[2], name: this.listState.saleRank.online.name[2] },
                { value: this.listState.saleRank.shop.value[3], name: this.listState.saleRank.online.name[3] },
                { value: this.listState.saleRank.shop.value[4], name: this.listState.saleRank.online.name[4] },
                { value: this.listState.saleRank.shop.value[5], name: this.listState.saleRank.online.name[5] }
              ]
            }
          ]
        })
      }
    },
    listState() {
      this.myChart.setOption({
        title: {
          text: this.listState.saleRank.online.name[0],
          subtext: (this.listState.saleRank.online.value[0] + this.listState.saleRank.shop.value[0]) / 2 + '%',
          left: 'center',
          top: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 5,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: true,
              position: 'outside'
            },
            labelLine: {
              show: true
            },
            data: [
              { value: (this.listState.saleRank.online.value[0] + this.listState.saleRank.shop.value[0]) / 2, name: this.listState.saleRank.online.name[0] },
              { value: (this.listState.saleRank.online.value[1] + this.listState.saleRank.shop.value[1]) / 2, name: this.listState.saleRank.online.name[1] },
              { value: (this.listState.saleRank.online.value[2] + this.listState.saleRank.shop.value[2]) / 2, name: this.listState.saleRank.online.name[2] },
              { value: (this.listState.saleRank.online.value[3] + this.listState.saleRank.shop.value[3]) / 2, name: this.listState.saleRank.online.name[3] },
              { value: (this.listState.saleRank.online.value[4] + this.listState.saleRank.shop.value[4]) / 2, name: this.listState.saleRank.online.name[4] },
              { value: (this.listState.saleRank.online.value[5] + this.listState.saleRank.shop.value[5]) / 2, name: this.listState.saleRank.online.name[5] }
            ]
          }
        ]
      })
    }
  },
  computed: {
    ...mapState({
      listState: state => state.home.list
    })
  },
  mounted() {
    // 饼图
    this.myChart = echarts.init(this.$refs.charts)
    this.myChart.setOption({
      title: {
        text: '',
        subtext: '',
        left: 'center',
        top: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 5,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'outside'
          },
          labelLine: {
            show: true
          },
          data: [
            { value: '', name: '' },
            { value: '', name: '' },
            { value: '', name: '' },
            { value: '', name: '' },
            { value: '', name: '' },
            { value: '', name: '' }
          ]
        }
      ]
    })
    // 绑定事件
    this.myChart.on('mouseover', (params) => {
      const { name, value } = params.data
      // 重新设置标题
      this.myChart.setOption({
        title: {
          text: name,
          subtext: value + '%'
        }
      })
    })
  }
}
</script>
<style scoped>
.category-header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 5px 0;
  border-bottom: 1px solid #efefef;
}
.category-header span {
  line-height: 28px;
}
.charts {
  width: 100%;
  height: 300px;
}
</style>
