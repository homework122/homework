<template>
    <div id="wrap">
        <div id="login">
            <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input v-model="ruleForm.pwd"></el-input>
                </el-form-item>
                <el-form-item>
                   <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'loginVue',
        props: []

        ,
        data() {
            return {
                ruleForm: {
                    name: '',
                    pwd: '',
                },
            }
        },
        methods: {
            submitForm(formName) {
                let that =this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.$refs[formName].model)
                        this.$axios
                            .post('/api/admin/login',{
                                    "name":this.$refs[formName].model.name ,
                                    "password":this.$refs[formName].model.pwd

                                },
                                {headers: {'Content-Type': 'application/json'}}
                            )
                            .then(function (response) {
                                console.log(response)
                                if (response.data.code==200){
                                    that.$router.push('/home')
                                    window.sessionStorage.setItem('userName',response.data.data.name)
                                }
                            })
                            .catch(function (err) { // 请求失败处理
                                console.log(err)
                            });

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

<style scoped>
#wrap{
    width: 100%;
    height: 600px;
    background: url("../assets/img/login_reg_bg.png") no-repeat ;
    background-size: 100%;
}
#login{
    width: 400px;
    margin:0 auto;
    padding-top: 200px;
}



</style>