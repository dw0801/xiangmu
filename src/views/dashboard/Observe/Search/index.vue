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
            <LineCharts title="搜索用户数" search="11460" data="8.12%" zf="-" />
          </el-col>
          <el-col :span="12">
            <LineCharts title="周涨幅" search="1201" data="12.1%" zf="+" />
          </el-col>
        </el-row>
      </div>
      <div class="table">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column label="排名" width="80" type="index" />
          <el-table-column label="搜索关键字" prop="word" />
          <el-table-column sortable label="用户数" prop="user" />
          <el-table-column sortable label="周涨幅" prop="count" />
        </el-table>
        <!-- 分页器 -->
        <el-pagination layout="prev, pager, next" :page-size="5" :total="total" class="pagination" @current-change="handleCurrentChange" />
      </div>
    </el-card>
  </div>
</template>
<script>
import LineCharts from './lineCharts'
import { mapState } from 'vuex'
export default {
  name: '',
  components: {
    LineCharts
  },
  data() {
    return {
      tableData: [{}],
      total: 0,
      i: 0
    }
  },
  computed: {
    ...mapState({
      listState: state => state.home.list
    })
  },
  watch: {
    listState() {
      this.total = this.listState.searchWord.length
      this.tableData = this.listState.searchWord.slice(this.i, this.i + 5)
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.i = val
      this.tableData = this.listState.searchWord.slice(this.i, this.i + 5)
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
