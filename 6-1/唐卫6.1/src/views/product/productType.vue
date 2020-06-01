<template>
    <div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="id"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="brandName"
                    label="brandName"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态">
            </el-table-column>
            <el-table-column
                    prop="brandLogo"
                    label="图片"
                    width="120">
                <template slot-scope="scope">
                    <el-image style="width: 100px;height: 100px" :src="'/api'+scope.row.brandLogo"></el-image>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="modifyData(scope.$index, scope.row)">编辑</el-button>
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
        name: 'productType',
        data(){
            return {
                tableData: []
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
            getProduct(){
                this.$axios.post('/api/brand/list',{
                    "brandName": "", // 品牌名, 传递-模糊查询,不传递-所有
                    "page": 1, // 当前页-必穿
                    "pageSize": 20, // 页容量-必穿
                    "status": 1 // 状态 1: 正常, 0: 屏蔽, 不传表示查询所有

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
            },
        }
        ,
        mounted() {
            this.getProduct()
        }
    }
</script>

<style scope>


</style>