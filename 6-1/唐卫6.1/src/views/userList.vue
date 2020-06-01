<template>
    <div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="memberName"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="memberPhone"
                    label="手机号"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态">
            </el-table-column>
            <el-table-column
                    prop="memberHeader"
                    label="头像"
                    width="120">
                <template slot-scope="scope">
                    <el-image style="width: 150px;height: 50px" :src="'/api'+scope.row.memberHeader"></el-image>
                </template>
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="创建时间">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :total="this.tableData.length">
        </el-pagination>
    </div>
</template>

<script>

    export default{

        data(){
            return {
                tableData:[]
            }
        },
        methods:{
            handleDelete(index,indexC){
                this.$confirm('删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('/api/member/delete',{
                        id: indexC.id
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then((res) => {
                        this.tableData.splice(indexC.id,1);
                        this.$message(res.data.msg);
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        mounted:function () {
            this.$axios.post('/api/member/list',{
                "memberName": "",
                "memberPhone": "",
                "page": 1,
                "pageSize": 3,
                "status": 1
            },{
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                console.log(response.data);
                for(var i=0;i<response.data.data.list.length;i++){
                    this.tableData.push(response.data.data.list[i])
                }
            })
        }
    }
</script>

<style scope>


</style>