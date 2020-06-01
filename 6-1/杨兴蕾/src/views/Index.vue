<template>
  <div class="index">
    <!--左边导航-->
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)" >
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title">
            <router-link to="/indexLink">
              <i class="el-icon-message">首页</i>
            </router-link>
            </template>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
            <router-link to="/userList">
              <i class="el-icon-menu">会员列表</i>
            </router-link>
            </template>

          </el-submenu>
          <el-submenu index="3">
              <template slot="title"><i class="el-icon-setting"></i>商品</template>
            <!--分组-->
            <el-menu-item-group>
              <el-menu-item index="3-1"><router-link to="/productList">商品列表 </router-link></el-menu-item>
              <el-menu-item index="3-2"><router-link to="/addProduct">添加商品</router-link></el-menu-item>
              <el-menu-item index="3-3">商品分类</el-menu-item>
              <el-menu-item index="3-4">品类管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-setting"></i>订单</template>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-setting"></i>营销</template>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-setting"></i>权限</template>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--右边内容-->
      <router-view></router-view>

    </el-container>

  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      dataS: {}
    }
  }
}

</script>

<style scoped>

  /*导航*/
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
  /*主页右边内容*/

  .index{
    width: 100%;
  }
  .indexContent{
    width: 1100px;
  }
  /*.nav{*/
    /*width: 1100px;*/
  /*}*/
  .orderF{
    overflow: hidden;
  }
  .orderF .left{
    float: left;
    height: 80px;
  }
   .leftF{
    float: left;
  }
  .rightF{
    float: right;
  }
  /*商品总览和用户总览图标*/
  .goodView{
    width: 417px;
  }
  .icons{
    /*color: gainsboro;*/
    /*font-size: 30px;*/
  }
  .viewWord{
    /*font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;*/
    /*font-size: 18px;*/
  }
  /*订单*/
  /*.order{*/
    /*margin-top: 100px;*/
  /*}*/
  .orderF .right{
    float: right;
    background-color:#409EFF ;
    border-radius: 5px;
    color: white;
    font-size: 30px;
    text-align: center;
    width: 50px;
    height: 50px;
    line-height: 50px;
  }
  /*相比较*/
  /*处理事务*/
  .checkThing ul>li{
    list-style: none;
    overflow: hidden;
  }
  .checkThing ul>li>div{
    float: left;
    /*color: gainsboro;*/
  }
  .checkThing ul>li>div:nth-of-type(1) span{
    display: inline-block;
    width:40px;
    height:40px;
    background:rgba(178,156,242,1);
    border-radius:50%;
    color: white;
    text-align: center;
    line-height: 40px;
    margin-top: calc(50% - 20px);
  }
  .checkThing ul>li>div:nth-of-type(2){
    font-size: 12px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
  .icons{
    width: 50px;
    text-align: center;
  }
  .nav-word{
    display: inline-block;
    width: 70px;
    margin-left: 10px;
  }
  .navs:hover .icons{
    color:#FD6A30;
  }
  .navs:hover .nav-word{
    color:#FD6A30;
  }
</style>
