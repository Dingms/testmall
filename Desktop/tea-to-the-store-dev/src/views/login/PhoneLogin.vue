<template>
    <div class="login-container container">
      <Header></Header>
      <section>
        <van-form class="phone-form" :show-error-message="false" ref="form">
          <!-- <van-cell-group inset> -->
          <div class="form-content">
            <van-field v-model="username" name="username" placeholder="请输入手机号" :rules="userRules" class="username" @blur="getPhoneCheck" :class="showRedBorderU?'red-border':''" />
            <div class="msg">
              <van-field v-model="code" type="text" name="code" placeholder="请输入短信验证码" :rules="codeRules" class="code" @blur="getCodeCheck" :class="showRedBorderC?'red-border':''" />
              <button @click="sendCode" :disabled="disable">{{codeMsg}}</button>
            </div>
          </div>
        </van-form>
        <div class="btn-login" @click="submit">
          登录
        </div>
        <div class="changeWay">
          <div @click="goUserLogin">
            <van-icon name="manager-o" />
            密码登录
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
  import { showToast, showFailToast, showSuccessToast } from 'vant'
  import { PhoneLogin,addUser } from '@/api/login'
  import 'vant/es/toast/style'
  import useUserStore from "@/store/common"
  const userStore=useUserStore()
  const router = useRouter()
  const username = ref('')
  const code = ref('')
  const codeReceived = ref('')
  const disable = ref(false)
  const codeMsg = ref('获取短信验证码')
  const dropDown = ref(60)
  const showRedBorderU = ref(false)
  const showRedBorderC = ref(false)
  const { proxy } = getCurrentInstance()
  const goUserLogin = () => {
    router.push({ name: 'UserLogin' })
  }
  const goRegister = () => {
    router.push({ name: 'Register' })
  }
  const sendCode = () => {
  proxy.$refs.form
    .validate('username')
    .then(async () => {
      disable.value = true
      const res = await PhoneLogin(username)
      console.log(res.data.number);
      if (res.code==0) {
        codeReceived.value = res.data.number
      }
      codeMsg.value = '重新发送60s'
      let timer = setInterval(() => {
        --dropDown.value
        codeMsg.value = `重新发送${dropDown.value}s`
      }, 1000)
      setTimeout(() => {
        clearTimeout(timer)
        disable.value = false
        codeMsg.value = '获取短信验证码'
        dropDown.value = 60
      }, 60000)
    })
    .catch(() => {
      showToast({
        message: '请输入正确的手机号',
        position: 'top'
      })
    })
}
  const userRules = [
    {
      required: true
    },
    {
      validator: val => {
        return /^1[3456789]\d{9}$/.test(val)
      }
    }
  ]
  const codeRules = [
    {
      required: true
    }
  ]
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
  const getCodeCheck = () => {
    proxy.$refs.form
      .validate('code')
      .then(() => {
        showRedBorderC.value = false
      })
      .catch(() => {
        showRedBorderC.value = true
        showToast({
          message: '请输入验证码',
          position: 'top'
        })
      })
  }
  const submit=()=>{
    proxy.$refs.form
    .validate()
    .then(async () => {
      if (code.value == codeReceived.value) {
        const res =await addUser(username)
        console.log(res);
        if (res.code==0) {
          showSuccessToast(res.data.msg)
          userStore.setUser(res.data.token)
          router.replace("/center")
        } else {
          showFailToast(res.data.msg)
        }
      } else {
        showFailToast('手机号或验证码有误')
      }
    })
    .catch((e) => {
        console.log(e);
      showFailToast('请正确填写手机号和验证码')
    })
  }
  </script>
  
  <style lang="scss" scoped>
  .phone-form {
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
    .msg {
      display: flex;
      // align-items: center;
      .code {
        width: 65%;
        border-radius: 6px 0 0 6px;
      }
      button {
        width: 35%;
        font-size: 14px;
        height: 46px;
        padding: 0;
        border: none;
        color: #fff;
        background-color: #bc0707;
        border-radius: 0 6px 6px 0;
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