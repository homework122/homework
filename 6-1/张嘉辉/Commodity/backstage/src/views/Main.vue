<template>
    <div>
        <el-container style="border: 1px solid #eee">
            <el-aside>
                <h1><img src="../assets/logo.png" alt="" class="logo"></h1>
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo"   :collapse="isCollapse">
                    <router-link to="/Main">
                        <el-menu-item index="1">
                        <i class="el-icon-house"></i>
                        <span slot="title">首页</span>
                        </el-menu-item>
                    </router-link>
                    <router-link to="/UserList">
                        <el-menu-item index="2">
                        <i class="el-icon-user-solid"></i>
                        <span slot="title">会员列表</span>
                        </el-menu-item>
                    </router-link>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-s-goods"></i>
                            <span>品牌</span>
                        </template>
                        <el-menu-item-group>
                            <router-link to="/brandList"><el-menu-item index="3-1">品牌列表</el-menu-item></router-link>
                            <router-link to="/addBrand"><el-menu-item index="3-2">添加品牌</el-menu-item></router-link>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu> <!--导航栏-->
                <el-radio-group v-model="isCollapse" style="margin-left: -100px; margin-top: 30px">
                    <el-radio-button :label="false">展开</el-radio-button>
                    <el-radio-button :label="true">收起</el-radio-button>
                </el-radio-group> <!--收起/展开-->
            </el-aside>
            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                    <el-dropdown>
                        <i class="el-icon-more" style="margin-right: 15px"></i>
                        <el-dropdown-menu slot="dropdown">
                           <span @click="exit"> <el-dropdown-item >退出</el-dropdown-item></span>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span>{{this.$route.name}}</span> <!--变量有问题-->
                </el-header> <!--退出-->
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