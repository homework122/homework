<template>
  <div>
    <div>
      <el-container>
        <el-aside width="150px">
          <el-col :span="24">
            <h5><img src="./../assets/img/logo.png" alt=""></h5>
            <span>欢迎: {{a()}}</span>
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-s-home"></i>
                  <router-link to="chaidan/"><span>首页</span></router-link>
                </template>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-s-finance"></i>
                  <router-link to="/huiyuan"><span>会员列表</span></router-link>
                </template>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-goods"></i>
                  <router-link to=""><span>商品</span></router-link>
                </template>
                <el-menu-item-group>
                  <template slot="title"></template>
                  <router-link to="/shangpinliebiao">
                    <el-menu-item index="1-1">商品列表</el-menu-item>
                  </router-link>
                  <router-link to="/tianjia">
                    <el-menu-item index="1-2">商品添加</el-menu-item>
                  </router-link>
                  <router-link to="/fenlie">
                    <el-menu-item index="1-3">商品分类</el-menu-item>
                  </router-link>
                  <router-link to="/pinpai">
                    <el-menu-item index="1-4">品牌</el-menu-item>
                  </router-link>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <router-link to=""><span>管理员</span></router-link>
                </template>
                <el-menu-item-group>
                  <router-link to="/guanliyuan"><span>管理员列表</span></router-link>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-s-data"></i>
                  <router-link to="/dingdan"><span>订单</span></router-link>
                </template>
                <el-menu-item-group>
                  <template slot="title">分组一</template>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-submenu index="6">
                <template slot="title">
                  <i class="el-icon-news"></i>
                  <router-link to=""><span>权限</span></router-link>
                </template>
                <el-menu-item-group>
                  <template slot="title">分组一</template>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main class="a">
          <router-view></router-view>
        </el-main>
        <!--<div id="nav">-->
        <!--<router-link to="/">Home</router-link> |-->
        <!--<router-link to="/about">About</router-link> |-->
        <!--<router-link to="/login">login</router-link> |-->
        <!--<router-link to="/indexs">indexs</router-link> |-->
        <!--</div>-->
      </el-container>
    </div>
  </div>
</template>
<script>
export default {
  name: 'chaidan',
  data () {
    return {
      name: ''
    }
  },
  components: {
  },
  methods: {
    a () {
      this.name = JSON.parse(sessionStorage.getItem('name'))
      return this.name
    }
  }
}
</script>
<style scoped></style>
