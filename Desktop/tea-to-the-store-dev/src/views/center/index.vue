<template>
    <div class="my-container container">
      <header>
        <div class="userInfo" v-if="loginStatus">
          <img :src="userInfo.imgUrl" alt="">
          <span>{{userInfo.nickName}}</span>
        </div>
        <div class="login" @click="goLogin" v-else>
          登录/注册
        </div>
      </header>
      <section>
        <ul>
          <li>
            <div class="title">
              <van-icon name="location-o" size="18px" color="#e1251b" />
              地址管理
            </div>
            <div class="arrow">
              <van-icon name="arrow" size="18px" />
            </div>
          </li>
          <li v-if="loginStatus" @click="logout">
            <div>
              <van-icon name="revoke" size="18px" color="#e1251b" />
              退出登录
            </div>
            <div class="arrow">
              <van-icon name="arrow" size="18px" />
            </div>
          </li>
        </ul>
      </section>
      <footerPage/>

    </div>
</template>

<script setup>
  import footerPage from "@/components/footerPage/index.vue"
  import { useRouter } from 'vue-router'
  import { onActivated,ref } from "vue"
  import {selectUser}  from "@/api/center"
  import useUserStore from "@/store/common"
  const userStore=useUserStore()
  const router = useRouter()
  const loginStatus=ref(false)
  const userInfo=ref({})
  const goLogin = () => {
    router.push("/login")
  }
  const goAddress = () => {
    router.push({ name: 'Address' })
  }
  onActivated(async ()=>{
    let ret=await selectUser({token:userStore.user})
    if(ret.code==0){
      loginStatus.value=true
      userInfo.value.imgUrl='/img/user01.jpg'
      userInfo.value.nickName=ret.data.username
    }else{
      loginStatus.value=false
    }
  })
  const logout=()=>{
    
      userStore.setUser(null)
      window.location.href = '/center'
  }
</script>

<style lang="scss" scoped>
 .my-container {
    header {
      width: 100%;
      height: 180px;
      background: url('/img/bg.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .login {
        font-size: 18px;
        background-color: #f8ab07;
        color: #fff;
        padding: 10px 20px;
        border-radius: 6px;
      }
      .userInfo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
        span {
          font-size: 18px;
          padding: 10px 0;
        }
      }
    }
    section {
      flex: 1;
      overflow: hidden;
      ul {
        li {
          font-size: 16px;
          padding: 10px;
          height: 30px;
          // line-height: 30px;
          display: flex;
          justify-content: space-between;
          div {
            height: 100%;
            line-height: 30px;
          }
        }
      }
    }
  }
</style>

  
