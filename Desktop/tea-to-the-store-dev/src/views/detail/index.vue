<template >
  <div class="detail-container" v-if="detail">
    <header>
      <div class="header-returns" v-show="!stickyTab">
        <div>
          <van-icon name="arrow-left" color="#fff" @click="goBack" />
        </div>
        <div>
          <van-icon name="home-o" color="#fff" @click="goHome" />
        </div>
      </div>
      <div class="bg"></div>
      <div class="header-bar" v-show="stickyTab">
        <div class="back">
          <van-icon name="arrow-left" color="#000" @click="goBack" />
        </div>
        <div class="center">
          <div>
            <span>商品评价</span>
          </div>
          <div>
            <span>商品详情</span>
          </div>
        </div>
        <div class="home">
          <van-icon name="home-o" color="#000" @click="goHome" />
        </div>
      </div>
    </header>
    <section ref="wrapper">
      <div>
        <div class="swiper-container">
          <van-swipe class="my-swipe" :autoplay="3000" :show-indicators="false">
            <van-swipe-item v-for="(item, index) in imgList" :key="index">
              <img :src="item" alt="">
            </van-swipe-item>
            <template #indicator="{ active, total }">
              <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
            </template>
          </van-swipe>
        </div>
        <div class="goods-msg">
          <div class="goods-name">
            <h1>{{ detail.title }}</h1>
            <div>{{ detail.content }}</div>
          </div>
          <div class="goods-price">
            <div class="oprice">
              <span>￥</span>
              <b>{{ detail.price }}</b>
            </div>
            <div class="pprice">
              <span>价格：</span>
              <del>￥{{ detail.souPrice }}</del>
            </div>
          </div>
        </div>
        <div class="commends">
          <div class="cmd-header">
            <div class="title">
              茶友点评（{{ total }}）
            </div>
            <div class="more">
              <span>查看更多 ></span>
            </div>
          </div>
          <ul v-if="pl">
            <li class="cmd-content" v-for="item in 4" :key="item">
              <div class="user">
                <img src="/img/user01.jpeg" alt="">
                <span class="username">
                  {{ pl.zh[item].name }}
                </span>
              </div>
              <div class="commend">
                {{ pl.zh[item].pl }}
              </div>
              <div class="time">
                {{ pl.zh[item].time }}
              </div>
            </li>
          </ul>
        </div>
        <div class="goods-details">
          <div class="title">商品详情</div>
          <ul class="details-img">
            <li v-for="item in 3" :key="item">
              <img :src="detail.imgUrl" alt="">
            </li>

          </ul>
        </div>
      </div>
    </section>
    <footer>
      <ul>
        <li class="service">
          <van-icon name="service" color="#aaa" />
          <span>客服</span>
        </li>
        <li class="favorite">
          <van-icon name="star-o" color="#aaa" />
          <span>收藏</span>
        </li>
        <li class="mycart" @click="goCart">
          <van-icon name="cart-o" color="#aaa" />
          <span>购物车</span>
        </li>
        <li class="cart" @click="addCart">
          <span>加入购物车</span>
        </li>
        <li class="buy">
          <span>立即购买</span>
        </li>
      </ul>
    </footer>
  </div>
</template>
  
<script setup>
import { useRouter } from 'vue-router';
import { ref, onActivated, onDeactivated } from 'vue';
import { useScrollStickyTabHook } from './hooks'
import { getDetail } from "@/api/detail"
import useUserStore from "@/store/common"
import { showSuccessToast, showFailToast } from 'vant';
import axios from 'axios';
const userStore = useUserStore()
const props = defineProps(['id'])
const router = useRouter()
const goBack = () => {
  router.back()
}
const goHome = () => {
  router.push({ name: 'tea' })
}
const stickyTab = useScrollStickyTabHook()
const detail = ref(null)
const imgList = ref(Array(5))
const total = ref(0)
const pl = ref([])
const goCart = () => {
  router.push("/cart")
}
const addCart = async () => {
  if (userStore.user) {
    let ret = await axios.post("/api/addCart", { token: userStore.user, num: 1, ...detail.value }).then(data=>data.data)
    if (ret.code === 0) {
      showSuccessToast('添加成功');
    } else {
      showFailToast('添加失败');
    }
  } else {
    showFailToast('请先登录');
    setTimeout(()=>{
      router.push("/login")
    },600)
  }
}
onActivated(async () => {
  let ret = await getDetail(props.id)
  detail.value = ret.data.data
  imgList.value.fill(ret.data.data.imgUrl)
  total.value = ret.data.total
  pl.value = ret.data.pl
})
onDeactivated(() => {
  detail.value = null
})


