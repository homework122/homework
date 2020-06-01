<template>
  <div>
    <div>
      <el-row>
        <el-col :span="19">
          <div class="grid-content bg-purple text-align">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/huiyuan' }">首页</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple-light text-align"></div>
        </el-col>
      </el-row>
    </div>
    <!--// 查询-->
    <div class="text-align">
    </div>
    <!--// 添加-->
    <el-row :gutter="20" class="text-align">
      <el-col :span="2" ><div class="grid-content bg-purple"><el-popover
        placement="right"
        width="400"
        trigger="click">
        <el-form :label-position="gridData" label-width="80px" :model="gridData.id">
          <el-form-item label="id">
            <el-input v-model="gridData.id"></el-input>
          </el-form-item>
          <el-form-item label="微信">
            <el-input v-model="gridData.openId"></el-input>
          </el-form-item>
          <el-form-item label="会员昵称">
            <el-input v-model="gridData.memberName"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-input v-model="gridData.memberHeader"></el-input>
          </el-form-item>
          <el-form-item label="会员电话">
            <el-input v-model="gridData.memberPhone"></el-input>
          </el-form-item>
          <el-form-item label="是否删除">
            <el-input v-model="gridData.isDelete"></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              align="right"
              type="date"
              v-model="gridData.createTime"
              placeholder="选择日期"
              :picker-options="pickerOptions">
              <template slot-scope="scope">{{dateFormat('YYYY-mm-dd HH:MM:SS', scope.row.createTime)}}</template>
            </el-date-picker>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="gridData.status" placeholder="请选择">
              <el-option label="正常" value="1"></el-option>
              <el-option label="锁定" value="0"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-button type="button" @click="tijao">确认</el-button>
          <el-button @click="quxiao">取消</el-button>
        </el-form>
        <el-button size="mini" style="margin-top: 10px;background-color: #66B1FF;color: white" slot="reference" @click=" add ">添加</el-button>
      </el-popover></div></el-col>
      <!--// 查询-->
      <el-col :span="22" ><div class="grid-content bg-purple"><el-form :inline="true" :model="formInline" class="demo-form-inline" >
        <el-form-item label="会员名称：">
          <el-input size="mini" v-model="formInline.memberName" placeholder="会员名称"></el-input>
        </el-form-item>
        <el-form-item label="会员名称：">
          <el-input size="mini" v-model="formInline.memberPhone" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="gridData.status" placeholder="请选择">
            <el-option label="正常" :value=1></el-option>
            <el-option label="锁定" :value=0></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="chaxun ()">查询</el-button>
        </el-form-item>
      </el-form></div></el-col>
    </el-row>
    <!--// 列表-->
    <div class="left">
      <el-table
        :data="tableData"
        style="width: 100%;"
        :row-class-name="tableRowClassName">
        <el-table-column
          prop="id"
          label="会员ID"
          width="120">
        </el-table-column>
        <el-table-column
          prop="openId"
          label="微信OPENID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="memberName"
          label="会员昵称">
        </el-table-column>
        <el-table-column
          prop=""
          label="头像">
          <template slot-scope="scope">
       <!--园头像-->
            <el-image style="border-radius: 100%;width: 50px;height: 50px;text-align: center" :size="50" :src="scope.row.memberHeader"></el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="memberPhone"
          label="会员电话">
        </el-table-column>

        <el-table-column
          prop="status"
          label="状态"
          width="160">
          <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                @change="zhuangtai(scope.$index, scope.row)"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="正常"
                inactive-text="锁定"
                :active-value=1
                :nactive-value=0>
              </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="isDelete"
          label="是否删除">
        </el-table-column>
        <el-table-column
          label="创建时间"
          width="120">
          <template slot-scope="scope">{{dateFormat('YYYY-mm-dd HH:MM:SS', scope.row.createTime)}}</template>
        </el-table-column>
            <el-table-column label="操作"
                             width="150">
              <template slot-scope="scope">
                <!--// 编辑-->
                <el-popover
                  placement="right"
                  width="400"
                  trigger="click">
                  <el-form :label-position="gridData" label-width="80px" :model="gridData.id">
                    <el-form-item label="id">
                      <el-input v-model="gridData.id"></el-input>
                    </el-form-item>
                    <el-form-item label="微信">
                      <el-input v-model="gridData.openId"></el-input>
                    </el-form-item>
                    <el-form-item label="会员昵称">
                      <el-input v-model="gridData.memberName"></el-input>
                    </el-form-item>
                    <el-form-item label="头像">
                      <el-input v-model="gridData.memberHeader"></el-input>
                    </el-form-item>
                    <el-form-item label="会员电话">
                      <el-input v-model="gridData.memberPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="是否删除">
                      <el-input v-model="gridData.isDelete"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间">
                      <el-date-picker
                        align="right"
                        type="date"
                        v-model="gridData.createTime"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                        <template slot-scope="scope">{{dateFormat('YYYY-mm-dd HH:MM:SS', scope.row.createTime)}}</template>
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item label="状态">
                      <template slot-scope="scope">
                        <span v-if="scope.row.status == 1">正常</span>
                        <span v-if="scope.row.status == 0">锁定</span>
                      </template>
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
    </div>
    <!--分页-->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        background
        :page-sizes="[3, 5, 8, 15]"
        layout="total,sizes,prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>

