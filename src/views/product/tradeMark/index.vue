<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="showDialog">添加</el-button>
    <el-table style="width:100%" border :data="list">
      <el-table-column
        type="index"
        label="序号"
        width="80px"
        align="center"
      />
      <el-table-column
        prop="tmName"
        label="品牌名称"
      />
      <el-table-column
        label="品牌LOGO"
      >
        <template slot-scope="{row}">
          <img :src="row.logoUrl" alt="" style="width:200px;height:52px">
        </template>
      </el-table-column>
      <el-table-column
        prop="prop"
        label="操作"
      >
        <template slot-scope="{row}">
          <!-- slot-scope="{row}" -->
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-Pagination
      style="margin-top:20px;textAlign:center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[3,5,10]"
      layout="prev,pager,next,jumper,->,sizes,total"
      @current-change="getPagelist"
      @size-change="handleSizeChange"
    />

    <el-dialog :title="tmForm.id ? '修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" style="width:80%" :model="tmForm" :rules="rules">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input v-model="tmForm.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default
{ name: 'TradeMark',
  data() {
    // 自定义校验规则
    var validateTmName = (rule, value, callback) => {
      // 自定义校验规则
      if (value.length < 2 || value.length > 10) {
        callback(new Error('品牌名称2-10位'))
      } else {
        callback()
      }
    }
    return {
      // 分页器第几页
      page: 1,
      // 当前页面展示的数据条数
      limit: 3,
      // 总共数据条数
      total: 0,
      // 列表展示的数据
      list: [],
      // 对话框显示隐藏
      dialogFormVisible: false,
      // 手机品牌的信息
      tmForm: {
        tmName: '',
        logoUrl: ''
      },
      // 表单验证规则
      rules: {
        tmName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { validator: validateTmName, trigger: 'blur' }
        ],
        logoUrl: [
          { required: true, message: '请选择品牌图片' }
        ]

        // // 品牌LOGO验证
        // tmName: [
        //   { required: true, message: '请输入活动名称', trigger: 'blur' },
        //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
        // ],
        // logoUrl: [
        //   { required: true, message: '请选择品牌图片' }
        // ]
        // // 品牌名称验证

      }
    }
  },
  mounted() {
    this.getPagelist()
  },
  methods: {
    // 获取品牌列表函数
    async getPagelist(pager = 1) {
      this.page = pager
      // 获取品牌列表接口
      const result = await this.$API.trademark.reqTradeMarkList(this.page, this.limit)
      // console.log(result)
      if (result.code === 200) {
        this.total = result.data.total
        this.list = result.data.records
      }
    },
    handleSizeChange(limit) {
      this.limit = limit
      this.getPagelist()
    },
    // 添加品牌事件
    showDialog() {
      this.dialogFormVisible = !this.dialogFormVisible
      // 清除数据
      this.tmForm = { tmName: '', logoUrl: '' }
    },
    // 修改某个品牌
    updateTradeMark(row) {
      // 展示对话框
      this.dialogFormVisible = !this.dialogFormVisible
      // 将已有的数据显示
      this.tmForm = { ...row }
    },
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      // console.log(res)
      // res上传成功之后返回前端的数据
      // 收集品牌图片
      this.tmForm.logoUrl = res.data
    },
    // 图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 确定添加和修改事件
    AddOrUpdateTradeMark() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (valid) {
          this.dialogFormVisible = false
          // 发请求
          const result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm)
          // console.log(result)
          if (result.code === 200) {
            this.$message({
              message: this.tmForm.id ? '修改品牌成功' : '添加品牌成功',
              type: 'success'
            })
            // 如果添加品牌：停留在第一页  修改品牌留在当前页码
            this.getPagelist(this.tmForm.id ? this.page : 1)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 删除品牌事件
    deleteTradeMark(row) {
      console.log(row)
      this.$confirm(`你确定删除${row.tmName}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await this.$API.trademark.reqDeleteTradeMark(row.id)
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getPagelist(this.list.length > 1 ? this.page : this.page - 1)
        } else {
          this.$message({
            type: 'error',
            message: '删除失败!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
