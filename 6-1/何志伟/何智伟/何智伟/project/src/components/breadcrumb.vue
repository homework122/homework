<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">{{text}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        name: 'breadcrumb',
        props: ["text"]

        ,
        data: function () {
            return {}
        }
    }
</script>

<style scoped>
</style>