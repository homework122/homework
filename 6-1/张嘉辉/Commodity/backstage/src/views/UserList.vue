<template>
    <div>
        <el-row>
            <el-col :span="10"><div class="grid-content bg-purple-dark">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="会员昵称">
                        <el-input v-model="formInline.user" placeholder="会与昵称"></el-input>
                    </el-form-item>
                    <el-form-item label="手机">
                        <el-input v-model="formInline.phone" placeholder="手机"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </div></el-col>
            <el-col :span="4" :offset="10"><el-button type="primary" @click="dialogFormVisible = true">添加</el-button></el-col>
        </el-row>
    <el-table
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
        <el-table-column
                label="ID"
                prop="id">
        </el-table-column>
        <el-table-column
                label="用户名"
                prop="memberName">
        </el-table-column>
        <el-table-column
                label="手机号"
                prop="memberPhone">
        </el-table-column>
        <el-table-column
                prop="memberHeader"
                label="会员头像"
                width="150">
            <template slot-scope="scope">
                <div class="demo-type">
                    <div>
                        <el-avatar :src="scope.row.memberHeader"></el-avatar>
                    </div>
                </div>
            </template>
        </el-table-column>
        <el-table-column
                align="right">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">修改</el-button>
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
                @current-change="handleCurrentChange"
                :current-page	="Page"
                :page-sizes="PageSize"
                :total="(total/3)*10">
        </el-pagination>
        <el-dialog
                title="修改信息"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-form ref="form" :model="ModForm" :rules="rules" label-width="80px">
                <el-form-item label="会员名" prop="name">
                    <el-input v-model="ModForm.name" placeholder="请输入..."></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="ModForm.phone" placeholder="请输入..."></el-input>
                </el-form-item>
                <el-form-item label="图片地址" prop="img">
                    <el-input v-model="ModForm.img" placeholder="请输入..."></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onAddSubmit('form')">立即修改</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="用户电话">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="用户图片">
                    <el-input v-model="form.img"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmitAdd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default{
        inject:['reload'],
        name: 'UserList',
        data(){
            return {
                tableData: [],
                search: '',
                total:'',// 会员数
                PageSize:3, // 每页显示
                Page:'',// 当前页
                dialogVisible: false, //修改模态框
                dialogFormVisible: false, // 添加模态框
                ModForm:{
                    name:'',
                    phone:'',
                    img:''
                },
                Mid:'', // 修改ID
                formInline: {
                    user: '',
                    phone:''
                },
                form: {
                    name:'',
                    phone:'',
                    img:''
                },
            }
        }, methods: {
            handleEdit(index, row) {
                this.dialogVisible=true;
                this.Mid=row.id
                this.ModForm.name=row.memberName
                this.ModForm.phone=row.memberPhone
                this.ModForm.img=row.memberHeader
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
                            this.$axios.post('/api/member/edit', {
                                id:this.Mid , // ID-必传
                                memberName:this.ModForm.name,
                                memberPhone:this.ModForm.phone,
                                memberHeader:this.ModForm.img,
                                status:''
                            }, {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }).then((res) => {
                                console.log(res)
                                this.dialogVisible = false;
                                this.$axios.post('/api/member/list',{
                                    "page": this.Page,
                                    "pageSize":this.pageSize,
                                },{
                                    headers: {'Content-Type': 'application/json'}
                                }).then((res) => {
                                    console.log(res)
                                    this.tableData = res.data.data.list;
                                    this.total = res.data.data.total
                                    this.pageSize = res.data.data.pageSize
                                    this.Page = res.data.data.pageNum
                                    this.reload()
                                }) .catch(function (err) { // 请求失败处理
                                    console.log(err)
                                });
                            })
                        }).catch((err) => {
                            console.log(err)
                        });
                    }
                })
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                        this.ModForm.name = '';
                        this.ModForm.phone = '';
                        this.ModForm.img = '';
                        this.$data.mid = ''
                    })
                    .catch(() => {
                    });
            }, //模态框关闭
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                   this.$axios.post('/api/member/delete',{
                       "id":row.id
                   },{
                       headers: {
                           'Content-Type': 'application/json'
                       }
                   }).then((res) => {
                       this.tableData.splice(row.id, 1);
                       this.$message(res.data.msg);
                       this.reload()
                   })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }, // 删除
            handleCurrentChange (val) {
                var that = this
                this.$axios.post('/api/member/list', {
                    "page": val,
                    "pageSize": that.PageSize,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((res) => {
                    that.tableData = res.data.data.list;
                    that.Total = res.data.data.total;
                    that.Page = res.data.data.pageNum
                })
            }, // 页码
            onSubmit (){
                this.$axios.post('/api/member/list',{
                    "memberName":this.formInline.user,
                    "memberPhone":this.formInline.phone,
                    "page": 1,
                    "pageSize":3,
                    "status":'',
                },{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((res) => {
                    this.tableData = res.data.data.list;
                    this.total = res.data.data.total
                    this.pageSize = res.data.data.pageSize
                    this.Page = res.data.data.page
                })
            }, // 查询
            onSubmitAdd () {
                this.$axios.post('/api/member/add',{
                    "memberName":this.form.name ,
                    "memberPhone":this.form.phone ,
                    "memberHeader":this.form.img,
                    "openId":Math.random()*10
                },{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((res) => {
                    if(res.data.code==200){
                        this.dialogFormVisible=false;
                        this.$message(res.data.msg);
                        this.reload()
                    }else {
                        this.$message(res.data.msg);
                    }
                })
            }
        },
        mounted:function () {
            this.$axios.post('/api/member/list',{
                "page": 1, // 当前页-必传
                "pageSize": 3, // 页容量-必传
            },{
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) =>{
                this.tableData=res.data.data.list;
                this.total = res.data.data.total;
                this.pageSize = res.data.data.pageSize;
                this.Page = res.data.data.page;
            })
        }
    }
</script>

<style scope>
</style>