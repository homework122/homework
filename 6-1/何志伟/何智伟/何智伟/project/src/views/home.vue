<template>
    <div>
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark header">
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple">
                        <h2>后台管理系统</h2>
                    </div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-light">
                        <div class="div" id="div">
                            <p>当前时间:<span id="time"></span></p>
                            <p>当前用户：<span id="user">{{user}}</span></p>
                        </div>
                    </div></el-col>
                </el-row>
            </div></el-col>
        </el-row>
        <el-row :gutter="5">
<!--            左侧菜单-->
            <el-col :span="4"><div class="grid-content bg-purple">
                <navMenu></navMenu>
            </div></el-col>

            <el-col :span="20"><div class="grid-content bg-purple">
                <!--        数据显示-->
                <el-row >
                    <el-col :span="24"><div class="grid-content bg-purple-dark">
                        <router-view></router-view>
                    </div></el-col>
                </el-row >
            </div></el-col>


        </el-row>
    </div>
</template>

<script>
    var time=new Date().toLocaleTimeString();
    setInterval(function () {
        time=new Date().toLocaleTimeString()
        document.getElementById('time').innerText=time

    },1000)


    import navMenu from "../components/navMenu";//侧边菜单
    export default {
        name: 'home',
        props: [],
        data: function () {
            return {
                user:window.sessionStorage.getItem('userName')


            }
        },
        provide () {
            return {

            }
        },
        components:{
            navMenu,
        },
        methods:{


        }
    }
</script>

<style scoped>
    #div p:nth-of-type(2){
        margin-left: 30px;
    }
    #time{
        padding: 5px;
    }
</style>