</script>
  
<style lang="scss" scoped>
.detail-container {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;

  section {
    margin-bottom: 50px;
    flex: 1;
  }
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  z-index: 99;

  .header-returns {
    width: 100%;
    height: 100%;
    align-content: center;
    display: flex;
    justify-content: space-between;

    div {
      margin: 5px;
      width: 34px;
      height: 34px;
      // text-align: center;
      // line-height: 34px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.3);
    }
  }

  .bg {
    position: fixed;
    // 再z-index等于99的基础上令z-index为-1表示
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
  }

  .header-bar {
    background-color: #fff;
    border-bottom: 1px solid #efefef;
    width: 100%;
    height: 100%;
    align-content: center;
    display: flex;
    justify-content: space-between;

    .back,
    .home {
      margin: 5px;
      width: 34px;
      height: 34px;
      text-align: center;
      line-height: 34px;
    }

    .center {
      line-height: 44px;
      font-size: 16px;
      display: flex;

      div {
        margin: 0 15px;
      }
    }
  }
}

.swiper-container {
  height: 375px;

  .van-swipe {
    height: 100%;
  }

  img {
    width: 100%;
    height: 375px;
  }
}

.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 3px 6px;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.1);
  color: #fff;
}

.goods-msg {
  background-color: #fff;
  padding: 0 10px;
  border-bottom: 1px solid #efefef;

  .goods-name {
    padding: 15px 0;
    border-bottom: 1px solid #efefef;

    h1 {
      font-size: 18px;
      font-weight: 400;
    }

    div {
      font-size: 14px;
      padding-top: 10px;
      color: #999;
    }
  }

  .goods-price {
    padding: 10px 0;

    .oprice {
      color: #e1251b;

      span {
        font-size: 16px;
      }

      b {
        font-size: 28px;
        font-weight: 400;
      }
    }

    .pprice {
      padding-top: 5px;
      font-size: 10px;
      color: #999;
    }
  }
}

.commends {
  padding: 10px;
  margin-top: 10px;
  background-color: #fff;

  .cmd-header {
    width: 100%;
    height: 22px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      height: 100%;
      position: relative;
      margin-left: 10px;
      line-height: 22px;
      font-size: 16px;

      &::before {
        content: '';
        display: inline-block;
        width: 5px;
        height: 16px;
        background-color: #e1251b;
        position: absolute;
        top: 2px;
        left: -12px;
      }
    }

    .more {
      height: 100%;
      color: #999;
      line-height: 22px;
      font-size: 14px;
    }
  }

  .cmd-content {
    padding: 10px 8px;
    border-bottom: 1px solid #efefef;

    .user {
      width: 100%;
      height: 30px;

      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        vertical-align: middle;
      }

      .username {
        color: #999;
        font-size: 12px;
        padding: 0 5px;
        vertical-align: middle;
      }
    }

    .commend {
      font-size: 14px;
      padding: 8px 0;
    }

    .time {
      padding: 5px 0;
      font-size: 12px;
      color: #999;
      text-align: right;
    }
  }
}

.goods-details {
  padding: 10px;
  margin-top: 10px;
  background-color: #fff;

  .title {
    height: 100%;
    position: relative;
    margin-left: 10px;
    line-height: 22px;
    font-size: 16px;

    &::before {
      content: '';
      display: inline-block;
      width: 5px;
      height: 16px;
      background-color: #e1251b;
      position: absolute;
      top: 3px;
      left: -12px;
    }
  }

  .details-img {
    padding: 10px 0;

    li {
      width: 100%;
      height: 100%;
      margin-bottom: 10px;
    }

    img {
      vertical-align: middle;
      width: 100%;
      height: 100%;
    }
  }
}

footer {
  width: 100%;
  height: 49px;
  border-top: 1px solid #efefef;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;

  ul {
    width: 100%;
    height: 100%;
    display: flex;

    li {
      height: 100%;
    }

    .service,
    .favorite,
    .mycart {
      width: 15%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      border-left: 1px solid #efefef;
      color: #999;

      span {
        padding-top: 8px;
      }
    }

    .cart,
    .buy {
      flex: 1;
      font-size: 16px;
      text-align: center;
      line-height: 49px;
      color: #fff;
    }

    .cart {
      background-color: #ff9500;
    }

    .buy {
      background-color: #e1251b;
    }
  }
}

.border-red {
  border-bottom: 2px solid #e1251b;
}

.van-badge__wrapper {
  font-size: 20px;
}
</style>