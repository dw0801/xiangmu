<template>
  <div>

    <el-form label-width="80px">
      <el-form-item label="SPU名称">
        <el-input v-model="spu.spuName" placeholder="SPU名称" />
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="spu.tmId" placeholder="请选择品牌">
          <el-option v-for="item in tradeMarkList" :key="item.id" :label="item.tmName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input v-model="spu.description" type="textarea" placeholder="SPU描述" rows="4" />
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload action="/dev-api/admin/product/fileUpload" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess" :file-list="spuImageList">
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select v-model="attr" :placeholder="`还有${unSelectSaleAttr.length}未选择`">
          <el-option v-for="item in unSelectSaleAttr" :key="item.id" :label="item.name" :value="`${item.id}:${item.name}`" />
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attr" @click="addSaleAttr">添加销售属性</el-button>
        <el-table border :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" align="center" width="80" />
          <el-table-column prop="saleAttrName" label="属性名" width="width" />
          <el-table-column prop="prop" label="属性值名列表" width="width">
            <template slot-scope="{row}">
              <!-- 用于展示已有属性值的数据的 -->
              <el-tag v-for="(item,index) in row.spuSaleAttrValueList" :key="item.id" closable :disable-transitions="false" @close="row.spuSaleAttrValueList.splice(index,1)">

                {{ item.saleAttrValueName }}
              </el-tag>
              <el-input v-if="row.inputVisible" ref="saveTagInput" v-model="row.inputValue" class="input-new-tag" size="small" @blur="handleInputConfirm(row)" />
              <!-- @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm" -->
              <!-- @click="showInput" -->
              <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">添加+</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="spu.spuSaleAttrList.splice($index,1)" />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default
  {
    name: 'SpuForm',
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        spu: {
          // 品牌的ID
          tmId: '',
          // 三级分类的ID
          category3Id: 0,
          // 描述
          description: '',
          // spu的名称
          spuName: '',
          // 收集SPU图片的信息
          spuImageList: [
            /*  {
                  'id': 0,
                  'imgName': 'string',
                  'imgUrl': 'string',
                  'spuId': 0
                } */
          ],
          // 收集平台值和属性
          spuSaleAttrList: [
            /* {
                  'baseSaleAttrId': 0,
                  'id': 0,
                  'saleAttrName': 'string',
                  'spuId': 0,
                  'spuSaleAttrValueList': [
                    {
                      'baseSaleAttrId': 0,
                      'id': 0,
                      'isChecked': 'string',
                      'saleAttrName': 'string',
                      'saleAttrValueName': 'string',
                      'spuId': 0
                    }
                  ]
                } */
          ]
        }, // 存储spu信息  修改的时候有这些数据  但是添加没有  所以要写下来
        tradeMarkList: [], // 存储品牌信息
        spuImageList: [], // 存储图片信息
        saleAttrList: [], // 销售属性
        attr: '' // 收集未选择的销售属性Id
      }
    },
    computed: {
      unSelectSaleAttr() {
        return this.saleAttrList.filter(item => {
          return this.spu.spuSaleAttrList.every(item1 => {
            return item.name !== item1.saleAttrName
          })
        })
      }
    },
    methods: {
      // 销售属性中input文本框失去焦点的函数
      handleInputConfirm(row) {
        const { baseSaleAttrId, inputValue } = row
        if (inputValue.trim() === '') {
          this.$message({
            message: '属性值不能为空',
            type: 'error'
          })
          return
        }
        if (row.spuSaleAttrValueList.some(item => item.saleAttrValueName === inputValue)) {
          this.$message({
            message: '属性值不能相同',
            type: 'error'
          })
          return
        }
        const newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue }
        row.spuSaleAttrValueList.push(newSaleAttrValue)
        row.inputVisible = false
      },
      // 销售属性中添加按钮的函数
      addSaleAttrValue(row) {
        this.$set(row, 'inputVisible', true)
        this.$set(row, 'inputValue', '')
      },
      // 添加新的销售属性
      addSaleAttr() {
        const [baseSaleAttrId, saleAttrName] = this.attr.split(':')
        const newSaleAttr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] }
        this.spu.spuSaleAttrList.push(newSaleAttr)
        this.attr = ''
      },
      // 照片墙删除的时候触发的函数
      handleRemove(file, fileList) {
        // file:删除的那张照片
        // fileList:剩余的照片
        this.spuImageList = fileList
      },
      // 照片添加触发的函数
      handleSuccess(fileList) {
        this.spuImageList = fileList
      },
      // 照片墙预览的时候触发的函数
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      // 父组件点击修改按钮的事件
      async initSpuData(spu) {
        // 获取相应的spu数据
        const resSpu = await this.$API.spu.reqSpu(spu.id)
        if (resSpu.code === 200) {
          this.spu = resSpu.data
        }
        // 获取品牌的数据
        const resPin = await this.$API.spu.reqTradeMarkList()
        if (resPin.code === 200) {
          this.tradeMarkList = resPin.data
        }
        // 获取图片的数据
        const resImage = await this.$API.spu.reqSpuImageList(spu.id)
        if (resImage.code === 200) {
          // 服务器返回的数据中名字不是url name 需要在处理一下数组
          const listArr = resImage.data
          listArr.forEach(item => {
            item.name = item.imaName
            item.url = item.imgUrl
          })
          this.spuImageList = listArr
        }
        // 获取平台全部销售属性的数据
        const resSale = await this.$API.spu.reqBaseSaleAttrList()
        if (resSale.code === 200) {
          this.saleAttrList = resSale.data
        }
      },
      // 点击保存触发的事件
      async addOrUpdateSpu() {
        // 整理参数，需要整理照片墙里面的数据，因为照片墙要显示必须是那么和url，然而服务器的是imgName和imgUrl
        this.spu.spuImageList = this.spuImageList.map(item => {
          return {
            imageName: item.name,
            imageUrl: (item.response && item.response.data) || item.url
          }
        })
        const res = await this.$API.spu.reqAddOrUpdateSpu(this.spu)
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          // 通知父组件回到场景0
          this.$emit('changeScene', 0)
        }
        // 清除数据
        Object.assign(this._data, this.$options.data())
      },
      // 父组件点击添加按钮的事假
      async addSpuData(category3Id) {
        // 收集三级分类id
        this.spu.category3Id = category3Id
        // 获取品牌的数据
        const resPin = await this.$API.spu.reqTradeMarkList()
        if (resPin.code === 200) {
          this.tradeMarkList = resPin.data
        }
        // 获取平台全部销售属性的数据
        const resSale = await this.$API.spu.reqBaseSaleAttrList()
        if (resSale.code === 200) {
          this.saleAttrList = resSale.data
        }
      },
      // 点击取消是清楚数据
      cancel() {
        this.$emit('changeScene', 0)
        // Object.assign:es6中新增的方法可以合并对象
        // 组件实例this._data,可以操作data当中响应式数据
        // this.$options可以获取配置对象，配置对象的data函数执行，返回的响应式数据为空的
        Object.assign(this._data, this.$options.data())
      }
    }
  }
</script>
<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
