<template>
    <div>
        <el-container style="border: 1px solid #eee">
            <el-aside>
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo"   background-color="#545c64"
                         text-color="#fff"
                         active-text-color="#ffd04b" :collapse="isCollapse">
                    <router-link to="/Main">
                        <el-menu-item index="1">
                        <i class="el-icon-house"></i>
                        <span slot="title">首页</span>
                        </el-menu-item>
                    </router-link>
                    <router-link to="/userList">
                        <el-menu-item index="2">
                        <i class="el-icon-user-solid"></i>
                        <span slot="title">会员列表</span>
                        </el-menu-item>
                    </router-link>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-s-goods"></i>
                            <span>商品</span>
                        </template>
                        <el-menu-item-group>
                            <router-link to="/productList"><el-menu-item index="3-1">商品列表</el-menu-item></router-link>
                            <router-link to="/productAdd"><el-menu-item index="3-2">添加商品</el-menu-item></router-link>
                            <router-link to="/productType"><el-menu-item index="3-2">商品品类</el-menu-item></router-link>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
                <el-radio-group v-model="isCollapse" style="margin-left: -100px; margin-top: 30px">
                    <el-radio-button :label="false">展开</el-radio-button>
                    <el-radio-button :label="true">收起</el-radio-button>
                </el-radio-group>
            </el-aside>
            <el-container >
                <el-header style="text-align: right; font-size: 12px ;background-color: #00A398  ;color:#fff"  >
                    <el-dropdown >
                        <i class="el-icon-more" style="margin-right: 15px"></i>
                        <el-dropdown-menu slot="dropdown">
                           <span @click="exit"> <el-dropdown-item >退出</el-dropdown-item></span>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span>{{this.$route.params.name}}</span> <!--变量有问题-->
                </el-header>

                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import ElMain from "../../node_modules/element-ui/packages/main/src/main";
    export default{
        components: {ElMain},
        name: 'Main',
        data(){
            return {
                isCollapse: false
            }
        },
        methods:{
            exit(){
                this.$router.push('/');
            }
        }
    }
</script>

<style scope>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .logo{
        width: 60px;
        height: 60px;
        margin-left: -80px;
    }
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
        margin-left: -100px;
    }

    .el-main {
        color: #333;
        margin-left: -100px;
    }
    .router-link-active {
        text-decoration: none;
        font-size: 16px;
    }
    a{
        text-decoration: none;
        font-size: 16px;
        color: black;
    }
</style>