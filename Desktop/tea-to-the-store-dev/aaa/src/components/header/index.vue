<template>
     <div class="header-container">
    <ul class="header">
      <li class="search">
        <van-icon name="search" color="#aaa" />
        <span>搜索您喜欢的...</span>
      </li>
      <li class="service">
        <van-icon name="service" color="#fff" />
      </li>
    </ul>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.van-badge__wrapper{
    font-size: 24px;
}
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
}
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
    width: 284px;
    height: 30px;
    margin-left: 10px;
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
  .service {
    margin-right: 10px;
  }
}
</style>