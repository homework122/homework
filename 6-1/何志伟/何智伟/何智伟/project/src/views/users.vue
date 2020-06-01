<template>
    <div>
        <!--        面包屑-->
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark">
                <breadcrumb text="会员列表"></breadcrumb>
            </div></el-col>
        </el-row>
<!--        搜索-->
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="会员昵称">
                        <el-input v-model="formInline.user" placeholder="会与昵称"></el-input>
                    </el-form-item>
                    <el-form-item label="手机">
                        <el-input v-model="formInline.phone" placeholder="手机"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="formInline.status" placeholder="请选择">
                            <el-option label="正常" value="1"></el-option>
                            <el-option label="锁定" value="0"></el-option>
                            <el-option label="全部" value=""></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </div></el-col>
        </el-row>

<!--        添加 删除-->
        <el-row>
            <el-col :span="2"><div class="grid-content bg-purple">
                <el-button
                        slot="reference"
                        type="primary"
                        @click="handlAdd">
                    添加会员
                </el-button>
            </div></el-col>
            <el-col :span="2"><div class="grid-content bg-purple-light">
                <el-button type="danger">批量删除</el-button>
            </div></el-col>
        </el-row>
<!--        数据显示-->
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark">
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        border
                        height="450"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            label="序号"
                            type="index"
                            width="50">
                    </el-table-column>
                    <el-table-column
                            prop="memberName"
                            label="用户名"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="memberPhone"
                            label="手机"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="memberH"
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
                            label="创建时间"
                            width="120">
                        <template slot-scope="scope">{{ scope.row.createTime.slice(0,10)}}</template>
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="状态"
                            width="200">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.status"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    :active-value="1"
                                    :inactive-value="0"
                                    active-text="启用"
                                    inactive-text="冻结"
                                    @change="changeValue(scope.$index, scope.row)"
                            >
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="200">
                        <template slot-scope="scope">
<!--                            修改-->
                                <el-button
                                        slot="reference"
                                        size="mini"
                                        type="primary"
                                        icon="el-icon-edit"
                                        @click="handleEdit(scope.$index, scope.row)">
                                </el-button>


<!--                            删除-->
                            <el-button
                                    size="mini"
                                    type="danger"
                                    icon="el-icon-delete"
                                    @click="centerDialogVisible = true,handleRow(scope.$index, scope.row)">
                            </el-button>
                            <el-dialog
                                    :visible.sync="centerDialogVisible"
                                    width="30%"
                                    center>
                                <span>确认删除吗</span>
                                <span slot="footer" class="dialog-footer">
                                <el-button @click="centerDialogVisible = false">取 消</el-button>
                                <el-button
                                        type="primary"
                                        @click="handlerOk(row)"
                                >确 定</el-button>
                              </span>
                            </el-dialog>
                        </template>
                    </el-table-column>
                </el-table>
            </div></el-col>
        </el-row>

<!--        页码-->
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark">
                <el-pagination
                        background
                        layout="total,sizes,prev, pager, next"
                        @current-change="handleCurrentChange"

                        :current-page="currentPage"
                        :page-sizes="[5, 7, 9, 12]"
                        :page-size="pageSize"
                        :total="total">
                </el-pagination>
            </div></el-col>
        </el-row>
