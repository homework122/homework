<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="60px" id="LoginBox">
            <h2>登录</h2>
            <p>欢迎来到后台系统，<br/>请登录</p>
            <el-form-item label="账号" prop="name">
                <el-input type="text" placeholder="请输入账号" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
                <el-input type="password" placeholder="请输入密码" v-model="form.pwd"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">立即登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default{
        name: 'Login',
        data(){
            return {
                form: {
                    name: '',
                    pwd:''
                },
                rules:{
                    name: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    pwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                                if (valid) {
                                    this.$axios.post('/api/admin/login',{
                                        "name": this.form.name,
                                        "password":this.form.pwd
                                    }, {
                                        headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then((res) => {
                            if(res.data.code == 200){
                                this.$notify({
                                    title: '成功',
                                    message: '登录成功',
                                    type: 'success'
                                });
                                this.$router.push({ path: '/Main', params: { user: res.data.name }})
                            }else {
                                this.$message.error('用户名或密码错误')
                            }
                    })
                    } else {
                        this.$message.error('请输入账号或密码');
                    }
                })
            }
        }
    }
</script>

<style scope>
    #LoginBox{
        width: 400px;
        margin: 150px auto 0 auto;
        border: 1px solid #DCDFE6;
        padding: 30px;
        border-radius: 8px;
    }

</style>