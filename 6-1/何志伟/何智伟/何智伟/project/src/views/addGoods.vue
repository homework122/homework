<template>
    <div>
        <el-row>
            <el-col :span="8"><div class="grid-content bg-purple-dark">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="品牌名称">
                        <el-select v-model="form.brandId" placeholder="请选择品牌名" >
                            <el-option v-for="item in brandArr" :key="item.id" :label="item.brandName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品类型">
                        <el-select v-model="form.catId" placeholder="请选择商品类型">
                            <el-option v-for="item in categoryArr" :key="item.id" :label="item.catName" :value="item.id"></el-option>

                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品名称">
                        <el-input v-model="form.goodsName"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌标题">
                        <el-input v-model="form.goodsTitle"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌详情">
                        <el-input v-model="form.goodsDetail"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格">
                        <el-input v-model="form.goodsPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="商品积分">
                        <el-input v-model="form.goodsScore"></el-input>
                    </el-form-item>
                    <el-form-item label="商品图片">
<!--                        <el-input v-model="form.goodsImgs"></el-input>-->
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
                    <el-form-item label="关键字">
                        <el-input v-model="form.keywords"></el-input>
                    </el-form-item>
                    <el-form-item label="是否推荐">
                        <el-select v-model="form.recommend">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="创建状态">
                        <el-select v-model="form.status" >
                            <el-option label="上架" value="1"></el-option>
                            <el-option label="下架" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div></el-col>
        </el-row>
    </div>
</template>

<script>

    function parem(obj,url) {
        return{

            "brandId":'obj.brandId' ,
            "catId":obj.catId ,
            "goodsDetail":obj.goodsDetail,
            "goodsImgs":url,
            "goodsName":obj.goodsName,
            "goodsPrice":obj.goodsPrice,
            "goodsScore":obj.goodsScore,
            "goodsTitle":obj.goodsTitle ,
            "keywords":obj.keywords ,
            "recommend": obj.recommend,
            "status":obj.status //
        }

    }
    export default {
        name: '',
        props: [],
        data: function () {
            return {
                imageUrl: '',
                form:{
                    "brandId":'' ,// 品牌ID-必传
                    "catId":'' ,// 分类ID-必传
                    "goodsDetail": '',// 商品详情-必传
                    "goodsImgs":'',// 商品图片-必传
                    "goodsName":'',// 名字-必传
                    "goodsPrice": '', // 商品价格-必传
                    "goodsScore":'',// 商品积分-必传
                    "goodsTitle":'' , // 商品标题-必传
                    "keywords":'' , // 关键字-必传
                    "recommend": '', // 是否推荐,1 推荐, 0 不推荐-必传
                    "status":'' // 状态, 1 上架, 0 下架-必传
                },
                brandArr:[],
                categoryArr:[],

            }
        },
        methods:{
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


            onSubmit() {
                console.log(this.form);
                console.log(this.imageUrl)
                // http://172.16.8.27:8080/67cbaf65-829c-434d-9ed2-48e6e89ff624
                var url = this.imageUrl.substr(5).replace('http://172.16.8.27:8080','/goods/2020/05/08')
                console.log(url)
                this.$axios
                    .post('/api/goods/add',parem(this.form,url),
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
            let that = this
            this.$axios
                .post('/api/brand/list',
                    {headers: {'Content-Type': 'application/json'}}
                )
                .then(function (response) {
                    that.brandArr=response.data.data.list
                    that.$axios
                        .post('/api/category/list',
                            {headers: {'Content-Type': 'application/json'}}
                        )
                        .then(function (response) {
                            that.categoryArr=response.data.data.list


                        })
                        .catch(function (err) { // 请求失败处理
                            console.log(err)
                        });

                })
                .catch(function (err) { // 请求失败处理
                    console.log(err)
                });

        }
    }



</script>

<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

</style>