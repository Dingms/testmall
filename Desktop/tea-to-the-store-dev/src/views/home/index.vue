<template>
    <Header></Header>
  <van-tabs v-model:active="active" title-active-color="#ff5f16" title-inactive-color="#191a1b" color="#ff5f16">
  <van-tab title="推荐" to="/tea/recommend"></van-tab>
  <van-tab title="金骏眉" to="/tea/JinjunmeiBlackTea"></van-tab>
  <van-tab title="大红袍" to="/tea/clovershrub"></van-tab>
  <van-tab title="铁观音" to="/tea/TieGuanyin"></van-tab>
</van-tabs>
<RouterView/>
<footer-page></footer-page>
</template>

<script setup>
import Header from "@/components/header/index.vue"
import footerPage from "@/components/footerPage/index.vue"
import {ref} from "vue"
const active = ref(0);
</script>

<style lang="scss" scoped>
.van-tabs {
  margin-top: 40px;
}
:deep(.van-tabs__wrap){
  position: fixed;
  top: 40px;
  z-index: 9;
  width: 100%;
}
</style>