<!--弹框-->
        <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible">
            <el-form ref="updataform" :model="updataform"  label-width="80px">
                <el-form-item label="会员名称">
                    <el-input v-model="updataform.memberName"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="updataform.memberPhone"></el-input>
                </el-form-item>
                <el-form-item label="头像">
                    <el-input v-model="updataform.memberHeader"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary"  @click="updata">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="添加用户" :visible.sync="addFormdisplay">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="form.memberName"></el-input>
                </el-form-item>
                <el-form-item label="用户电话">
                    <el-input v-model="form.memberPhone"></el-input>
                </el-form-item>
                <el-form-item label="头像">
                    <el-upload
                            class="avatar-uploader"
                            action="/api/upload"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormdisplay = false">取 消</el-button>
                <el-button type="primary"  @click="onSubmitAdd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import breadcrumb from "../components/breadcrumb"; //面包屑

    export default {
        name: 'userVue',
        props: []
        ,
        data:function() {
            return {
                imageUrl: '',
                value:1,
                tableData:[],
                multipleSelection: [],
                total:'',//总数
                pageSize:'',
                currentPage:'',//当前页
                row:'',//行的内容
                centerDialogVisible: false,
                //查询
                formInline: {
                    user: '',
                    phone:'',
                    status: '',
                },
                // 添加
                addFormdisplay:false,
                form: {
                    memberName:'',
                    memberPhone:'',
                    memberHeader:'',
                },
                dialogFormVisible:false,
                // 修改
                updataform:{
                    memberName:'',
                    memberPhone:'',
                    memberHeader:'',
                }
            }
        },
        components:{
            breadcrumb,
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleRow(index,row){
                console.log(index,row)
                this.row=row
            },

            handleEdit(index, row) {
                console.log(index, row);
                for (var key in this.updataform){
                    this.updataform[key] = row[key]
                }
                this.row=row
                this.dialogFormVisible=true
            },
            // 修改提交
            updata(){
                let that = this

                this.$axios.post('/api/member/edit',{
                    id:this.row.id , // ID-必传
                    memberName:this.updataform.memberName,
                    memberPhone:this.updataform.memberPhone,
                    memberHeader:this.updataform.memberHeader,
                    status:this.row.status

                }).then(function (response) {
                    if(response.data.code==200){
                        that.dialogFormVisible = false
                        that.$axios
                            .post('/api/member/list',{
                                    "page": that.currentPage,
                                    "pageSize":that.pageSize,
                                },
                                {headers: {'Content-Type': 'application/json'}}
                            )
                            .then(function (response) {
                                that.tableData = response.data.data.list;
                                that.total = response.data.data.total
                                that.pageSize = response.data.data.pageSize
                                that.currentPage = response.data.data.page
                            })
                            .catch(function (err) { // 请求失败处理
                                console.log(err)
                            });
                    }


                }).catch(function (err) {
                    console.log(err)
                })


            },
            //删除
            deleteEvent(id) {
                let that = this
                this.$axios
                    .post('/api/member/delete',{
                           id:id
                        },
                        {headers: {'Content-Type': 'application/json'}}
                    )
                    .then(function (response) {
                        if(response.data.code==200){
                            that.$axios
                                .post('/api/member/list',{
                                        "page": that.currentPage,
                                        "pageSize":that.pageSize,
                                    },
                                    {headers: {'Content-Type': 'application/json'}}
                                )
                                .then(function (response) {
                                    that.tableData = response.data.data.list;
                                    that.total = response.data.data.total
                                    that.pageSize = response.data.data.pageSize
                                    that.currentPage = response.data.data.page
                                })
                                .catch(function (err) { // 请求失败处理
                                    console.log(err)
                                });

                        }
                    })
                    .catch(function (err) { // 请求失败处理
                        console.log(err)
                    });
            },
            handlerOk(){
                this.centerDialogVisible = false;
                this.deleteEvent(this.row.id)

            },
            //查询
            onSubmit() {
                var that=this
                this.$axios
                    .post('/api/member/list',{
                            "memberName":that.formInline.user,
                            "memberPhone":that.formInline.phone,
                            "page": 1,
                            "pageSize":7,
                            "status":that.formInline.status,
                        },
                        {headers: {'Content-Type': 'application/json'}}
                    )
                    .then(function (response) {
                        that.tableData = response.data.data.list;
                        that.total = response.data.data.total
                        that.pageSize = response.data.data.pageSize
                        that.currentPage = response.data.data.page
                    })
                    .catch(function (err) { // 请求失败处理
                        console.log(err)
                    });

            },
            // 添加会员
            handlAdd(){
                this.addFormdisplay=true

            },
            // 头像上传
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            onSubmitAdd() {
                let that = this
                console.log(this.form)
                this.$axios.post('/api/member/add',{
                    "memberName":this.form.memberName ,
                    "memberPhone":this.form.memberPhone ,
                    "memberHeader":this.form.memberHeader,
                    "openId":Math.random()*10
                }).then(function (response) {
                    if(response.data.code==200){
                        that.addFormdisplay=false;
                        that.$axios
                            .post('/api/member/list',{
                                    "page": that.currentPage,
                                    "pageSize":that.pageSize,
                                },
                                {headers: {'Content-Type': 'application/json'}}
                            )
                            .then(function (response) {
                                that.tableData = response.data.data.list;
                                that.total = response.data.data.total
                                that.pageSize = response.data.data.pageSize
                                that.currentPage = response.data.data.page
                            })
                            .catch(function (err) { // 请求失败处理
                                console.log(err)
                            });

                    }

                }) .catch(function (err) { // 请求失败处理
                    console.log(err)
                });


            },
            //页码
            handleCurrentChange(val){
                var that = this
                this.$axios
                    .post('/api/member/list',{
                            "page": val,
                            "pageSize":7,
                        },
                        {headers: {'Content-Type': 'application/json'}}
                    )
                    .then(function (response) {
                        that.tableData = response.data.data.list;
                        that.total = response.data.data.total
                        that.pageSize = response.data.data.pageSize
                        that.currentPage = response.data.data.page
                    })
                    .catch(function (err) { // 请求失败处理
                        console.log(err)
                    });
            },

            //条数的变化
            handleSizeChange(val) {
                var that = this
                this.$axios
                    .post('/api/member/list',{
                            "memberName":"",
                            "memberPhone":"",
                            "page": 1,
                            "pageSize":val,
                            "status":''
                        },
                        {headers: {'Content-Type': 'application/json'}}
                    )
                    .then(function (response) {
                        that.tableData = response.data.data.list;
                        that.total = response.data.data.total
                        that.pageSize = response.data.data.pageSize
                        that.currentPage = response.data.data.page
                    })
                    .catch(function (err) { // 请求失败处理
                        console.log(err)
                    });
            },

            //滑块
            changeValue(index,row){
                console.log(index,row.status)
                this.$axios
                    .post('/api/member/edit',{
                            id:row.id,
                            "status":row.status
                        },
                        {headers: {'Content-Type': 'application/json'}}
                    )
                    .then(function (response) {
                       console.log(response)
                    })
                    .catch(function (err) { // 请求失败处理
                        console.log(err)
                    });
            }
        },
        mounted() {
            var that = this
           this.$axios
                .post('/api/member/list',{
                        "page": 1,
                        "pageSize":7,
                    },
                        {headers: {'Content-Type': 'application/json'}}
                    )
                .then(function (response) {
                    that.tableData = response.data.data.list;
                    that.total = response.data.data.total
                    that.pageSize = response.data.data.pageSize
                    that.currentPage = response.data.data.page
                })
                .catch(function (err) { // 请求失败处理
                        console.log(err)
                });
        }
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
    &:last-child {
         margin-bottom: 0;
     }
    }

</style>