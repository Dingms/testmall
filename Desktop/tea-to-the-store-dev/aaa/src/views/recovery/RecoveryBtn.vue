<template>
  <div class="recovery-container container">
    <Header>
      <span>找回密码</span>
    </Header>
    <section>
      <van-form class="recovery-form" :show-error-message="false" ref="form">
        <!-- <van-cell-group inset> -->
        <div class="form-content">
          <van-field v-model="password" type="password" name="password" placeholder="请输入新密码" :rules="passwordRules" class="password" @blur="getPasswordCheck" :class="showRedBorderP?'red-border':''" />
        </div>
      </van-form>
      <div class="btn-recovery" @click="submit">
        确定
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script setup>
import Header from '@/components/login/index.vue'
import { ref } from '@vue/reactivity'
import { getCurrentInstance } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { showSuccessToast, showToast, showFailToast } from 'vant'
import 'vant/es/toast/style'
const router = useRouter()
const route = useRoute()
const password = ref('')

const showRedBorderP = ref(false)
const { proxy } = getCurrentInstance()


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
      border-radius:6px;
      font-size: 16px;
      input {
        height: 24px;
      }
    }
  }
}
.btn-recovery {
  margin: 0 20px;
  height: 46px;
  text-align: center;
  line-height: 46px;
  background-color: #bc0707;
  color: #fff;
  font-size: 16px;
  border-radius:6px;
}
.red-border {
  border: 1px solid red !important;
}
</style>