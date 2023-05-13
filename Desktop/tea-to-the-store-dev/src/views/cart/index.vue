<template>
  <div class="cart-container container">
    <header>
      <ul class="header">
        <li class="back-icon">
          <van-icon name="arrow-left" color="#fff" @click="goBack" />
        </li>
        <li class="login">
          <slot>
            <span>购物车</span>
          </slot>
        </li>
        <li class="edit" @click="editStatus = !editStatus">
          <span>{{ editStatus ? "完成" : "编辑" }}</span>
        </li>
      </ul>
    </header>
    <section v-if="!loginStatus" ref="wrapper">
      <div>
        <van-empty description="您尚未登录，请先登录" image-size="200px">
          <van-button round type="primary" class="login-btn" @click="goLogin"
            >登录</van-button
          >
        </van-empty>
      </div>
    </section>
    <section v-else-if="itemList.length" ref="wrapper">
      <div>
        <div class="cart-title">
          <van-checkbox
            checked-color="#e1251b"
            icon-size="20px"
            v-model="checkedAll"
            @click="checkedChange"
          ></van-checkbox>
          <span>商品</span>
        </div>
        <ul>
          <li v-for="item in itemList" :key="item.id">
            <div class="checkbox">
              <van-checkbox
                v-model="item.checked"
                checked-color="#e1251b"
                icon-size="20px"
                @click="checkedHandler"
              ></van-checkbox>
            </div>
            <div>
              <img :src="item.imgUrl" alt="" />
            </div>
            <div class="goods">
              <div class="goods_title">
                <span>
                  {{ item.title }}
                </span>
                <van-icon
                  name="delete-o"
                  size="20px"
                  @click="delCartItem(item.id)"
                />
              </div>
              <div class="goods-price">
                <p>￥{{ item.price }}</p>
              </div>
              <van-stepper
                v-model="item.num"
                integer
                input-width="30px"
                button-size="24px"
                @change="changeNumHandler(item.id, item.num)"
              />
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section v-else ref="wrapper">
      <div>
        <van-empty description="暂无商品" image-size="200px" />
      </div>
      <!-- <div>
        首页
      </div> -->
    </section>
    <footer v-if="itemList.length && loginStatus">
      <ul class="cart-footer">
        <li class="radio">
          <van-checkbox
            v-model="checkedAll"
            checked-color="#e1251b"
            icon-size="20px"
            @click="checkedChange"
          ></van-checkbox>
        </li>
        <li class="total">
          <div v-show="!editStatus">
            共有
            <span class="count">{{ total.num }}</span>
            件商品
          </div>
          <div v-show="!editStatus">
            总计:
            <span class="price">￥{{ total.price.toFixed(2) }} + 0茶币</span>
          </div>
        </li>
        <li class="order order_bgc_r'" v-if="editStatus">删除</li>
        <li class="order order_bgc_r" v-else>去结算</li>
      </ul>
    </footer>
  </div>
</template>

<script setup>
import { ref, onActivated } from "vue";
import { useRouter } from "vue-router";
import useUserStore from "@/store/common";
import { selectCart, removeCartItem, changeNum } from "@/api/cart";
import { showConfirmDialog, showSuccessToast, showFailToast } from "vant";

const userStore = useUserStore();
const router = useRouter();
const itemList = ref([]);
const selectList = ref([]);
const loginStatus = ref(false);
const editStatus = ref(false);
const total = ref({ num: 0, price: 0 });
const checkedAll = ref(false);
const delCartItem = (id) => {
  showConfirmDialog({
    title: "删除确认",
    message: "确定删除该商品吗？",
  })
    .then(async () => {
      let ret = await removeCartItem({ token: userStore.user, id });
      if (ret.code == 0) {
        showSuccessToast("删除成功");
        selectC();
      } else {
        showFailToast("删除失败");
      }
    })
    .catch(() => {});
  console.log(id);
};
const goBack = () => {
  router.back();
};
const goLogin = () => {
  router.push("/login");
};
const cartChange = () => {
  let num = 0;
  let price = 0;
  itemList.value.forEach((item) => {
    if (item.checked) {
      num += item.num;
      price += num * item.price;
    }
  });
  total.value.num = num;
  total.value.price = price;
};
const checkedChange = () => {
  itemList.value = itemList.value.map((item) => ({
    ...item,
    checked: checkedAll.value,
  }));
  cartChange();
};
const changeNumHandler = async (id, num) => {
  cartChange();
  let ret = await changeNum({ token: userStore.user, id, num });
};
const checkedHandler = () => {
  checkedAll.value = itemList.value.every((item) => item.checked);
  cartChange();
};
const selectC = async () => {
  if (userStore.user) {
    loginStatus.value = true;
    let ret = await selectCart(userStore.user);
    itemList.value = ret.data.cart;
    let num = 0;
    let price = 0;
    itemList.value.forEach((item) => {
      num += item.num;
      price += num * item.price;
    });
    total.value.num = num;
    total.value.price = price;
    checkedAll.value = ret.data.cart.every((item) => item.checked);
  } else {
    loginStatus.value = false;
  }
};
onActivated(() => {
  selectC();
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 44px;
  background-color: #e1251b;

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

  .edit {
    font-size: 18px;
    margin-right: 10px;
    line-height: 44px;
    color: #fff;
  }
}

.cart-title {
  display: flex;
  padding: 10px;

  span {
    padding-left: 10px;
    font-size: 18px;
    font-weight: 700;
  }
}

section {
  ul {
    li {
      background-color: #fff;
      height: 100px;
      border-bottom: 1px solid #efefef;
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      .checkbox {
        padding: 0 10px;
      }

      img {
        width: 74px;
        height: 74px;
        vertical-align: middle;
      }

      .goods {
        flex: 1;
        height: 74px;
        font-size: 14px;
        padding: 0 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .goods_title {
          height: 30px;
          display: flex;
          justify-content: space-between;

          span {
            vertical-align: top;
            white-space: nowrap;
            width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .goods-price {
          font-size: 16px;
          color: #e1251b;
        }

        .van-stepper {
          text-align: right;
        }
      }
    }
  }
}

footer {
  position: fixed;
  bottom: 10px;

  .cart-footer {
    background-color: #fff;
    height: 45px;
    border-top: 1px solid #efefef;
    display: flex;
    align-items: center;

    .radio {
      padding: 0 15px;
    }

    .total {
      div {
        padding: 2px 0;
      }

      font-size: 14px;
      flex: 1;

      .count {
        color: #e1251b;
      }

      .price {
        font-size: 16px;
        color: #e1251b;
      }
    }

    .order {
      width: 120px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      font-size: 18px;
      color: #fff;
      background-color: #e1251b;
    }

    .order_bgc_r {
      background-color: #e1251b;
    }

    .order_bgc_g {
      background-color: gray;
    }
  }
}

.login-btn {
  width: 200px;
  height: 40px;
  background-color: #e1251b;
  border: none;
}

.van-empty {
  &:deep(p) {
    font-size: 16px !important;
  }
}

.van-badge__wrapper {
  font-size: 24px;
}
</style>
