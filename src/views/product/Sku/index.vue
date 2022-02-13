<template>
  <div>
    <!-- 表格 -->
    <el-table style="width:100%" border :data="records">
      <el-table-column type="index" width="80" label="序号" align="center" />
      <el-table-column prop="skuName" width="width" label="名称" />
      <el-table-column prop="skuDesc" width="width" label="描述" />
      <el-table-column width="110" label="默认图片">
        <template slot-scope="{row}">
          <img :src="row.skuDefaultImg" style="width:80px;hight:80px">
        </template>
      </el-table-column>
      <el-table-column prop="weight" width="80" label="重量" />
      <el-table-column prop="price" width="80" label="价格" />
      <el-table-column prop="prop" width="width" label="操作">
        <template slot-scope="{row}">
          <el-button v-if="row.isSale ===1" type="success" icon="el-icon-top" size="mini" @click="cancel(row)" />
          <el-button v-else type="info" icon="el-icon-bottom" size="mini" @click="sale(row)" />
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit" />
          <el-button type="info" icon="el-icon-info" size="mini" @click="getSkuInfo(row)" />
          <el-popconfirm title="这是一段内容确定删除吗?" @onConfirm="deleteSku(row)">
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" style="margin-left:10px" />
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination :total="total" :current-page="1" :page-size="limit" style="text-align:center" layout="prev, pager, next, jumper, ->, total" @current-change="getSkuList" />

    <!-- 抽屉 -->
    <el-drawer :visible.sync="drawer" :show-close="false" size="40%">
      <el-row>
        <el-col :span="5">
          名称
        </el-col>
        <el-col :span="16">
          {{ skuInfo.skuName }}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          描述
        </el-col>
        <el-col :span="16">
          {{ skuInfo.skuDesc }}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          价格
        </el-col>
        <el-col :span="16">
          {{ skuInfo.price }}元
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          平台属性
        </el-col>
        <el-col :span="16">
          <el-tag v-for="item in skuInfo.skuAttrValueList" :key="item.id" type="success" style="margin:0 5px">{{ item.attrId }}--{{ item.valueId }}</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          商品图片
        </el-col>
        <el-col :span="16">
          <el-carousel height="450px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl" alt="" style="height:490px">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: 'Sku',
  data() {
    return {
      page: 1, // 代表当前第几页
      limit: 5, // 代表每页有多少数据
      records: [], // 保存sku列表的数据
      total: 0, // 列表的总条数
      skuInfo: {}, // sku的详情
      drawer: false
    }
  },
  mounted() {
    // 获取sku列表
    this.getSkuList()
  },
  methods: {
    // 获取sku列表的方法
    async getSkuList(pages = 1) {
      this.page = pages
      // 解构出默认参数
      const { page, limit } = this
      const res = await this.$API.sku.reqSkuList(page, limit)
      if (res.code === 200) {
        this.records = res.data.records
        this.total = res.data.total
      }
    },
    // 上架
    async sale(row) {
      const res = await this.$API.sku.reqSale(row.id)
      if (res.code === 200) {
        this.$message({
          type: 'success',
          message: '上架成功'
        })
        this.getSkuList()
      }
    },
    // 下架
    async cancel(row) {
      const res = await this.$API.sku.reqCancel(row.id)
      if (res.code === 200) {
        this.$message({
          type: 'success',
          message: '下架成功'
        })
        this.getSkuList()
      }
    },
    // 编辑
    edit() {
      this.$message('正在开发中')
    },
    // 获取sku详情
    async getSkuInfo(sku) {
      const res = await this.$API.sku.reqSkuById(sku.id)
      if (res.code === 200) {
        this.skuInfo = res.data
        this.drawer = true
      }
    },
    // 删除sku
    async deleteSku(sku) {
      const res = await this.$API.sku.reqDeleteSku(sku.id)
      if (res.code === 200) {
        this.getSkuList(this.page)
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }
    }
  }
}
</script>
<style scoped>
.el-col {
  margin: 10px;
}
.el-row .el-col-5 {
  font-size: 20px;
  text-align: right;
  font-weight: 700;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
>>> .el-carousel__button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: red;
}
</style>
