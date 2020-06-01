<template>
    <div>
        <!--        面包屑-->
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark">
                <breadcrumb text="商品列表"></breadcrumb>
            </div></el-col>
        </el-row>
        <!--        搜索-->
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="商品名称">
                        <el-input v-model="formInline.goodsName" placeholder="商品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="formInline.status" placeholder="请选择">
                            <el-option label="上架" value="1"></el-option>
                            <el-option label="下架" value="0"></el-option>
                            <el-option label="全部" value=""></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </div></el-col>
        </el-row>

        <!--         批量删除-->
        <el-row>
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
                            prop="goodsName"
                            label="商品名称"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="goodsTitle"
                            label="商品标题"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="goodsImgs"
                            label="商品图片"
                            width="120">
                        <template slot-scope="scope">
                            <el-image
                                    style="width: 100px; height: 100px"
                                    :src="'http://106.12.22.92:8080/'+scope.row.goodsImgs"
                                    :fit="fill"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="goodsPrice"
                            label="商品价格"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="goodsScore"
                            label="商品积分"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="goodsDetail"
                            label="商品详情"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="keywords"
                            label="关键字"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            label="创建时间"
                            width="120">
                        <template slot-scope="scope">{{ scope.row.createTime.slice(0,10)}}</template>
                    </el-table-column>
                    <el-table-column
                            prop="recommend"
                            label="是否推荐"
                            width="200">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.recommend"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    :active-value="1"
                                    :inactive-value="0"
                                    active-text="是"
                                    inactive-text="否"
                                    @change="changeValue(scope.$index, scope.row)"
                            >
                            </el-switch>
                        </template>
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
                                    active-text="上架"
                                    inactive-text="下架"
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
                        layout="total,sizes, prev, pager, next"
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                        :current-page="currentPage"
                        :page-sizes="[5, 7, 9, 12]"
                        :page-size="pageSize"
                        :total="total">
                </el-pagination>
            </div></el-col>
        </el-row>
<!--        弹框-->

        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form  ref="updataform" :model="updataform"  label-width="80px">
                <el-form-item label="商品名称">
                    <el-input v-model="updataform.goodsName"></el-input>
                </el-form-item>
                <el-form-item label="商品标题">
                    <el-input v-model="updataform.goodsTitle"></el-input>
                </el-form-item>
                <el-form-item label="商品详情">
                    <el-input v-model="updataform.goodsDetail"></el-input>
                </el-form-item>
                <el-form-item label="关键字">
                    <el-input v-model="updataform.keywords"></el-input>
                </el-form-item>
                <el-form-item label="商品图片">
                    <el-input v-model="updataform.goodsImgs"></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input v-model="updataform.goodsPrice"></el-input>
                </el-form-item>
                <el-form-item label="商品积分">
                    <el-input v-model="updataform.goodsScore"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary"  @click="updata">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import breadcrumb from "../components/breadcrumb"; //面包屑

    function parame(brandId,catId,name,page,pageSize,status) {
        return {
            "brandId": brandId,
            "catId":catId,
            "goodsName":name,
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
                    goodsName: '',
                    status:'',
                },

                // 添加
                form: {
                    brandName:'',
                    brandLogo:'',
                    brandDesc:'',
                },

                dialogFormVisible:false,
                updataform:{
                    "goodsDetail": '',
                    "goodsImgs":'' ,
                    "goodsName": '',
                    "goodsPrice":'' ,
                    "goodsScore": '',
                    "goodsTitle":'' ,
                    "keywords":'' ,
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
                this.$axios.post('/api/goods/edit',{
                    "id":this.row.id ,
                    "brandId":this.row.brandId ,
                    "catId":this.row.catId ,
                    "goodsDetail":this.updataform.goodsDetail ,
                    "goodsImgs":this.row.goodsImgs ,
                    "goodsName":this.updataform.goodsName ,
                    "goodsPrice":this.updataform.goodsPrice ,
                    "goodsScore":this.updataform.goodsScore ,
                    "goodsTitle":this.updataform.goodsTitle ,
                    "keywords":this.updataform.keywords ,
                    "status":this.row.status
                }).then(function (response) {

                    if(response.data.code==200){
                        that.dialogFormVisible=false
                        that.$axios
                            .post('/api/goods/list',parame('','','',that.currentPage,that.pageSize,''),
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
                let that = this
                this.$axios
                    .post('/api/goods/delete',{
                            id:id
                        },
                        {headers: {'Content-Type': 'application/json'}}
                    )
                    .then(function (response) {
                        if(response.data.code==200){
                            that.$axios
                                .post('/api/goods/list',parame('','','',that.currentPage,that.pageSize,''),
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
                console.log("点击的是确定按钮");
                this.deleteEvent(this.row.id)


            },
            //查询
            onSubmit() {
                let that = this
                this.$axios
                    .post('/api/goods/list',parame('','',this.formInline.goodsName,1,this.pageSize,this.formInline.status),
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
                    .post('/api/goods/list',parame('','','',val,that.pageSize,''),
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
            handleSizeChange(val) {
                var that = this
                this.$axios
                    .post('/api/goods/list',parame('','','',1,val,''),
                        {headers: {'Content-Type': 'application/json'}}
                    )
                    .then(function (response) {
                        console.log(response.data.data.list)
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
                console.log(row)
                this.$axios
                    .post('/api/goods/edit',{
                            id:row.id,
                            recommend:row.recommend,
                            keywords:row.keywords,
                            goodsImgs:row.goodsImgs,
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
                .post('/api/goods/list',parame('','','',1,that.pageSize,''),
                    {headers: {'Content-Type': 'application/json'}}
                )
                .then(function (response) {
                    console.log(response.data.data.list)
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