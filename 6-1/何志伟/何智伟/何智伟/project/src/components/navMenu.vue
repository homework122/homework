<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                    <el-menu-item index="1">
                        <i class="el-icon-menu"></i>
                        <span slot="title" >
                            <router-link to="/home/index">
                                   首页
                            </router-link>
                        </span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-user-solid"></i>
                        <span slot="title"><router-link to="/home/user">会员列表</router-link></span>
                    </el-menu-item>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-s-goods"></i>
                            <span>商品</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title"></template>
                            <el-menu-item index="1-1"><router-link to="/home/product">商品列表</router-link></el-menu-item>
                            <el-menu-item index="1-2"><router-link to="/home/addGoods">添加商品</router-link></el-menu-item>
                            <el-menu-item index="1-3"><router-link to="/home/category">商品分类</router-link></el-menu-item>
                            <el-menu-item index="1-4">添加类型</el-menu-item>
                            <el-menu-item index="1-5"><router-link to="/home/brand">品牌管理</router-link></el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">营销</span>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <i class="el-icon-setting"></i>
                        <span slot="title">权限</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    export default {
        name: 'navMenu',
        props: []

        ,
        data: function () {
            return {

            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },


        },
    }
</script>

<style scoped>
    .tac  a{
        color: white;
        text-decoration: none;
    }

</style>