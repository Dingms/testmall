<template>
  <div class="tui-list">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
      <template v-for="item in list" :key="item">
        <div class="grid" @click="toDetail(item.id)">
          <van-image :src="item.imgUrl" />
          <p class="title">{{ item.title }}</p>
          <p class="price">￥{{ item.price }}</p>
        </div>
      </template>
    </van-list>
  </div>
</template>

<script setup>
import { ref} from 'vue';
import {getRecommend} from "@/api/recommend"
import { useRouter } from 'vue-router';
const router=useRouter()
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const images = ref([
  '/img/swiper01.jpeg',
  '/img/swiper02.jpeg',
  '/img/swiper03.jpeg',
  '/img/swiper04.jpeg',
  '/img/swiper05.jpeg',
])
const onLoad =async  () => {
    let ret=await getRecommend()
    loading.value = false;
    if(ret.code==0){
      list.value.push(...ret.data)
    }
    if (list.value.length >= 1) {
      finished.value = true;
    }
};
const toDetail=(id)=>{
  router.push("/detail/"+id)
}
</script>

<style lang="scss" scoped>
.tui-list {
  margin-top: 84px;
  margin-bottom: 50px;
}
.van-list{
  padding: 3.75px;
}

img {
  width: 100%;
  height: 185px;
}
.van-image__img{
  width: 100%;
}
.grid {
  box-sizing: border-box;
  border: 0;
  padding: 3px;
  width: 50%;
  float: left;
  margin-bottom: 15px;
}
.title{
  padding: 8px 0;
    font-size: 15px;
    height: 15px;
    line-height: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.price{
  color: #b0352f;
  font-size: 18px;
}
:deep(.van-list__finished-text){
  clear: both;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>