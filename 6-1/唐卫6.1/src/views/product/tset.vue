<template>
    <div>
        <el-form :inline="true" :model="moHu" class="demo-form-inline">
            <el-form-item label="查询">
                <el-input v-model="moHu.msg" placeholder="请输入查询商品名称"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="moHuSubmit()">查询</el-button>
            </el-form-item>
        </el-form>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="查询">
                <el-input v-model="formInline.id" placeholder="请输入查询商品ID"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit()">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table
                :data="tableData"

                style="width: 100%">
            <el-table-column
                    prop="brandId"
                    label="brandId"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="goodsName"
                    label="商品"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="goodsTitle"
                    label="品牌名">
            </el-table-column>
            <el-table-column
                    prop="goodsImgs"
                    label="图片"
                    width="120">
                <template slot-scope="scope">
                    <el-image style="width: 100px;height: 100px" :src="'/api'+scope.row.goodsImgs"></el-image>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleDelete(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default{
        name: 'productList',
        data(){
            return {
                tableData: [],
                formInline: {
                    id: '',
                    region: ''
                },
                moHu:{
                    msg:''
                }
            }
        },
        methods:{
            handleDelete(index,indexC){
                this.$confirm('删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('/api/goods/delete',{

                        id: indexC.id
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then((res) => {
                        this.tableData.splice(indexC.id,1);
                        console.log(res);
                        this.$message({
                            type: 'info',
                            message: res.data.msg
                        })
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            onSubmit() {
                console.log(this.moHu.msg);
                this.$axios.post('/api/goods/getOne',{
                    "id": this.formInline.id,
                },{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((res) => {
                    this.tableData.push(res.data.data.list)
                })
            },
            moHuSubmit() {
                this.$axios.post('/api/goods/list',{
                    "goodsName": this.moHu.msg,
                    "page": 1,// 当前页
                    "pageSize": 10,// 页容量

                },{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((res) => {
                    console.log(res);
                    this.tableData.push(res.data.data.list)
                })
            },
            getProduct(){
                this.$axios.post('/api/goods/list',{
                    "brandId": "",// 品牌ID-不传表示所有品牌
                    "catId": "",// 分类ID-不传表示所有分类
                    "goodsName": "",// 商品名字,传递-模糊查询
                    "page": 1,// 当前页
                    "pageSize": 100,// 页容量
                    "status": 1// 状态1:上架,0:下架, 不传: 所有状态
                },{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((res) => {
                    console.log(res);
                    for(var i=0;i<res.data.data.list.length;i++){
                        this.tableData.push(res.data.data.list[i])
                    }
                })
            }
        },
        mounted:function () {
            this.getProduct()
        }
    }
</script>

<style scope>
</style>
