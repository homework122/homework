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
                    label="商品"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="brandDesc"
                    label="品牌名">
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
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
                title="修改信息"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-form ref="form" :model="ModForm" :rules="rules" label-width="80px">
                <el-form-item label="品牌描述" prop="sketch">
                    <el-input v-model="ModForm.sketch" placeholder="请输入..."></el-input>
                </el-form-item>
                <el-form-item label="品牌名称" prop="name">
                    <el-input v-model="ModForm.name" placeholder="请输入..."></el-input>
                </el-form-item>
                <el-form-item label="图片地址" prop="img">
                    <el-input v-model="ModForm.img" placeholder="请输入..."></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onAddSubmit('form')">立即修改</el-button>
                </el-form-item>
            </el-form>
        </el-dialog> <!--修改模态框-->
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" :inline="true">
            <el-form-item  prop="user">
                <el-input v-model="form.user" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">搜索</el-button>
            </el-form-item>
        </el-form> <!--搜索-->
        <el-pagination
                background
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :current-page	="Page"
                :page-sizes="PageSize"
                :total="(Total/3)*10">
        </el-pagination> <!--页码-->

    </div>
</template>

<script>
    export default{
        inject:['reload'],
        name: 'brandList',
        data(){
            return {
                tableData: [],
                PageSize:3, // 每页显示
                Page:'', // 当前页
                Total:'', // 总条数
                dialogVisible: false, //模态框
                ModForm:{
                    sketch:'',
                    name:'',
                    img:''
                },
                mid:'',//更改id
                form: {
                    user: ''
                },
        rules:{
            user: [
                { required: true, message: '请输入ID', trigger: 'blur' }
            ]
        }
            }
        },
        methods: {
            handleDelete(index, indexC){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('/api/brand/delete', {
                        id: indexC.id
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then((res) => {
                        this.tableData.splice(indexC.id, 1);
                        this.$message(res.data.msg);
                        this.reload()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleCurrentChange (val) {
                var that = this
                this.$axios.post('/api/brand/list', {
                    "brandName": "",
                    "page": val,
                    "pageSize": that.PageSize,
                    "status": ""
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((res) => {
                    that.tableData = res.data.data.list;
                    that.Total = res.data.data.total;
                    that.Page = res.data.data.pageNum
                })
            },
            handleEdit(index, indexC){
                this.$data.dialogVisible = true;
                this.$data.mid = indexC.id;
                this.$axios.post('/api/brand/getOne', {
                    "id": this.$data.mid
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((res) => {
                    this.ModForm.sketch = res.data.data.brandDesc;
                    this.ModForm.name = res.data.data.brandName;
                    this.ModForm.img = res.data.data.img;
                });
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                        this.ModForm.sketch = '';
                        this.ModForm.name = '';
                        this.ModForm.img = '';
                        this.$data.mid = ''
                    })
                    .catch(() => {
                    });
            },
            onAddSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('是否确定修改信息?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            center: true
                        }).then(() => {
                            this.$axios.post('/api/brand/edit', {
                                "brandDesc": this.ModForm.sketch, // 描述-可省略
                                "brandLogo": this.ModForm.img, // logo-可省略
                                "brandName": this.ModForm.name, // 名字-可省略
                                "id": this.$data.mid, // ID-必传
                                "status": ''
                            }, {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }).then(() => {
                                this.$message({
                                    message: `恭喜你，这是一条成功消息`,
                                    type: 'success'
                                });
                                this.$data.dialogVisible = false;
                                this.reload()
                            })
                        }).catch(() => {
                        });
                    }
                })
            },
            change(e){
                this.$forceUpdate();
                console.log(e)
            },
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.form.user)
                       this.$axios.post('/api/brand/list',{
                           "page": 1,
                           "pageSize": 3,
                           "status": 1
                       },{
                           headers: {
                               'Content-Type': 'application/json'
                           }
                       }).then((res) => {
                           this.tableData = res.data.data.list;
                           this.Total = res.data.data.total
                           this.pageSize = res.data.data.pageSize
                           this.Page = res.data.data.page
                       })
                    }
                })
            }
        },
        mounted: function () {
            this.$axios.post('/api/brand/list', {
                "brandName": "",
                "page": 1,
                "pageSize": 3,
                "status": ""

            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                for (var i = 0; i < res.data.data.list.length; i++) {
                    this.tableData.push(res.data.data.list[i]);
                }
                this.Total = res.data.data.total
            })
        }
    }
</script>

<style scope>
</style>
 