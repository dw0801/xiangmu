<template>
  <div>
    <el-card style="margin:0 0 20px"><CategorySelect :show="!isShowTable" @getGoods="getGoods">1</CategorySelect></el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addAttr">添加属性</el-button>
        <!-- 表格--展示平台数据 -->
        <el-table style="width:100%" border :data="goods">
          <el-table-column type="index" label="序号" width="80" align="center" />
          <el-table-column prop="attrName" label="属性名称" width="150" />
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{row}">
              <el-tag v-for="item in row.attrValueList" :key="item.id" type="success" style="margin:0 5px">{{ item.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{row}">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateAttr(row)" />
              <el-popconfirm :title="`确定删除${row.valueName}吗？`" @onConfirm="deleteArrr(row)">
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <el-form inline :model="attrInfo">
          <el-form-item label="属性名">
            <el-input v-model="attrInfo.attrName" placeholder="请输入属性名" />
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrInfo.attrName" @click="addAttrValue">添加属性值</el-button>
        <el-button @click="isShowTable=!isShowTable">取消</el-button>
        <el-table border style="margin:20px 0" :data="attrInfo.attrValueList">
          <el-table-column label="序号" width="80" type="index" align="center" />
          <el-table-column label="属性值名称" width="width">
            <template slot-scope="{row,$index}">
              <el-input v-if="row.flag" :ref="$index" v-model="row.valueName" placeholder="请输入属性值名称" size="mini" @blur="tolook(row)" @keyup.native.enter="tolook(row)" />
              <span v-else style="display:block" @click="toEdit(row,$index)">{{ row.valueName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="{row,$index}">
              <el-popconfirm :title="`确定删除${row.valueName}吗？`" @onConfirm="deleteAttrValue($index)">
                <el-button slot="reference" type="danger" size="mini" icon="el-icon-delete" />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" :disabled="attrInfo.attrValueList.length<1" @click="addOrUpdataAttr">保存 </el-button>
        <el-button @click="isShowTable=!isShowTable">取消</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
// 按需引入lodash深拷贝
import cloneDeep from 'lodash/cloneDeep'
export default
{ name: 'Attr',
  data() {
    return {
      isRepat: false,
      goods: [],
      // 控制table显示隐藏
      isShowTable: true,
      // 一级二级三级分类的id
      category1Id: '',
      category2Id: '',
      category3Id: '',
      // 添加和、修改属性和属性值的数据
      attrInfo: {
        attrName: '', // 属性名
        attrValueList: [ // 属性值  可以有很多属性值所以用数组
          /*  {
            attrId: 0,
            valueName: ''
          } */
        ],
        categoryId: 0, // 三级分类的Id
        categoryLevel: 3 // 服务器也需要区分几级分类的ID
      }
    }
  },
  methods: {
    async getGoods({ categoryId, level }) {
      if (level === 1) {
        this.category1Id = categoryId
        this.category2Id = ''
        this.category3Id = ''
      } else if (level === 2) {
        this.category2Id = categoryId
        this.category3Id = ''
      } else {
        this.category3Id = categoryId
        // 获取平台数据
        this.getAttrList()
      }
    },
    // 获取平台数据
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this
      const res = await this.$API.attr.reqGoodsList(category1Id, category2Id, category3Id)
      this.goods = res.data
    },
    // 点击添加属性值跳出input事件
    addAttrValue() {
      // 在添加属性值前判断是否有属性值为空，为空不能添加
      if (this.attrInfo.attrValueList.some(item => item.valueName === '')) return
      // 在添加属性值前判断是否有相同的属性值，相同不能添加
      if (this.isRepat) return
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: '',
        flag: true // 用于查看和隐藏  单独控制每个的显示隐藏
      }
      )
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus()
      })
    },
    // 点击添加属性清除之前里面的数据
    addAttr() {
      // 切换显示隐藏
      this.isShowTable = !this.isShowTable
      // 清除数据
      this.attrInfo = {
        attrName: '', // 属性名
        attrValueList: [ // 属性值  可以有很多属性值所以用数组
          /*  {
            attrId: 0,
            valueName: ''
          } */
        ],
        categoryId: this.category3Id, // 三级分类的Id
        categoryLevel: 3 // 服务器也需要区分几级分类的ID
      }
    },
    // 点击修改的事件
    updateAttr(row) {
      this.isShowTable = !this.isShowTable
      this.attrInfo = cloneDeep(row)
      this.attrInfo.attrValueList.forEach(item =>
      // 第一个参数：对象  第二个参数：新的响应式属性 第三：新的属性的值
        this.$set(item, 'flag', false)
      )
    },
    // input失去焦点事件
    tolook(row) {
      // row 是用户最新添加的属性值
      if (row.valueName.trim() !== '') {
        this.isRepat = this.attrInfo.attrValueList.some(item => {
          if (row !== item) {
            return row.valueName === item.valueName
          }
        })
        if (!this.isRepat) { row.flag = false } else {
          this.$message({
            type: 'error',
            message: '属性值不能相同'
          })
        }
      } else {
        this.$message({
          type: 'error',
          message: '属性值不能为空白'
        })
      }
    },
    // 点击span让input显示并且自动获取焦点事件
    toEdit(row, index) {
      row.flag = true
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    // 气泡确认框删除属性值事假
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index, 1)
    },
    // 点击保存修改或添加属性和属性值事件
    async addOrUpdataAttr() {
      if (this.attrInfo.attrValueList.some(item => item.valueName === '')) {
        this.$message({
          type: 'error',
          message: '属性值不能为空，保存失败'
        })
      } else {
        this.attrInfo.attrValueList.forEach(item => delete item.flag)
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        // 显示列表
        this.isShowTable = !this.isShowTable
        // 保存成功需要再次获取数据
        this.getAttrList()
      }
    },
    // 删除数据事件
    deleteArrr(row) {
      this.$API.attr.reqDeleteAttr(row.id)
      this.getAttrList()
    }
  }
}
</script>
<style lang='less' scoped>
</style>
