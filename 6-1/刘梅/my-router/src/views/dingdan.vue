<template>
<div>
  <!--// 表格-->
  <template>
  <el-table
    ref="multipleTable"
    :data="List"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="id"
      label="id"
      width="120">
    </el-table-column>
    <el-table-column
      prop="orderCode"
      label="订单号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="memberId"
      label="会员Id"
      width="120">
    </el-table-column>
    <el-table-column
      prop="orderPrice"
      label="金额"
      width="120">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      width="120">
      <template slot-scope="scope">
        <span v-if="scope.row.status == 0">未支付</span>
        <span v-if="scope.row.status == 1">已付款</span>
        <span v-if="scope.row.status == 2">等待发货</span>
        <span v-if="scope.row.status == 3">已发货</span>
        <span v-if="scope.row.status == 4">运输中</span>
        <span v-if="scope.row.status == 5">已完成</span>
        <span v-if="scope.row.status == 6">已取消</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="payType"
      label="支付类型"
      width="120">
      <template slot-scope="scope">
        <span v-if="scope.row.status == 0">未支付</span>
        <span v-if="scope.row.status == 1">支付宝</span>
        <span v-if="scope.row.status == 2">微信</span>
        <span v-if="scope.row.status == 3">银联</span>
      </template>
    </el-table-column>
    <el-table-column
      label="支付时间"
      width="120">
      <template slot-scope="scope">{{dateFormat('YYYY-mm-dd HH:MM:SS', scope.row.payTime)}}</template>
    </el-table-column>
    <el-table-column
      label="下单时间"
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
            <el-form-item label="支付类型" >
              <el-select v-model="gridData.payType" placeholder="请选择">
                <el-option label="未支付" :value=0></el-option>
                <el-option label="支付宝" :value=1></el-option>
                <el-option label="微信" :value=2></el-option>
                <el-option label="银联" :value=3></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态" >
              <el-select v-model="gridData.status" placeholder="请选择">
                <el-option label="未支付" :value=0></el-option>
                <el-option label="已付款" :value=1></el-option>
                <el-option label="等待发货" :value=2></el-option>
                <el-option label="已发货" :value=3></el-option>
                <el-option label="运输中" :value=4></el-option>
                <el-option label="已完成" :value=5></el-option>
                <el-option label="已取消" :value=6></el-option>
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
  </template>
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
  name: 'dingdan',
  data () {
    return {
      paymentType: -1,
      OrderStatus: -1,
      orderCode: '',
      List: [],
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
        orderCode: '',
        memberId: '',
        orderPrice: '',
        status: '',
        payType: '',
        payTime: '',
        createTime: '',
        isDelete: '',
        orderGoods: ''
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
    // 获取数据
    shuju () {
      // 请求数据
      this.$axios.post('/api/order/list', {
        payType: this.paymentType,
        status: this.OrderStatus,
        orderCode: this.orderCode,
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
        this.List = response.data.data.list
        console.log(this.List)
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
    // 确认修改添加
    tijao () {
      this.$axios.post('/api/order/edit', {
        id: this.gridData.id,
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
          this.gridData.status = ''
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 取消
    quxiao () {
      this.shuju()
    },
    // 点击弹出框
    handleEdit (index, row) {
      this.gridData = row
      console.log(typeof this.gridData.status)
      this.arr = 1
    },
    // 删除
    handleDelete (index, row) {
      this.$axios.post('/api/order/delete', { id: row.id }, {
        // 设置请求头
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.data.code === 200) {
          this.List.splice(row.id, 1)
          this.$message(response.data.msg)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted () {
    // 请求数据
    this.$axios.post('/api/order/list', {
      payType: this.paymentType,
      status: this.OrderStatus,
      orderCode: this.orderCode,
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
      this.List = response.data.data.list
      console.log(this.List)
      this.total = response.data.data.total
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>
<style scoped></style>
