<template>
  <div>
    <div>
      <el-row :gutter="0">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>商品</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/商品列表' }">商品列表</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/indexs' }">活动列表</el-breadcrumb-item>
              <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
        <el-col :span="6" :offset="12">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
    </div>
    <!--// 查询-->
    <div class="left">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="商品名称：">
          <el-input size="mini" v-model="formInline.brandName" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择">
            <el-option label="正常" value=1></el-option>
            <el-option label="锁定" value=0></el-option>
            <el-option label="全部" value=""></el-option>
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
          <el-form-item label="品牌">
            <el-input v-model="gridData.brandDesc"></el-input>
          </el-form-item>
          <el-form-item label="商品图片">
            <el-input v-model="gridData.brandLogo"></el-input>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="gridData.brandName"></el-input>
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
        label="头像"
        width="120">
        <template slot-scope="scope">
          <!--园头像-->
          <el-image style="border-radius: 100%;width: 50px;height: 50px;text-align: center" :size="50" :src="'http://106.12.22.92:8080'+scope.row.brandLogo"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="brandName"
        label="商品名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="brandDesc"
        label="附属品牌"
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
            <el-form :label-position="gridData" label-width="80px" :model="gridData.id">
              <el-form-item label="品牌">
                <el-input v-model="gridData.id" disabled></el-input>
              </el-form-item>
              <el-form-item label="品牌">
                <el-input v-model="gridData.brandDesc"></el-input>
              </el-form-item>
              <el-form-item label="商品图片">
                <el-input v-model="gridData.brandLogo"></el-input>
              </el-form-item>
              <el-form-item label="商品名称">
                <el-input v-model="gridData.brandName"></el-input>
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
  name: 'pinpai',
  data () {
    return {
      // 查询值
      formInline: {
        brandName: '',
        status: ''

      },
      // 总条数
      total: '',
      // 当前页
      currentPage: 1,
      // 显示条数
      pageSize: 5,
      // 数据
      list: [],
      // 变量存储
      arr: 0,
      // 弹出框对应值
      gridData: {
        id: '',
        brandName: '',
        brandLogo: '',
        brandDesc: '',
        status: '',
        isDelete: '',
        createTime: ''
      }
    }
  },
  methods: {
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
    // 分页获取数据
    shuju () {
      this.$axios.post('/api/brand/list', {
        page: this.currentPage,
        pageSize: this.pageSize
      }, {
        // 设置请求头
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log(response)
        this.list = response.data.data.list
        this.total = response.data.data.total
        // console.log(typeof response.data)
        // this.count = response.data.data
        // console.log(this.count)
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
      console.log(pag)
      this.currentPage = pag
      this.shuju()
    },
    // 查询
    chaxun () {
      this.$axios.post('/api/brand/list', { brandName: this.formInline.brandName, page: this.currentPage, pageSize: this.pageSize, status: this.formInline.status },
        {
          // 设置请求头
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
        // console.log(response)
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
        this.$axios.post('/api/brand/add', {
          id: this.gridData.id,
          brandName: this.gridData.brandName,
          brandLogo: this.gridData.brandLogo,
          brandDesc: this.gridData.brandDesc,
          goodsImgs: this.gridData.isDelete,
          goodsName: this.gridData.createTime,
          status: this.gridData.status
        }, {
          // 设置请求头
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          console.log(response)
          if (response.data.code === 200) {
            // this.shuju()
            this.list = response.data.data
            this.$message(response.data.msg)
            this.gridData.id = ''
            this.gridData.brandName = ''
            this.gridData.brandLogo = ''
            this.gridData.brandDesc = ''
            this.gridData.isDelete = ''
            this.gridData.createTime = ''
            this.gridData.status = ''
          } else {
            console.log('出错')
          }
        }).catch((err) => {
          console.log(err)
        })
      } else if (this.arr === 1) {
        this.$axios.post('/api/brand/edit', {
          id: this.gridData.id,
          brandName: this.gridData.brandName,
          brandLogo: this.gridData.brandLogo,
          brandDesc: this.gridData.brandDesc,
          goodsImgs: this.gridData.isDelete,
          goodsName: this.gridData.createTime,
          status: this.gridData.status
        }, {
          // 设置请求头
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          if (response.data.code === 200) {
            console.log(response)
            this.shuju()
            // window.location.reload()
            this.$message(response.data.msg)
            this.gridData.id = ''
            this.gridData.brandName = ''
            this.gridData.brandLogo = ''
            this.gridData.brandDesc = ''
            this.gridData.isDelete = ''
            this.gridData.createTime = ''
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
    // 取消
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
      this.arr = 1
    },
    // 删除
    handleDelete (index, row) {
      console.log(row)
      this.$axios.post('/api/brand/delete', { id: row.id }, {
        // 设置请求头
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.data.code === 200) {
          console.log(response)
          // this.$alert(response.data.msg)
          this.list.splice(row.id, 1)
          // this.total--
          // window.location.reload()
          this.shuju()
          this.$message(response.data.msg)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted: function () {
    // 请求数据
    this.$axios.post('/api/brand/list', {
      brandName: this.formInline.brandName,
      page: this.currentPage,
      pageSize: this.pageSize,
      status: this.formInline.status
    }, {
      // 设置请求头
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response)
      this.list = response.data.data.list
      this.total = response.data.data.total
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>
<style scoped>
  .left {
    text-align: left;
  }

  .el-form-item {
    margin-bottom: 5px;
  }
</style>
