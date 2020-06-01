<template>
  <div>
    <div >
      <el-row :gutter="0" class="background">
        <el-col :span="10" >
          <div class="grid-content bg-purple">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>商品</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/商品列表' }">商品列表</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/indexs' }">活动列表</el-breadcrumb-item>
              <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
        <el-col :span="6" :offset="8">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
    </div>
    <!--// 查询-->
    <div class="left">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="商品名称：">
          <el-input size="mini" v-model="formInline.goodsName" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="上架状态：">
          <el-select size="mini" v-model="formInline.status" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option label="上架" value="1"></el-option>
            <el-option label="下架" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="chaxun">查询</el-button>
        </el-form-item>
      </el-form>
      <!--// 添加-->
      <el-popover
        placement="right"
        width="400"
        trigger="click">
        <el-form :label-position="gridData" label-width="80px" :model="gridData.id">
          <el-form-item label="id">
            <el-input v-model="gridData.id"></el-input>
          </el-form-item>
          <el-form-item label="品牌ID">
            <el-input v-model="gridData.brandId"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-input v-model="gridData.brandId"></el-input>
          </el-form-item>
          <el-form-item label="分类ID">
            <el-input v-model="gridData.catId"></el-input>
          </el-form-item>
          <el-form-item label="商品详情">
            <el-input v-model="gridData.goodsDetail"></el-input>
          </el-form-item>
          <el-form-item label="商品图片">
            <!--上传图片-->
            <el-upload
              class="avatar-uploader"
              action="/api/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-picture avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="gridData.goodsName"></el-input>
          </el-form-item>
          <el-form-item label="商品价">
            <el-input v-model="gridData.goodsPrice"></el-input>
          </el-form-item>
          <el-form-item label="商品积分">
            <el-input v-model="gridData.goodsScore"></el-input>
          </el-form-item>
          <el-form-item label="商品标题">
            <el-input v-model="gridData.goodsTitle"></el-input>
          </el-form-item>
          <el-form-item label="关键字">
            <el-input v-model="gridData.keywords"></el-input>
          </el-form-item>
          <el-form-item label="是否推荐" >
            <el-select v-model="gridData.recommend" placeholder="请选择">
              <el-option label="是" :value=1></el-option>
              <el-option label="否" :value=0></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="gridData.status" placeholder="请选择">
              <el-option label="正常" value=1></el-option>
              <el-option label="锁定" value=0></el-option>
            </el-select>
          </el-form-item>
          <el-button type="button" @click="tijao">确认</el-button>
          <el-button @click="quxiao">取消</el-button>
        </el-form>
        <el-button size="mini" slot="reference" @click=" add (scope.$index, scope.row)">添加</el-button>
      </el-popover>
    </div>
    <!--// 表格-->
    <el-table
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
      prop="id"
      label="商品id"
      width="120">
      </el-table-column>
        <el-table-column
          prop=""
          label="头像">
          <template slot-scope="scope">
            <!--园头像-->
            <el-image style="border-radius: 100%;width: 50px;height: 50px;text-align: center" :size="50" :src="scope.row.goodsImgs"></el-image>
          </template>
      </el-table-column>
      <el-table-column
        prop="goodsName"
        label="商品名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="goodsPrice"
        label="价格/货号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="brandId"
        label="品牌ID"
        width="120">
      </el-table-column>
      <el-table-column
        prop="goodsDetail"
        label="商品详情"
        width="120">
      </el-table-column>
      <el-table-column
        prop="keywords"
        label="关键字"
        width="120">
      </el-table-column>
      <el-table-column
        prop="goodsDetail"
        label="销量"
        width="120">
      </el-table-column>
      <el-table-column
        prop="goodsScore"
        label="积分"
        width="120">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">正常</span>
          <span v-if="scope.row.status == 0">锁定</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="120">
        <template slot-scope="scope">{{dateFormat('YYYY-mm-dd HH:MM:SS', scope.row.createTime)}}</template>
      </el-table-column>
      <el-table-column label="操作"
                       width="150">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            width="400"
            trigger="click">
            <el-form :label-position="gridData" label-width="80px" :model="gridData">
              <el-form-item label="商品id">
                <el-input v-model="gridData.id"></el-input>
              </el-form-item>
              <el-form-item label="品牌ID">
                <el-input v-model="gridData.brandId"></el-input>
              </el-form-item>
              <el-form-item label="活动区域">
                <el-input v-model="gridData.brandId"></el-input>
              </el-form-item>
              <el-form-item label="分类ID">
                <el-input v-model="gridData.catId"></el-input>
              </el-form-item>
              <el-form-item label="商品详情">
                <el-input v-model="gridData.goodsDetail"></el-input>
              </el-form-item>
              <el-form-item label="商品图片">
              <el-input v-model="gridData.goodsImgs"></el-input>
              </el-form-item>
              <el-form-item label="商品名称">
                <el-input v-model="gridData.goodsName"></el-input>
              </el-form-item>
              <el-form-item label="商品价">
                <el-input v-model="gridData.goodsPrice"></el-input>
              </el-form-item>
              <el-form-item label="商品积分">
                <el-input v-model="gridData.goodsScore"></el-input>
              </el-form-item>
              <el-form-item label="商品标题">
                <el-input v-model="gridData.goodsTitle"></el-input>
              </el-form-item>
              <el-form-item label="关键字">
                <el-input v-model="gridData.keywords"></el-input>
              </el-form-item>
                <el-form-item label="是否推荐" >
                  <el-select v-model="gridData.recommend" placeholder="请选择">
                    <el-option label="是" :value=1></el-option>
                    <el-option label="否" :value=0></el-option>
                  </el-select>
                </el-form-item>
              <el-form-item label="状态" >
                  <el-select v-model="gridData.status" placeholder="请选择">
                    <el-option label="正常" :value=1></el-option>
                    <el-option label="锁定" :value=0></el-option>
                  </el-select>
              </el-form-item>
              <el-button type="button" @click="tijao">确认</el-button>
              <el-button @click="quxiao">取消</el-button>
            </el-form>
            <el-button size="mini" slot="reference" @click=" handleEdit (scope.$index, scope.row)">编辑</el-button>
          </el-popover>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        background
        :page-sizes="[3, 5, 8, 15]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'shangpinliebiao',
  data () {
    return {
      // 上传图片值
      imageUrl: '',
      // 查询值
      formInline: {
        goodsName: '',
        status: ''
      },
      // 数据
      list: [],
      // 变量存储
      arr: 0,
      // 总条数
      total: '',
      // 当前页
      currentPage: 1,
      // 显示条数
      pageSize: 5,
      // 弹出框对应值
      gridData: {
        id: '',
        brandId: '',
        catId: '',
        goodsDetail: '',
        goodsName: '',
        goodsPrice: '',
        goodsScore: '',
        goodsTitle: '',
        keywords: '',
        recommend: '',
        status: ''
      },
      s: ''
    }
  },
  methods: {
    // 图片上传
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log('图片' + this.imageUrl)
    },
    beforeAvatarUpload (file) {
      console.log('图片' + file)
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
    // 日期时间转换
    dateFormat (fmt, date) {
      let ret = ''
      date = new Date(date)
      const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      }
      for (const k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
          )
        }
      }
      return fmt
    },
    // 获取数据
    shuju () {
      // 请求数据
      this.$axios.post('/api/goods/list', {
        goodsName: this.formInline.id,
        status: this.formInline.status,
        page: this.currentPage,
        pageSize: this.pageSize
      },
      {
        // 设置请求头
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log(typeof response.data.data.list)
        this.list = response.data.data.list
        console.log(this.list)
        this.total = response.data.data.total
      }).catch((err) => {
        console.log(err)
      })
    },
    // 每页显示条数
    handleSizeChange (val) {
      this.pageSize = val
      this.shuju()
    },
    // 分页
    handleCurrentChange (pag) {
      console.log('mdfoidsfm=' + pag)
      this.currentPage = pag
      this.shuju()
    },
    // 查询
    chaxun () {
      this.$axios.post('/api/goods/list', {
        goodsName: this.formInline.goodsName,
        status: this.formInline.status,
        page: this.currentPage,
        pageSize: this.pageSize
      },
      {
        // 设置请求头
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log(response)
        if (response.data.code === 200) {
          this.list = response.data.data.list
          this.total = response.data.data.total
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 确认修改添加
    tijao () {
      if (this.arr === 0) {
        console.log('jfidsjfosdfopspfd' + this.gridData.status)
        console.log(typeof this.gridData.status)
        this.$axios.post('/api/goods/add', {
          id: this.gridData.id,
          brandId: this.gridData.brandId,
          catId: this.gridData.catId,
          goodsDetail: this.gridData.goodsDetail,
          goodsImgs: this.imageUrl,
          goodsName: this.gridData.goodsName,
          goodsPrice: this.gridData.goodsPrice,
          goodsScore: this.gridData.goodsScore,
          goodsTitle: this.gridData.goodsTitle,
          keywords: this.gridData.keywords,
          recommend: this.gridData.recommend,
          status: this.gridData.status
        }, {
          // 设置请求头
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          console.log(response)
          if (response.data.code === 200) {
            this.shuju()
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
      } else if (this.arr === 1) {
        this.$axios.post('/api/goods/edit', {
          id: this.gridData.id,
          brandId: this.gridData.brandId,
          catId: this.gridData.catId,
          goodsDetail: this.gridData.goodsDetail,
          goodsImgs: this.gridData.goodsImgs,
          goodsName: this.gridData.goodsName,
          goodsPrice: this.gridData.goodsPrice,
          goodsScore: this.gridData.goodsScore,
          goodsTitle: this.gridData.goodsTitle,
          keywords: this.gridData.keywords,
          recommend: this.gridData.recommend,
          status: this.gridData.status
        }, {
          // 设置请求头
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          if (response.data.code === 200) {
            this.shuju()
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
          }
          // console.log(response)
          // console.log(typeof response.data.data.list[0].goodsImgs)
          // console.log(JSON.parse(response.data.data.list[0].goodsImgs).img.url)
          // this.list = response.data.data.list
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    // 修改
    quxiao () {
      this.shuju()
    },
    // 添加
    add () {
      this.arr = 0
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
    },
    // 点击弹出框
    handleEdit (index, row) {
      this.gridData = row
      console.log(typeof this.gridData.status)
      this.arr = 1
    },
    // 删除
    handleDelete (index, row) {
      this.$axios.post('/api//goods/delete', { id: row.id }, {
        // 设置请求头
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.data.code === 200) {
          this.list.splice(row.id, 1)
          // window.location.reload()
          this.$message(response.data.msg)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted: function () {
    // 请求数据
    this.$axios.post('/api/goods/list', {
      goodsName: this.formInline.id,
      status: this.formInline.status,
      page: this.currentPage,
      pageSize: this.pageSize
    },
    {
      // 设置请求头
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(typeof response.data.data.list)
      this.list = response.data.data.list
      console.log(this.list)
      this.total = response.data.data.total
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>
<style scoped>
  .background{
    background-color: #409EFF;
    padding: 25px;
  }
  .color {
      color: white;
  }
  .left {
    text-align: left;
  }
.el-icon-picture{
  font-size: 30px;
  color: #00CCFF;
}
  .el-icon-picture {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
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
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-form-item {
    margin-bottom: 5px;
  }
</style>
