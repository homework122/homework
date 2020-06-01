<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="品牌描述" prop="sketch">
                <el-input v-model="form.sketch" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="品牌名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="图片地址" prop="img">
                <el-input v-model="form.img" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import ElForm from "../../node_modules/element-ui/packages/form/src/form";
    export default{
        components: {ElForm},
        name: 'addBrand',
        data(){
            return {
                form: {
                    sketch: '',
                    name: '',
                    img:''
                },
                rules:{
                    sketch: [
                        { required: true, message: '请输入描述', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' }
                    ],
                    img:[
                        { required: true, message: '请输入图片地址', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/api/brand/add',{
                            "brandDesc":  this.form.sketch, // 品牌描述
                            "brandLogo":  this.form.img,// 品牌logo-必传
                            "brandName":  this.form.name // 品牌名字-必传
                        },{
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then((res) => {
                            if(res.data.code == 200){
                                this.$message({
                                    dangerouslyUseHTMLString:true,
                                    message: `<span>恭喜你，这是一条成功消息</span>`,
                                    type: 'success'
                                });
                                this.form.sketch='';
                                this.form.name='';
                                this.form.img=''
                            }
                        })
                    }else {
                        this.$message.error('表格输入不完整');
                    }
            })
            }
    }
}
</script>

<style scope>
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
 