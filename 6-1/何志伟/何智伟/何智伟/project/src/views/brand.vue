<template>
    <div>
        <!--        面包屑-->
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark">
                <breadcrumb text="品牌管理"></breadcrumb>
            </div></el-col>
        </el-row>
        <!--        搜索-->
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="品牌名称">
                        <el-input v-model="formInline.name" placeholder="品牌名称"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="formInline.status" placeholder="请选择">
                            <el-option label="启用" value="1"></el-option>
                            <el-option label="停用" value="0"></el-option>
                            <el-option label="全部" value=""></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </div></el-col>
        </el-row>

        <!--        添加 批量删除-->
        <el-row>
            <el-col :span="2"><div class="grid-content bg-purple">
                <el-button
                        slot="reference"
                        type="primary"
                        @click="handlAdd">
                    添加品牌
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
                            prop="brandName"
                            label="品牌名"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="brandLogo"
                            label="logo"
                            width="120">
                        <template slot-scope="scope">
                            <el-image
                                    style="width: 100px; height: 100px"
                                    :src="'http://106.12.22.92:8080/'+scope.row.brandLogo"
                                    :fit="fill"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="brandDesc"
                            label="描述"
                            width="150">
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
                                    inactive-text="停用"
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
                        @size-change="handleSizeChange"
                        :current-page="currentPage"
                        :page-sizes="[5, 7, 9, 12]"
                        :page-size="pageSize"
                        :total="total">
                </el-pagination>
            </div></el-col>
        </el-row>
<!--弹框-->
        <el-dialog title="修改品牌" :visible.sync="dialogFormVisible">
            <el-form  ref="updataform" :model="updataform"  label-width="80px">
                <el-form-item label="品牌名称">
                    <el-input v-model="updataform.brandName"></el-input>
                </el-form-item>
                <el-form-item label="品牌logo">
                    <el-input v-model="updataform.brandLogo"></el-input>
                </el-form-item>
                <el-form-item label="品牌描述">
                    <el-input v-model="updataform.brandDesc"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary"  @click="updata">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="添加品牌" :visible.sync="addFormdisplay">
            <el-form ref="form" :model="form"   label-width="80px">
                <el-form-item label="品牌名称">
                    <el-input v-model="form.brandName"></el-input>
                </el-form-item>
                <el-form-item label="品牌logo">
                    <el-input v-model="form.brandLogo"></el-input>
                </el-form-item>
                <el-form-item label="品牌描述">
                    <el-input v-model="form.brandDesc"></el-input>
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
    
    function parame(name,page,pageSize,status) {
        return {
            "brandName": name,
            "page": page,
            "pageSize": pageSize,
            "status": status
        }
        
    }

    export default {
        name: 'userVue',
        props: [],
        data:function() {
            return {
                tableData:[],
                multipleSelection: [],
                total:'',//总数
                pageSize:'5',
                currentPage:'',//当前页
                row:'',//行的内容
                centerDialogVisible: false,
                //查询
                formInline: {
                    name: '',
                    status:'',
                },
                // 添加
                addFormdisplay:false,
                form: {
                    brandName:'',
                    brandLogo:'',
                    brandDesc:'',
                },
                dialogFormVisible:false,
                updataform:{
                    brandName:'',
                    brandLogo:'',
                    brandDesc:'',
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
            handlAdd(){
                this.addFormdisplay=true

            },
            // 添加品牌
            onSubmitAdd() {
                let that = this
                this.$axios.post('/api/brand/add',{
                    "brandDesc":this.form.brandDesc , // 品牌描述
                    "brandLogo":this.form.brandLogo ,// 品牌logo-必传
                    "brandName":this.form.brandName // 品牌名字-必传
                }).then(function (response) {
                    if(response.data.code==200){
                        that.addFormdisplay=false
                        that.$axios
                            .post('/api/brand/list',parame('',that.currentPage,that.pageSize,''),
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
            //编辑
            handleEdit(index, row) {
                console.log(index, row);
                for (var key in this.updataform){
                    this.updataform[key] = row[key]
                }
                this.row=row
                this.dialogFormVisible=true
            },
            // 跟新提交
            updata(){
                let that = this
                this.$axios.post('/api/brand/edit',{
                    "id":this.row.id , // ID-必传
                    "brandDesc": this.updataform.brandDesc, // 描述-可省略
                    "brandLogo": this.updataform.brandLogo,// logo-可省略
                    "brandName": this.updataform.brandName // 名字-可省略



                }).then(function (response) {
                    if(response.data.code==200){
                        that.dialogFormVisible = false
                        that.$axios
                            .post('/api/brand/list',parame('',that.currentPage,that.pageSize,''),
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
            // 获取id
            handleRow(index,row){
                console.log(index,row)
                this.row=row
                console.log(row)
            },
            //删除
            deleteEvent(id) {
                var that = this
                this.$axios
                    .post('/api/brand/delete',{
                            id:id
                        },
                        {headers: {'Content-Type': 'application/json'}}
                    )
                    .then(function (response) {
                        if(response.data.code==200){
                            that.$axios
                                .post('/api/brand/list',parame('',that.currentPage,that.pageSize,''),
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
                        console.log(response.data)
                    })
                    .catch(function (err) { // 请求失败处理
                        console.log(err)
                    });
            },
            handlerOk(){
                this.centerDialogVisible = false;
                console.log("点击的是确定按钮");
                this.deleteEvent(this.row.id)


            },
            //查询
            onSubmit() {
                var that=this
                this.$axios
                    .post('/api/brand/list',parame(that.formInline.name,1,that.pageSize,that.formInline.status),
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


            //页码
            handleCurrentChange(val){
                var that = this
                this.$axios
                    .post('/api/brand/list',parame('',val,that.pageSize,''),
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
            //改变添加
            handleSizeChange(val) {
                var that = this
                this.$axios
                    .post('/api/brand/list',parame('',1,val,''),
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
            // 滑块
            changeValue(index,row){
                this.$axios
                    .post('/api/brand/edit',{
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
                .post('/api/brand/list',parame('',1,that.pageSize,''),
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