<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <!-- 第一个Card -->
        <el-card>
          <Detail title="总销售额" :count="`￥${this.listState.salesTotal}`">
            <template slot="charts">
              <span>周同比 {{ this.listState.salesGrowthLastMonth }}%
                <svg v-if="this.listState.salesGrowthLastMonth>0" t="1645149008233" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2003" width="16" height="16">
                  <path d="M960 704L512 256l-448 448z" fill="#d81e06" p-id="2004" />
                </svg>
                <svg v-else t="1645149100398" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2919" width="16" height="16">
                  <path d="M64 320l448 448 448-448z" fill="#1afa29" p-id="2920" />
                </svg>
              </span>
              &nbsp;
              <span>日同比 {{ this.listState.salesGrowthLastDay }}
                <svg v-if="this.listState.salesGrowthLastDay>0" t="1645149008233" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2003" width="16" height="16">
                  <path d="M960 704L512 256l-448 448z" fill="#d81e06" p-id="2004" />
                </svg>
                <svg v-else t="1645149100398" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2919" width="16" height="16">
                  <path d="M64 320l448 448 448-448z" fill="#1afa29" p-id="2920" />
                </svg>
              </span>
            </template>
            <template slot="footer">
              <span> 日销售额 ${{ this.listState.salesToday }}</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <!-- 第二个Card -->
        <el-card>
          <Detail title="访问量" :count="this.listState.visitTotal">
            <template slot="charts">
              <lineCharts />
            </template>
            <template slot="footer">
              <span> 日访问量 {{ this.listState.visitToday }}</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <!-- 第三个Card -->
        <el-card>
          <Detail title="支付笔数" :count="this.listState.payTotal">
            <template slot="charts">
              <barCharts />
            </template>
            <template slot="footer">
              <span>转换率&nbsp;{{ this.listState.payRate }}%</span>
            </template>
          </Detail>

        </el-card>

      </el-col>
      <el-col :span="6">
        <!-- 第四个Card -->
        <el-card>
          <Detail title="运营活动效果" :count="`${this.listState.activityRate}%`">
            <template slot="charts">
              <progressCharts />
            </template>
            <template slot="footer">
              <span>周同比 {{ this.listState.activityGrowthLastMonth }}%
                <svg v-if="this.listState.activityGrowthLastMonth>0" t="1645149008233" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2003" width="16" height="16">
                  <path d="M960 704L512 256l-448 448z" fill="#d81e06" p-id="2004" />
                </svg>
                <svg v-else t="1645149100398" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2919" width="16" height="16">
                  <path d="M64 320l448 448 448-448z" fill="#1afa29" p-id="2920" />
                </svg>
              </span>
              &nbsp;
              <span>日同比 {{ this.listState.activityGrowthLastDay }}
                <svg v-if="this.listState.activityGrowthLastDayy>0" t="1645149008233" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2003" width="16" height="16">
                  <path d="M960 704L512 256l-448 448z" fill="#d81e06" p-id="2004" />
                </svg>
                <svg v-else t="1645149100398" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2919" width="16" height="16">
                  <path d="M64 320l448 448 448-448z" fill="#1afa29" p-id="2920" />
                </svg>
              </span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Detail from './Detail'
import lineCharts from './lineChart'
import barCharts from './barCharts'
import progressCharts from './progressCharts'
import { mapState } from 'vuex'
export default {
  name: 'Card',
  components: {
    Detail,
    lineCharts,
    barCharts,
    progressCharts
  },
  computed: {
    ...mapState({
      listState: state => state.home.list
    })
  }
}
</script>
<style  scoped>
</style>
