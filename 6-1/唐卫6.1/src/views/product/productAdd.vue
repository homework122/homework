<template>
    <div>
        <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <!--<el-form-item label="商品id" >-->
                <!--<el-col :span="11">-->
                <!--<el-input v-model="ruleForm.productid"></el-input>-->
                <!--</el-col>-->
            <!--</el-form-item>-->
            <el-form-item label="商品">
                <el-col :span="11">
                    <el-input v-model="ruleForm.productName"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="品牌名">
            <el-col :span="11">
                <el-input v-model="ruleForm.type"></el-input>
            </el-col>
        </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default{
        name: 'productAdd',
        data(){
            return {
                ruleForm: {
                    productName: '',
                    productid:'',
                    type:''
                }
    }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/api/goods/add',{
                            "brandId":'fbca81a68f6611eaa03e0242ac110002' ,
                            "goodsName":this.ruleForm.productName,
                            "goodsTitle":this.ruleForm.type,
                            "catId": "4ff6bcab95b811eaa03e0242ac110002",// 分类ID-必传
                            "goodsDetail": "商品详情",// 商品详情-必传
                            "goodsImgs": "商品图片",// 商品图片-必传
                            "goodsPrice": 100, // 商品价格-必传
                            "goodsScore": 100,// 商品积分-必传
                            "keywords": "扩音器,喇叭", // 关键字-必传
                            "recommend": 1, // 是否推荐,1 推荐, 0 不推荐-必传
                            "status": 1// 状态, 1 上架, 0 下架-必传

                        }, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then((res) => {
                            alert(res.data.msg)
                            console.log(res)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scope>


</style>