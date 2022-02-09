<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select v-model="cForm.category1Id" placeholder="请选择" :disabled="show" @change="handler1">
          <el-option v-for="item in list1" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="cForm.category2Id" placeholder="请选择" :disabled="show" @change="handler2">
          <el-option v-for="item in list2" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="cForm.category3Id" placeholder="请选择" :disabled="show" @change="handler3">
          <el-option v-for="item in list3" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default
{ name: 'CategorySelect',
  props: ['show'],
  data() {
    return {
      // 一级二级三级分类数组
      list1: [],
      list2: [],
      list3: [],
      // 收集一级二级三级相应的ID
      cForm: {
        category1Id: '',
        category2Id: '',
        category3Id: ''
      }
    }
  },
  mounted() {
    this.getCategory1List()
  },
  // 组件加载完毕 获取一级分类数据
  methods: {
    // 获取一级分类数据事件
    async getCategory1List() {
      const result = await this.$API.attr.reqCategory1List()
      if (result.code === 200) {
        this.list1 = result.data
      }
    },
    // 一级分类发生改变之后获取二级分类数据的事件
    async handler1() {
      this.list2 = []
      this.list3 = []
      this.cForm.category2Id = ''
      this.cForm.category3Id = ''
      const { category1Id } = this.cForm
      const res = await this.$API.attr.reqCategory2List(category1Id)
      if (res.code === 200) {
        this.list2 = res.data
      }
      this.$emit('getGoods', { categoryId: category1Id, level: 1 })
    },
    // 二级分类发生改变之后获取二级分类数据的事件
    async handler2() {
      this.list3 = []
      this.cForm.category3Id = ''
      const { category2Id } = this.cForm
      this.$emit('getGoods', { categoryId: category2Id, level: 2 })
      const res = await this.$API.attr.reqCategory3List(category2Id)
      if (res.code === 200) {
        this.list3 = res.data
      }
    },
    // 三级分类发生改变之后获取二级分类数据的事件
    async handler3() {
      const { category3Id } = this.cForm
      this.$emit('getGoods', { categoryId: category3Id, level: 3 })
    }
  }
}
</script>
<style lang='less' scoped>
</style>
