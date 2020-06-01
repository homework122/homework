<template>
<div class="home">
  <div>
    <div>
      <el-row :gutter="0" class="background">
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>商品</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '' }">商品列表</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '' }">活动列表</el-breadcrumb-item>
              <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
        <el-col :span="6" :offset="8">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-form ref="form" :model="form" label-width="80px" class="left" style="width: 500px">
        <p>填写商品信息</p>
        <el-form-item label="品牌id">
          <el-input size="small" v-model="form.brandId"></el-input>
        </el-form-item>
        <el-form-item label="品牌id">
          <el-input size="small" v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="商品详情">
          <el-input size="small" v-model="form.catId"></el-input>
        </el-form-item>
        <el-form-item label="mo">
          <el-input size="small" v-model="form.goodsDetail"></el-input>
        </el-form-item>
        <el-form-item label="名字">
          <el-input size="small" v-model="form.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input size="small" v-model="form.goodsPrice"></el-input>
        </el-form-item>
        <el-form-item label="商品积分">
          <el-input size="small" v-model="form.goodsScore"></el-input>
        </el-form-item>
        <el-form-item label="商品标题">
          <el-input size="small" v-model="form.goodsTitle"></el-input>
        </el-form-item>
        <el-form-item label="关键字">
          <el-input size="small" v-model="form.keywords"></el-input>
        </el-form-item>
        <el-form-item label="是否推荐">
          <el-select v-model="form.recommend" placeholder="请选择选择">
            <el-option label="是" :value=0></el-option>
            <el-option label="否" :value=1></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status" placeholder="请选择选择">
            <el-option label="锁定" value=0></el-option>
            <el-option label="正常" value=1></el-option>
          </el-select>
        </el-form-item>
        <!--上传图片-->
        <el-upload
          class="avatar-uploader"
          action="/api/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!--富文本框-->
        <!--<el-row>-->
          <!--<el-col :span="24"><div class="grid-content bg-purple-dark"><fuwenben></fuwenben></div></el-col>-->
        <!--</el-row>-->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</div>
</template>
<script>
// import fuwenben from '../components/fuwenben'
export default {
  name: 'tianjia',
  components: {
    // fuwenben
  },
  data () {
    return {
      // 图片上传
      imageUrl: '',
      // 表单数据
      form: {
        id: '',
        brandId: '',
        catId: '',
        goodsImgs: '',
        goodsName: '',
        goodsPrice: '',
        goodsScore: '',
        keywords: '',
        goodsTitle: '',
        recommend: '',
        goodsDetail: '',
        status: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('jfidsjfosdfopspfd' + this.imageUrl)
      this.$axios.post('/api/goods/add', {
        id: this.form.id,
        brandId: this.form.brandId,
        catId: this.form.catId,
        goodsDetail: this.form.goodsDetail,
        goodsImgs: this.imageUrl,
        goodsName: this.form.goodsName,
        goodsPrice: this.form.goodsPrice,
        goodsScore: this.form.goodsScore,
        goodsTitle: this.form.goodsTitle,
        keywords: this.form.keywords,
        recommend: this.form.recommend,
        // moduleName: this.form.moduleName,
        status: this.form.status
      }, {
        // 设置请求头
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log(response)
        if (response.data.code === 200) {
          this.$message(response.data.msg)
          this.gridData.id = ''
          this.gridData.brandId = ''
          this.gridData.catId = ''
          this.gridData.goodsDetail = ''
          this.gridData.goodsImgs = ''
          this.gridData.goodsName = ''
          this.gridData.goodsPrice = ''
          this.gridData.goodsScore = ''
          this.gridData.goodsTitle = ''
          this.gridData.keywords = ''
          this.gridData.recommend = ''
          this.gridData.status = ''
        } else {
          console.log('出错')
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 图片上传
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  },
  mounted: function () {
    // 请求数据
    this.$axios.post('/api/order/list', {
      page: this.currentPage,
      pageSize: this.pageSize
    },
    {
      // 设置请求头
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response.data.data.list)
      this.list = response.data.data.list
      this.total = response.data.data.total
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>
<style scoped>
  .left{
    text-align: left;
    margin-top: 15px;
  }
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
