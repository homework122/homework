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
          <el-input size="mini" v-model="formInline.goodsName" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select size="mini" v-model="formInline.status" placeholder="全部">
            <el-option label="正常" :value=1></el-option>
            <el-option label="锁定" :value=0></el-option>
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
          <el-form-item label="商品id">
            <el-input v-model="gridData.id"></el-input>
          </el-form-item>
          <el-form-item label="catName">
            <el-input v-model="gridData.catName"></el-input>
          </el-form-item>
          <el-form-item label="catDesc">
            <el-input v-model="gridData.catDesc"></el-input>
          </el-form-item>
          <el-form-item label="是否删除">
            <el-input v-model="gridData.isDelete"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="gridData.status" placeholder="请选择">
              <el-option label="正常" :value=1></el-option>
              <el-option label="锁定" :value="0"></el-option>

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
        width="230">
      </el-table-column>
      <el-table-column
        prop="catName"
        label="名称"
        width="160">
      </el-table-column>
      <el-table-column
        prop="catDesc"
        label="catDesc"
        width="150">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">正常</span>
          <span v-if="scope.row.status == 0">锁定</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="isDelete"
        label="是否删除"
        width="100">
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
              <el-form-item label="catName">
                <el-input v-model="gridData.catName"></el-input>
              </el-form-item>
              <el-form-item label="catDesc">
                <el-input v-model="gridData.catDesc"></el-input>
              </el-form-item>
              <el-form-item label="是否删除">
                <el-input v-model="gridData.isDelete"></el-input>
              </el-form-item>
              <el-form-item label="状态">
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
  name: 'fenlie',
  data () {
    return {
      // 查询值
      formInline: {
        status: '',
        goodsName: ''
      },
      // 数据
      list: [],
      // 变量存储
      arr: 0,
      // 弹出框对应值
      gridData: {
        id: '',
        catName: '',
        catDesc: '',
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
    shuju () {
      // 请求数据
      this.$axios.post('/api/category/list', {
        page: this.currentPage,
        pageSize: this.pageSize,
        catName: this.catName
      },
      {
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
      this.$axios.post('/api/goods/list', { goodsName: this.formInline.goodsName, status: this.formInline.status },
        {
          // 设置请求头
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
        if (response.data.code === 200) {
          this.list = response.data.data.list
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 确认修改添加
    tijao () {
      if (this.arr === 0) {
        // 添加请求
        this.$axios.post('/api/category/add', {
          id: this.gridData.id,
          catName: this.gridData.catName,
          catDesc: this.gridData.catDesc,
          status: this.gridData.status,
          isDelete: this.gridData.isDelete,
          createTime: this.gridData.createTime
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
            this.gridData.catName = ''
            this.gridData.catDesc = ''
            this.gridData.status = ''
            this.gridData.isDelete = ''
            this.gridData.createTime = ''
          } else {
            console.log('出错')
          }
        }).catch((err) => {
          console.log(err)
        })
      } else if (this.arr === 1) {
        // 修改请求
        this.$axios.post('/api//category/edit', {
          id: this.gridData.id,
          catName: this.gridData.catName,
          catDesc: this.gridData.catDesc,
          status: this.gridData.status,
          isDelete: this.gridData.isDelete,
          createTime: this.gridData.createTime
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
            this.gridData.catName = ''
            this.gridData.catDesc = ''
            this.gridData.status = ''
            this.gridData.isDelete = ''
            this.gridData.createTime = ''
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
    },
    // 点击弹出框修改
    handleEdit (index, row) {
      this.gridData = row
      this.arr = 1
    },
    // 删除
    handleDelete (index, row) {
      this.$axios.post('/api/category/delete', { id: row.id }, {
        // 设置请求头
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.data.code === 200) {
          this.$alert(response.data.msg)
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
    this.$axios.post('/api/category/list', {
      page: this.currentPage,
      pageSize: this.pageSize,
      catName: this.catName
    },
    {
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
