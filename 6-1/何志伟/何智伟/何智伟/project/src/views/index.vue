<template>
    <div>
        <!--        面包屑-->
        <el-row >
            <el-col :span="24"><div class="grid-content bg-purple-dark">
                <breadcrumb text="首页"></breadcrumb>
            </div></el-col>
        </el-row>
        <!--        数据显示1-->
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark">
                <el-row>
                    <el-col :span="8"><div class="grid-content bg-purple">
                        <div class="totalData">总用户</div>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-purple-light">
                        <div class="totalData">今日订单</div>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-purple">
                        <div class="totalData">昨日销售金额</div>
                    </div></el-col>
                </el-row>

            </div></el-col>
        </el-row>
        <!--        数据显示1-->
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark">
                <el-row>
                    <el-col :span="8"><div class="grid-content bg-purple">
                        <table border="1" cellspacing="0">
                            <tr>
                                <td colspan="2">订单统计信息</td>
                            </tr>
                            <tr>
                                <td>未处理的订单：</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>待发货订单：</td>
                                <td>3</td>
                            </tr>
                            <tr>
                                <td>待结算订单：	</td>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td>已成交订单数：</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>交易失败：</td>
                                <td>2</td>
                            </tr>
                        </table>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-purple-light">
                        <table border="1" cellspacing="0">
                            <tr>
                                <td colspan="2">商品统计信息</td>
                            </tr>
                            <tr>
                                <td>商品总数：</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>回收站商品：	</td>
                                <td>3</td>
                            </tr>
                            <tr>
                                <td>上架商品：</td>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td>下架商品：</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>商品评论：</td>
                                <td>2</td>
                            </tr>
                        </table>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-purple">
                        <table border="1" cellspacing="0">
                            <tr>
                                <td colspan="2">会员登录统计信息</td>
                            </tr>
                            <tr>
                                <td>注册会员登录：</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>小计</td>
                                <td>20</td>
                            </tr>
                        </table>
                    </div></el-col>
                </el-row>
            </div></el-col>
        </el-row>
<!--        图形数据显示-->
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark">
                <div class="echarts"></div>
            </div></el-col>
        </el-row>
    </div>
</template>

<script>
    import breadcrumb from "../components/breadcrumb"; //面包屑
    export default {
        name: 'indexVue',
        props: []

        ,
        data: function () {
            return {}
        },
        components:{
            breadcrumb,
        },
    }
</script>

<style scoped>
    .totalData{
        height: 100px;
        box-sizing: border-box;
        border: 1px solid brown;
    }
    table{
        width: 100%;
        height: 200px;
    }
    table td{
        width: 50%;
        text-align: center;
    }

    .echarts{
        height: 300px;
        box-sizing: border-box;
        border: 1px solid brown;
    }
</style>