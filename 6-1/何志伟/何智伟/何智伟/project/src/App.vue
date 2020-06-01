<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

  // import login from "./views/login";

export default {
  name: 'App',
  data(){
    return {

    }
  },
  components: {
    // login,
  },
  provide () {
    return {

    }
  },
}
</script>

<style>




  h2, .div{
    height: 50px;
  }
  h2{
    line-height: 50px;
    padding-left:20px ;
  }

  .div{
    overflow: hidden;
    margin-top: 20px;
  }
  .div p{
    float: left;
    margin-left: 210px;
  }


</style>
