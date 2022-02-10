<template>
  <div>
    <el-card style="margin:0 0 20px"><CategorySelect :show="scene!==0" @getGoods="getGoods" /></el-card>
    <el-card>
      <!-- 展示Spu列表的表格数据 -->
      <div v-show="scene ===0">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addSpu">添加SPU</el-button>
        <el-table border style="width:100%" :data="records">
          <el-table-column label="序号" type="index" width="80" align="center" />
          <el-table-column label="spu名称" prop="spuName" width="width" />
          <el-table-column label="spu描述" prop="description" width="width" />
          <el-table-column label="操作" width="width">
            <template slot-scope="{row}">
              <hint-button title="添加sku" type="success" icon="el-icon-plus" size="mini" @click="addSku(row)" />
              <hint-button title="修改spu" type="warning" icon="el-icon-edit" size="mini" @click="updateSpu(row)" />
              <hint-button title="查看spu全部的sku" type="info" icon="el-icon-info" size="mini" />
              <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteSpu(row)">
                <hint-button slot="reference" title="删除spu" type="danger" icon="el-icon-delete" size="mini" />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="text-align:center" :total="total" :current-page="page" :page-sizes="[3,5,10]" :page-size="limit" layout="prev, pager, next, jumper, ->, sizes,total" @current-change="handleCurrentChange" @size-change="handleSizeChange" />
      </div>
      <!-- 添加和修改spu的界面 -->
      <SpuForm v-show="scene ===1" ref="spu" @changeScene="changeScene" />
      <!-- 添加sku的界面  -->
      <SkuForm v-show="scene ===2" />
    </el-card>
  </div>
</template>
<script>
import SpuForm from './spuForm/index.vue'
import SkuForm from './skuForm/index.vue'
export default
{ name: 'Spu',
  components: {
    SpuForm,
    SkuForm
  },
  data() {
    return {
      // 控制界面的显示隐藏
      scene: 0, // 0展示spu列表数据  1代表添加或修改spu 2添加sku
      // 一级二级三级分类的id
      category1Id: '',
      category2Id: '',
      category3Id: '',
      // 控制三级联动的可用性
      page: 1, // 当前页数
      limit: 3, // 一页的条数
      records: [], // spu的列表数据
      total: 0 // 数据的总条数
    }
  },
  methods: {
    async getGoods({ categoryId, level }) {
      if (level === 1) {
        this.category1Id = categoryId
        this.category2Id = ''
        this.category3Id = ''
        this.records = []
        this.total = 0
      } else if (level === 2) {
        this.category2Id = categoryId
        this.category3Id = ''
        this.records = []
        this.total = 0
      } else {
        this.category3Id = categoryId
        // 获取Spu列表数据
        this.getSpuList()
      }
    },
    // 获取Spu列表数据
    async getSpuList(pages = 1) {
      this.page = pages
      const { page, limit, category3Id } = this
      const res = await this.$API.spu.reqSpuList(page, limit, category3Id)
      if (res.code === 200) {
        this.records = res.data.records
        this.total = res.data.total
      }
    },
    // 点击分页器的事件
    handleCurrentChange(page) {
      this.page = page
      this.getSpuList(this.page)
    },
    // 改变一条展示几条数据的事件
    handleSizeChange(limit) {
      this.limit = limit
      this.getSpuList()
    },
    // 添加spu事件
    addSpu() {
      this.scene = 1
      // 通知子组件发请求
      this.$refs.spu.addSpuData(this.category3Id)
      this.page = 1
    },
    // 修改spu事件
    updateSpu(row) {
      this.scene = 1
      // 通过this.$refs.spu 拿到子组件  在使用里面的函数
      this.$refs.spu.initSpuData(row)
    },
    // spu向父组件传值 父组件接收的事件
    changeScene(scene) {
      // 切换显示隐藏
      this.scene = scene
      // 子组件通知父组件之后要重新获取数据
      this.getSpuList(this.page)
    },
    // 删除spu事件
    async deleteSpu(row) {
      const res = await this.$API.spu.reqDeleteSpu(row.id)
      if (res.code === 200) {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1)
      }
    },
    // 添加sku按钮的事件
    addSku(row) {
      this.scene = 2
    }
  }}
</script>
<style lang='less' scoped>
</style>
