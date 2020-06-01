<template>
    <div>
      <el-row :gutter="20">
        <el-col :span="19"><div class="grid-content bg-purple"><el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
          <el-row>
            <el-col :span="8">
              <div class="bg-purple">
                <el-col :span="12" class=" purple ">
                  <div>
                    <p>
                      今日订单总数
                    </p>
                    <h1>{{count.orderTotalCount}}</h1>
                  </div>
                </el-col>
                <el-col :span="12">
                  <p class="el-icon-s-order tubiao"></p>
                </el-col>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="bg-purple">
                <el-col :span="12" class=" purple ">
                  <div>
                    <p>
                      今日销售总额
                    </p>
                    <h1><span>￥</span>{{count.todaySaleMoney}}</h1>
                  </div>
                </el-col>
                <el-col :span="12">
                  <p class="tubiao">￥</p>
                </el-col>
              </div></el-col>
            <el-col :span="8">
              <div class="bg-purple">
                <el-col :span="12" class=" purple ">
                  <div>
                    <p>
                      昨日销售总额
                    </p>
                    <h1><span>￥</span>{{count.lastDaySaleMoney}}</h1>
                  </div>
                </el-col>
                <el-col :span="12">
                  <p class="el-icon-coin tubiao"></p>
                </el-col>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><div class="left">商品总览</div></el-col>
            <el-col :span="12"><div class="left">用户总览</div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="biankuang ">
              <el-row>
                <el-col :span="6">
                  <div class="shangpin">
                    <i class="el-icon-shopping-cart-full el-icon-shopping"></i><br>
                    <p class="wenzi">已下架商品</p>
                    <h1 class="h1">{{count.offGoodsCount}}</h1>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="shangpin">
                    <i class="el-icon-shopping-cart-full el-icon-shopping"></i><br>
                    <p class="wenzi">已上架商品</p>
                    <h1 class="h1">{{count.onGoodsCount}}</h1>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="shangpin">
                    <i class="el-icon-warning-outline el-icon-shopping"></i><br>
                    <p class="wenzi">库存紧张商品</p>
                    <h1 class="h1">0</h1>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="shangpin">
                    <i class="el-icon-box el-icon-shopping"></i><br>
                    <p class="wenzi">全部商品</p>
                    <h1 class="h1">{{count.totalGoodsCount}}</h1>
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12" class="biankuang">
              <el-row>
                <el-col :span="6">
                  <div class="shangpin">
                    <i class="el-icon-eleme el-icon-shopping"></i><br>
                    <p class="wenzi">今日新增</p>
                    <h1 class="h1">{{count.todayNewMemberCount}}</h1>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="shangpin">
                    <i class="el-icon-shopping-cart-full el-icon-shopping"></i><br>
                    <p class="wenzi">昨日新增</p>
                    <h1 class="h1">{{count.lastDayNewMemberCount}}</h1>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="shangpin">
                    <i class="el-icon-date el-icon-shopping"></i><br>
                    <p class="wenzi">本月新增</p>
                    <h1 class="h1">{{count.nowMonthNewMemberCount}}</h1>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="shangpin">
                    <i class="el-icon-tickets el-icon-shopping"></i><br>
                    <p class="wenzi">会员总数</p>
                    <h1 class="h1">{{count.memberCount}}</h1>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <p class="tongji">订单统计</p>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-row :gutter="20">
                  <el-col :span="16" >
                    <div class="grid-content bg-purple">
                      <p>本月订单总数</p>
                      <i>0</i>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">
                      <i class="el-icon-top">+10%</i>
                      <p>同比上月</p>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="16">
                    <div class="grid-content bg-purple">
                      <p>本周订单总数</p>
                      <i>0</i>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">
                      <i class="el-icon-bottom">-10%</i>
                      <p>同比上周</p>
                    </div></el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="16">  <div class="grid-content bg-purple">
                    <p>本月销售总额</p>
                    <i>0</i>
                  </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">
                      <i class="el-icon-bottom">+14%</i>
                      <p>同比上月</p>
                    </div></el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="16">  <div class="grid-content bg-purple">
                    <p>本周销售总额</p>
                    <i>0</i>
                  </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">
                      <i class="el-icon-top">+10%</i>
                      <p>同比上周</p>
                    </div></el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content bg-purple">
                <el-row :gutter="20">
                  <el-col :span="13" :offset="7">
                    <div class="grid-content bg-purple">
                      <div class="block">
                        <el-date-picker
                          v-model="value2"
                          type="daterange"
                          align="right"
                          unlink-panels
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :picker-options="pickerOptions">
                        </el-date-picker>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24"></el-col>
                </el-row>
              </div>
            </el-col>
          </el-row></div></el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <p></p>
          </div>
        </el-col>
      </el-row>
    </div>
</template>
<script>
export default {
  name: 'indexs',
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value1: '',
      value2: '',
      count: '',
      chartData: ''
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  mounted: function () {
    this.$axios.post('/api/all/statistics', {
      // 设置请求头
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      // console.log(typeof response.data)
      this.count = response.data.data
      // console.log(this.count)
    }).catch((err) => {
      console.log(err)
    })
    this.$axios.post('/api/all/order/money', {
      // 设置请求头
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(typeof response.data)
      this.chartData = response.data.data
      console.log(this.chartData)
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>
<style scoped>
  .bg-purple-dark {
    /*background: #99a9bf;*/
    line-height: 36px;
    text-align: left;
    /*border: 1px solid rgba(220, 220, 220, 0.61);*/
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    border: 1px solid rgba(220, 220, 220, 0.61);
  }
  .purple{
    /*height: 150px;*/
   padding-top: 10px;
  }
  .tubiao{
    font-size: 30px;
    width: 50px;
    height: 50px;
    line-height: 50px;
    color: white;
    border-radius: 5px;
    background-color: #6033DD;

  }
  .left{
    text-align: left;
  }
  .el-icon-shopping{
    font-size: 30px;
    font-family:Source Han Sans CN;
    font-weight:200;
    color: rgba(142, 142, 142, 0.56);
  }
  .shangpin{
    font-size: 5px;
   margin: 20px;
  }
  .wenzi{
    color: #8E8E8E;
    font-family:Source Han Sans CN;
    font-weight:400;
    margin: 5px;
  }
  .h1{
    margin: 5px;
    font-family:Source Han Sans CN;
  }
  .biankuang{
    border: 0.5px solid ghostwhite;

  }
  .tongji{
    text-align: left;
  }
  .bg-purple {
    background: rgba(211, 220, 230, 0.1);
  }
  .el-row {
    margin-bottom: 20px;
  }
</style>
