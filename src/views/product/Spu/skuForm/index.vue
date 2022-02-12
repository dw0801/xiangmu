<template>
  <div>
    <el-form ref="form" label-width="90px">
      <el-form-item label="SPU的名称">{{ spu.spuName }}</el-form-item>
      <el-form-item label="SKU的名称">
        <el-input v-model="skuInfo.skuName" placeholder="sku名称" />
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input v-model="skuInfo.price" placeholder="价格(元)" type="number" />
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input v-model="skuInfo.weight" placeholder="重量(千克)" />
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input v-model="skuInfo.skuDesc" type="textarea" row="4" />
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true">
          <el-form-item v-for="attr in attrInfoList" :key="attr.id" :label="attr.attrName">
            <el-select v-model="attr.attrIdAndValueId" placeholder="请选择">
              <el-option v-for="attrValue in attr.attrValueList" :key="attrValue.id" :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true">
          <el-form-item v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id" :label="saleAttr.saleAttrName">
            <el-select v-model="saleAttr.saleAttrIdAndValueId" placeholder="请选择">
              <el-option v-for="saleAttrValue in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id" :label="saleAttrValue.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table border style="width:100%" :data="spuImageList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" prop="prop" width="80" />
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{row}">
              <img :src="row.imgUrl" style="width:100px;height:100px">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width" />
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row}">
              <el-button v-if="row.isDefault === 0" type="primary" @click="changeDefault(row)">设置默认</el-button>
              <el-button v-else type="">默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      // 储存图片信息
      spuImageList: [],
      // 存储销售属性
      spuSaleAttrList: [],
      // 存储平台属性
      attrInfoList: [],
      // 收集Sku数据的数组
      skuInfo: {
        // 第一类收集的数据（父组件给的数据）
        'category3Id': 0,
        'spuId': 0,
        'tmId': 0,
        // 第二类收集的数据（通过v-model收集的数据）
        'skuName': '',
        'price': 0,
        'weight': '',
        'skuDesc': '',
        // 第三类（需要自己书写代码）
        // 平台属性列表
        'skuAttrValueList': [
          // {
          //   "attrId": 0,
          //   "attrName": "string",
          //   "id": 0,
          //   "skuId": 0,
          //   "valueId": 0,
          //   "valueName": "string"
          // }
        ],
        // 默认图片
        'skuDefaultImg': '',
        // 图片列表
        'skuImageList': [
          // {
          //   "id": 0,
          //   "imgName": "string",
          //   "imgUrl": "string",
          //   "isDefault": "string",
          //   "skuId": 0,
          //   "spuImgId": 0
          // }
        ],
        // 销售属性列表
        'skuSaleAttrValueList': [
          // {
          //   "id": 0,
          //   "saleAttrId": 0,
          //   "saleAttrName": "string",
          //   "saleAttrValueId": 0,
          //   "saleAttrValueName": "string",
          //   "skuId": 0,
          //   "spuId": 0
          // }
        ]
      },
      spu: {},
      // 收集图片的数据,收集数据是缺少isDefault,需要整理
      imageList: []
    }
  },
  methods: {
    // 获取SkuForm数组
    async getData(category1Id, category2Id, spu) {
      this.spu = spu
      // 收集父组件给予的数据
      this.skuInfo.category3Id = spu.category3Id
      this.skuInfo.spuId = spu.id
      this.skuInfo.tmId = spu.tmId
      // 获取图片的数据
      const res = await this.$API.spu.reqSpuImageList1(spu.id)
      if (res.code === 200) {
        const list = res.data
        list.forEach(item => {
          item.isDefault = 0
        })
        this.spuImageList = list
      }
      // 获取销售属性的数据
      const res1 = await this.$API.spu.reqSpuSaleAttrList(spu.id)
      if (res1.code === 200) {
        this.spuSaleAttrList = res1.data
      }
      // 获取平台属性的数据
      const res2 = await this.$API.spu.reqAttrInfoList(category1Id, category2Id, spu.category3Id)
      if (res2.code === 200) {
        this.attrInfoList = res2.data
      }
    },
    // table表格复选框触发的事件
    handleSelectionChange(params) {
      console.log(params)
    },
    // 设置默认的排他事件
    changeDefault(row) {
      // 全部isDefault变成0
      this.spuImageList.forEach(item => {
        item.isDefault = 0
      })
      // 点击的变为1
      row.isDefault = 1
      // 手机默认图片的地址
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    // 取消事件
    cancel() {
      // 自定义事件,让父组件切换场景
      this.$emit('changeScenes', 0)
      // 清除数据
      // Object.assign:es6中新增的方法可以合并对象
      // 组件实例this._data,可以操作data当中响应式数据
      // this.$options可以获取配置对象，配置对象的data函数执行，返回的响应式数据为空的
      Object.assign(this._data, this.$options.data())
    },
    // 保存事件
    async save() {
      // 整理参数
      // 整理平台属性
      // 赋值空数组来装数据
      const arr = []
      const arr1 = []
      const { attrInfoList, skuInfo, spuSaleAttrList, imageList } = this
      attrInfoList.forEach(item => {
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(':')
          const obj = {
            attrId,
            valueId
          }
          arr.push(obj)
        }
      })
      // 整理好的参数给skuInfo.skuAttrValueList
      skuInfo.skuAttrValueList = arr

      // 整理销售属性
      spuSaleAttrList.forEach(item => {
        if (item.saleAttrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] = item.saleAttrIdAndValueId.split(':')
          const obj = {
            saleAttrId,
            saleAttrValueId
          }
          arr1.push(obj)
        }
      })
      skuInfo.skuSaleAttrValueList = arr1

      // 整理图片
      skuInfo.skuImageList = imageList.map(item => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id
        }
      })

      // 发请求
      const res = await this.$API.spu.reqAddSku(skuInfo)
      if (res.code === 200) {
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.$emit('changeScenes', 0)
      }
    }
  }
}
</script>
<style lang='less' scoped>
</style>
