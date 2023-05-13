<template>
  <div class="recovery-container container">
    <Header>
      <span>找回密码</span>
    </Header>
    <section>
      <van-form class="recovery-form" :show-error-message="false" ref="form">
        <!-- <van-cell-group inset> -->
        <div class="form-content">
          <van-field v-model="username" name="username" placeholder="请输入手机号" :rules="userRules" class="username" @blur="getPhoneCheck" :class="showRedBorderU?'red-border':''" />
          <div class="msg">
            <van-field v-model="code" type="text" name="code" placeholder="请输入短信验证码" :rules="codeRules" class="code" @blur="getCodeCheck" :class="showRedBorderC?'red-border':''" />
            <button @click="sendCode" :disabled="disable">{{codeMsg}}</button>
          </div>
        </div>
      </van-form>
      <div class="btn-next" @click="next">
        下一步
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script setup>
import Header from '@/components/login/index.vue'
import { ref } from '@vue/reactivity'
import { getCurrentInstance } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { showToast, showFailToast, showSuccessToast } from 'vant'
import 'vant/es/toast/style'
const router = useRouter()
const username = ref('')
const code = ref('')
const codeReceived = ref('')
const disable = ref(false)
const codeMsg = ref('获取短信验证码')
const dropDown = ref(6)
const showRedBorderU = ref(false)
const showRedBorderC = ref(false)
const { proxy } = getCurrentInstance()
const goUserLogin = () => {
  router.push({ name: 'UserLogin' })
}
const goRegister = () => {
  router.push({ name: 'Register' })
}
const onFailed = errorInfo => {
  console.log('failed', errorInfo)
}


// username的表单验证
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
// 验证码的表单验证
const codeRules = [
  {
    required: true
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
// 验证码的表单验证函数
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
</script>

<style lang="scss" scoped>
.recovery-form {
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
.btn-next {
  margin: 0 20px;
  height: 46px;
  text-align: center;
  line-height: 46px;
  background-color: #bc0707;
  color: #fff;
  font-size: 16px;
  border-radius: 6px;
}
.red-border {
  border: 1px solid red !important;
}
</style>