export default {
  name: 'huiyuan',
  data () {
    return {
      // 查询数据
      formInline: {
        memberName: '',
        status: '',
        memberPhone: ''
      },
      // 存储变量
      arr: 0,
      // 总条数
      total: '',
      // 当前页
      currentPage: 1,
      // 显示条数
      pageSize: 5,
      // 列表数据
      tableData: {
        id: '',
        openId: '', // 微信OPENID
        memberName: '', // 会员昵称
        memberHeader: '', // 头像
        memberPhone: '', // 会员电话
        status: '', // 会员状态, 1: 正常, 0 锁定
        isDelete: '', // 是否删除
        createTime: ''// 创建时间
      },
      gridData: []
    }
  },
  mounted: function () {
    this.$axios.post('/api/member/list', {
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
      this.tableData = response.data.data.list
      this.total = response.data.data.total
    }).catch((err) => {
      console.log(err)
    })
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
    // 状态
    zhuangtai (index, row) {
      console.log(Number(row.status))
      this.$axios.post('/api/member/edit', {
        id: row.id,
        status: Number(row.status)
      }, {
        // 设置请求头
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {

      }).catch((err) => {
        console.log(err)
      })
    },
    shuju () {
      this.$axios.post('/api/member/list', {
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
        this.tableData = response.data.data.list
        this.total = response.data.data.total
        // console.log(typeof response.data)
        // this.count = response.data.data
        // console.log(this.count)
      }).catch((err) => {
        console.log(err)
      })
    },
    // 显示每条
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
      this.$axios.post('/api/member/list', {
        memberName: this.formInline.memberName,
        memberPhone: this.formInline.memberPhone,
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
          this.tableData = response.data.data.list
          this.total = response.data.data.total
        } else {
          console.log(response.data.code)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    handleDelete (index, row) {
      this.$axios.post('/api/member/delete', { id: row.id }, {
        // 设置请求头
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.data.code === 200) {
          this.tableData.splice(row.id, 1)
          this.total--
          // location.reload()
          console.log(response)
          // that.total -= that.total
          // this.handleCurrentChange (this.currentPage)
          // window.location.reload()
          // this.tableData = response.data.data
          this.$message(response.data.msg)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 确认修改添加
    tijao () {
      if (this.arr === 0) {
        this.$axios.post('/api/member/add', {
          id: this.gridData.id,
          openId: this.gridData.openId,
          memberName: this.gridData.memberName,
          memberPhone: this.gridData.memberPhone,
          memberHeader: this.gridData.memberHeader,
          status: this.gridData.status,
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
            this.gridData.openId = ''
            this.gridData.memberName = ''
            this.gridData.memberPhone = ''
            this.gridData.memberHeader = ''
            this.gridData.status = ''
            this.gridData.createTime = ''
          } else {
            console.log('出错')
          }
        }).catch((err) => {
          console.log(err)
        })
      } else if (this.arr === 1) {
        this.$axios.post('/api/member/edit', {
          id: this.gridData.id,
          openId: this.gridData.openId,
          memberName: this.gridData.memberName,
          memberPhone: this.gridData.memberPhone,
          memberHeader: this.gridData.memberHeader,
          status: this.gridData.status,
          createTime: this.gridData.createTime
        }, {
          // 设置请求头
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          console.log('ljfdsdfj' + response.data)
          if (response.data.code === 200) {
            this.shuju()
            console.log('ljfdsdfj=' + response.data)
            this.$message(response.data.msg)
            this.gridData.id = ''
            this.gridData.openId = ''
            this.gridData.memberName = ''
            this.gridData.memberPhone = ''
            this.gridData.memberHeader = ''
            this.gridData.status = ''
            this.gridData.createTime = ''
          }
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
      this.gridData.openId = ''
      this.gridData.memberName = ''
      this.gridData.memberPhone = ''
      this.gridData.memberHeader = ''
      this.gridData.status = ''
      this.gridData.createTime = ''
    },
    // 点击弹出框修改
    handleEdit (index, row) {
      this.gridData = row
      this.arr = 1
    }
  }
}
</script>
<style scoped>
  .text-align {
    text-align: left;
  }
  .el-input__inner {
    width: 150px;
    text-align: left;
    font-size: inherit;
    height: 30px;
    margin-right: 10px;
  }
</style>
