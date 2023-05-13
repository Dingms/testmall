<template>
    <van-tabbar route active-color="#df2b20">
    <van-tabbar-item icon="wap-home-o" to="/tea">首页</van-tabbar-item>
    <van-tabbar-item icon="apps-o" to="/list">分类</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o" to="/cart">购物车</van-tabbar-item>
    <van-tabbar-item icon="manager-o" to="/center">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref } from 'vue';

const active = ref(0);

</script>

<style lang="scss" scoped>

</style>