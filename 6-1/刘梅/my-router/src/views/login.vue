<template>
  <div class="div">
    <!--登录-->
    <div class="biaodan" v-show="ok">
      <h1>登录页</h1>
      <h5>欢迎来到后台管理系统</h5>
      <el-form rdf="form" :model="form" label-width="80px">
        <el-form-item label="账号">
          <el-input type="text" placeholder="请输入账号" v-model="form.name"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="text" placeholder="请输入密码" v-model="form.password"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <img src="./../assets/img/蓝湖登录图 (2).png" alt="">
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      form: {
        name: '',
        password: ''
      },
      ok: true
    }
  },
  methods: {
    onSubmit () {
      console.log(this.form.name)
      this.$axios.post('/api/admin/login', { name: this.form.name, password: this.form.password }, {
        // 设置请求头
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        // var res = response.data
        // post传参
        console.log(response)
        if (response.data.code === 200) {
          window.sessionStorage.setItem('name', JSON.stringify(response.data.data.name))
          console.log(window.sessionStorage.getItem('name'))
          this.form.name = ''
          this.form.password = ''
          // 页面跳转
          this.$router.replace('chaidan')
        } else if (response.data.code === '1001') {
          this.$alert('账号密码不能为空')
        } else {
          this.$alert('登录失败')
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  // mounted: function () {
  //
  // }
}
</script>
<style scoped>
  .div {
    width: 900px;
    height: 550px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 2px 19px 1px rgba(69, 47, 133, 0.2);
    position: relative;
    margin: 0 auto;
  }

  h1 {
    padding-top: 50px;
  }

  .biaodan {
    width: 650px;
    height: 550px
  }

  .shuru1 {
    margin-bottom: 100px;
  }

  .shuru2 {
    margin-bottom: 100px;
  }

  img {
    width: 200px;
    height: 550px;
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
