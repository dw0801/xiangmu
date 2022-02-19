<template>
  <div>
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <div class="clearfix1">
          <div>线上热门搜索</div>
          <el-dropdown>
            <i class="el-icon-more" />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item>双皮奶</el-dropdown-item>
              <el-dropdown-item>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="12">
            <LineCharts />
          </el-col>
          <el-col :span="12">
            <LineCharts />
          </el-col>
        </el-row>
      </div>
      <div class="table">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column label="排名" width="80" type="index" />
          <el-table-column label="搜索关键字" />
          <el-table-column sortable label="用户数" />
          <el-table-column sortable label="周涨幅" />
        </el-table>
        <!-- 分页器 -->
        <el-pagination layout="prev, pager, next" :total="100" class="pagination" />
      </div>
    </el-card>
  </div>
</template>
<script>
import LineCharts from './lineCharts'
export default {
  name: '',
  components: {
    LineCharts
  },
  data() {
    return {
      tableData: [{}]
    }
  }
}
</script>
<style  scoped>
.clearfix1 {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #efefef;
}
.table {
  margin-top: 10px;
}
.pagination {
  float: right;
}
</style>
