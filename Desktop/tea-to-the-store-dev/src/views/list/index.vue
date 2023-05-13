<template>
    <div class="list-container">
      <header v-if="isShow">
        <div class="header-container">
            
          <ul class="header">
            <li>
              <i>
                <van-icon name="arrow-left" color="#fff" @click="goBack"/>
              </i>
            </li>
            <li class="search">
              <van-icon name="search" color="#aaa" />
              <span>搜索您喜欢的...</span>
            </li>
            <li class="home-icon">
              <van-icon name="home-o" color="#fff" @click="goHome"/>
            </li>
          </ul>
        </div>
      </header>
      <section>
        <div class="list-l" >
          <ul>
            <li v-for="(item,index) in leftData" :key="index" @click="goScroll(item.id)" :class="currentIndex == index?'active':''">{{item.name}}</li>
          </ul>
        </div>
        <div class="list-r" ref="right">
          <div>
            <div class="top-img">
              <img src="/img/swiper05.jpeg" alt="">
            </div>
            <ul>
              <li class="shop-list" v-for="item in leftData" :key="item.id">
                <h2>
                  <span>{{item.name}}</span>
                </h2>
                <ul class="r-content">
                  <li v-for="value in item.data" :key="value.id">
                    <img :src="value.imgUrl" alt="">
                    <span>{{value.name}}</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>
     <footerPage/>
    </div>
  </template>
  
  <script setup>
  import footerPage from "@/components/footerPage/index.vue"
  import { onBeforeMount,ref,computed } from "vue";
  import { useRouter } from "vue-router";
  import {getList} from "@/api/list"
  import {useScrollStickyTabHook} from "./hooks"
  const stickyTab=useScrollStickyTabHook()
  const router=useRouter()
  const leftData=ref(null)
  const isShow=ref(true)
  const allHeight = ref([])
  const scrollY = ref(0)
  const left=ref(null)
  onBeforeMount(async ()=>{
    let ret=await getList()
    leftData.value=ret.data
  })
  const goBack=()=>{
    router.back()
  }
  const goHome=()=>{
    router.push("/tea")
  }
  const goScroll=(id)=>{
    console.log(id);
  }
  let currentIndex = computed(() => {
  return allHeight.value.findIndex((item, index) => {
    return scrollY.value >= item && scrollY.value < allHeight.value[index + 1]
  })
})
  </script>
  
  <style lang="scss" scoped>
  .list-container {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    section {
      display: flex;
      margin-bottom: 56px;
      flex: 1;
      .top-img {
        width: 261px;
        height: 128px;
        margin: 0 auto;
        padding: 10px 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .list-l {
        width: 93px;
        background-color: #fff;
        border-right: 1px solid #efefef;
        ul {
            position: sticky;
            top: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          li {
            width: 100%;
            text-align: center;
            font-size: 14px;
            line-height: 30px;
            height: 30px;
            margin: 15px 0;
            position: relative;
            &::before {
              position: absolute;
              top: 0;
              left: 0;
              vertical-align: middle;
              content: '';
              display: inline-block;
              width: 2px;
              height: 30px;
              // background-color: #e1251b;
            }
          }
        }
      }
      .list-r {
        flex: 1;
        height: 100%;
        overflow: hidden;
        .shop-list {
          padding-bottom: 20px;
          text-align: center;
          h2 {
            font-size: 18px;
            font-weight: 400;
            padding: 20px 0 10px 0;
            span {
              position: relative;
  
              &::before,
              &::after {
                position: absolute;
                content: '';
                top: 0;
                bottom: 0;
                margin: auto;
                height: 1px;
                width: 20px;
                background-color: #d9d9d9;
                -webkit-transform-origin: 50% 100% 0;
                transform-origin: 50% 100% 0;
              }
              &::before {
                left: -28px;
              }
              &::after {
                right: -28px;
              }
            }
          }
          .r-content {
            display: flex;
            flex-wrap: wrap;
            // justify-content: space-between;
            li {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              width: 33.3%;
              padding: 10px 0;
              img {
                width: 53px;
                height: 53px;
              }
              span {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
  .active {
    border-left: 6px solid #e1251b;
    color: #e1251b;
  }
  // .header-container {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   z-index: 99;
  // }
  .header {
    // position: fixed;
    display: flex;
    // top: 0;
    // z-index: 99;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 44px;
    background-color: #e1251b;
    .search {
      width: 280px;
      height: 30px;
      // margin-left: 10px;
      border-radius: 15px;
      background-color: #fff;
      display: flex;
      align-items: center;
      i {
        margin: 0 10px;
      }
      span {
        font-size: 14px;
        color: #aaa;
      }
    }
    .home-icon {
      margin-right: 10px;
    }
  }
  .van-badge__wrapper {
  font-size: 24px;
}
  </style>