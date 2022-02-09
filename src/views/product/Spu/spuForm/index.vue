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
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="spuImageList"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select v-model="attrId" :placeholder="`还有${unSelectSaleAttr.length}未选择`">
          <el-option v-for="item in unSelectSaleAttr" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrId">添加销售属性</el-button>
        <el-table border :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" align="center" width="80" />
          <el-table-column prop="saleAttrName" label="属性名" width="width" />
          <el-table-column prop="prop" label="属性值名列表" width="width">
            <template slot-scope="{row}">
              <el-tag
                v-for="item in row.spuSaleAttrValueList"
                :key="item.id"
                closable
                :disable-transitions="false"
              >
                <!-- @close="handleClose(tag)" -->
                {{ item.saleAttrValueName }}
              </el-tag>
              <el-input
                v-if="row.inputVisible"
                ref="saveTagInput"
                v-model="row.inputValue"
                class="input-new-tag"
                size="small"
              />
              <!-- @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm" -->
              <!-- @click="showInput" -->
              <el-button v-else class="button-new-tag" size="small">添加+</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="width">
            <template slot-scope="{row}">
              <el-button type="danger" size="mini" icon="el-icon-delete" />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button @click="$emit('changeScene',0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default
{ name: 'SpuForm',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      spu: {
        // 品牌的ID
        tmId: 0,
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
      attrId: '' // 收集未选择的销售属性Id
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
      // 获取图片的数据
      const resSale = await this.$API.spu.reqBaseSaleAttrList()
      if (resSale.code === 200) {
        this.saleAttrList = resSale.data
      }
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
