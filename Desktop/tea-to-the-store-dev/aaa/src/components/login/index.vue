<template>
    <header>
      <ul class="header">
        <li class="back-icon">
          <van-icon name="arrow-left" color="#fff" @click="goBack" />
        </li>
        <li class="login">
          <slot>
            <span>登录</span>
          </slot>
        </li>
        <li class="home-icon">
          <van-icon name="home-o" color="#fff"  @click="goHome" />
        </li>
      </ul>
    </header>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const goBack = () => {
    router.back()
  }
  const goHome = () => {
    router.push({ name: 'tea' })
  }
  </script>
  
  <style lang="scss" scoped>
  .van-badge__wrapper{
    font-size: 24px;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 44px;
    background-color: #bc0707;
    li {
      height: 100%;
    }
    .back-icon {
      margin-left: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .login {
      font-size: 18px;
      color: #fff;
      line-height: 44px;
    }
    .home-icon {
      margin-right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  </style>