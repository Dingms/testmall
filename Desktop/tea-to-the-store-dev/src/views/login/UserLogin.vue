<template>
    <div class="login-container container">
      <Header></Header>
      <section>
        <van-form class="user-form" :show-error-message="false" ref="form">
          <!-- <van-cell-group inset> -->
          <div class="form-content">
            <van-field v-model="username" name="username" placeholder="请输入手机号" :rules="userRules" class="username" @blur="getPhoneCheck" :class="showRedBorderU?'red-border':''" />
            <van-field v-model="password" type="password" name="password" placeholder="请输入密码" :rules="passwordRules" class="password" @blur="getPasswordCheck" :class="showRedBorderP?'red-border':''" />
          </div>
        </van-form>
        <div class="btn-login" @click="submit">
          登录
        </div>
        <div class="changeWay">
          <div @click="goPhoneLogin">
            <van-icon name="manager-o" />
            短信登录
          </div>
          <div @click="goRecovery">
            <van-icon name="revoke" />
            找回密码
          </div>
          <div @click="goRegister">
            <van-icon name="desktop-o" />
            快速注册
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import Header from '@/components/login/index.vue'
  import { ref } from '@vue/reactivity'
  import { getCurrentInstance } from '@vue/runtime-core'
  import { useRouter } from 'vue-router'
  import { showSuccessToast, showToast, showFailToast } from 'vant'
  import {passLogin} from "@/api/login"
  import 'vant/es/toast/style'
  import useUserStore from "@/store/common"
  const userStore=useUserStore()
  const router = useRouter()
  const username = ref('')
  const password = ref('')
  const showRedBorderU = ref(false)
  const showRedBorderP = ref(false)
  const { proxy } = getCurrentInstance()
  const goPhoneLogin = () => {
    router.push({ name: 'PhoneLogin' })
  }
  const goRegister = () => {
    router.push({ name: 'Register' })
  }
  const goRecovery = () => {
    router.push({ name: 'recovery' })
  }

  // username的表单验证
  const userRules = [
    {
      required: true,
      message: '手机号必须填入'
    },
    {
      validator: val => {
        return /^1[3456789]\d{9}$/.test(val)
      }
    }
  ]
  // 密码的表单验证
  const passwordRules = [
    {
      required: true,
      message: '密码必须填入'
    },
    {
      validator: val => /^\w{6,12}$/.test(val),
      message: '密码必须是6~12位'
    }
  ]
  // username的表单验证函数
  const getPhoneCheck = () => {
    proxy.$refs.form
      .validate('username')
      .then(() => {
        showRedBorderU.value = false
      })
      .catch(() => {
        showRedBorderU.value = true
        showToast({
          message: '请输入正确的手机号',
          position: 'top'
        })
      })
  }
  // 密码的表单验证函数
  const getPasswordCheck = () => {
    proxy.$refs.form
      .validate('password')
      .then(() => {
        showRedBorderP.value = false
      })
      .catch(() => {
        showRedBorderP.value = true
        showToast({
          message: '密码必须是6~12位',
          position: 'top'
        })
      })
  }
  const submit=()=>{
    proxy.$refs.form
    .validate()
    .then(async () => {
      // 全局验证通过后发送请求
      const res = await passLogin({username:username.value,password:password.value})
      if (res.code==0) {
        showSuccessToast(res.data.msg)
        userStore.setUser(res.data.token)
        router.replace("/center")
      } else {
        showFailToast(res.data.msg)
      }
    })
    .catch((e) => {
        console.log(e);
      showFailToast('请正确输入手机号和密码')
    })
  }
  </script>
  
  <style lang="scss" scoped>
  .user-form {
    margin-top: 30px;
    .form-content {
      padding: 0 20px;
      &:deep(.van-cell) {
        padding: 10px 10px;
        margin-bottom: 20px;
        border: 1px solid #aaa;
        border-radius: 6px;
        font-size: 16px;
        input {
          height: 24px;
        }
      }
    }
  }
  .btn-login {
    margin: 0 20px;
    height: 46px;
    text-align: center;
    line-height: 46px;
    background-color: #bc0707;
    color: #fff;
    font-size: 16px;
    border-radius: 6px;
  }
  .changeWay {
    font-size: 15px;
    display: flex;
    margin: 20px;
    justify-content: space-between;
  }
  .red-border {
    border: 1px solid red !important;
  }
  </style>