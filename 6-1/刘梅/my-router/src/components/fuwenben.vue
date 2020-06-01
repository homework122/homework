<template>
<div class='clearfix'>
  <!-- 标题 -->
  <input type="text"
         class='title'
         placeholder="请输入标题"/>
  <!-- 富文本编辑框 -->
  <div id="websiteEditorElem"
       style="height:350px;background: #ffffff; width: 800px" ></div>
  <!-- 提交按钮 -->
  <el-button type="primary"
             @click='submit'
             class='submit'>点击上传
  </el-button>
</div>
</template>
<script>
import E from 'wangeditor'
export default {
  name: 'text',
  data () {
    return {
      phoneEditor: '',
      name: ''
    }
  },
  methods: {
    // 设置保存发送后台数据事件
    submit () {
      var data = new FormData()
      data.append('cotent', this.phoneEditor.txt.html())
      this.$axios({
        methods: 'post',
        url: '后台给的地址',
        data: data,
        headers: {
          // 'token': window.localStorage['token']
        }
      }).then((res) => {
        if (res.status === 200) {
          console.log('success!')
        }
      }).catch((res) => {
        console.log(res)
      })
    }
  },
  mounted () {
    // wangeditor
    this.phoneEditor = new E('#websiteEditorElem')
    // this.phoneEditor.onchange = function () {
    //   this.formData.phone = this.$txt.html()
    // }
    // 上传图片到服务器，base64形式
    this.phoneEditor.customConfig.uploadImgShowBase64 = true
    // 隐藏网络图片
    this.phoneEditor.customConfig.showLinkImg = false
    // 创建一个富文本编辑器
    this.phoneEditor.create()
    // 富文本内容
    this.phoneEditor.txt.html()
  }
}
</script>
<style scoped></style>
