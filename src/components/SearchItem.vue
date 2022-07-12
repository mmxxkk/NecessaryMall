<template>
  <div class="item" @click="jump(item.Id)">
    <img :src="item.imageUrl" alt="" />
    <div class="info">
      <p class="supplier">{{ item.supplier }}</p>
      <p class="title">{{ item.title }}</p>
      <div class="priceBox">
        <div class="price">
          <span style="color: #f7a701; font-size: 12px; padding-left: 2px">
            &yen;
            <span style="font-size: 18px">{{ item.priceStr }}</span>
          </span>
        </div>

        <div class="mack" v-html="item.mack"></div>
      </div>
      <p class="evaluate">{{ item.evaluate }}条好评</p>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
export default {
  props: ["item"],
  setup(props) {
    let router = useRouter();
    // console.log(props.item);

    function jump(goodId) {
      router.push({
        name: "detail",
        query: {
          goodId,
        },
      });
    }

    return {
      jump,
    };
  },
};
</script>

<style lang="less" scoped>
.item {
  width: 255px;
  height: 383px;
  font-size: 0;
  background-color: #fff;
  margin-bottom: 20px;
  display: inline-block;
  margin-right: 20px;

  img {
    width: 100%;
  }
}

.item:nth-of-type(4n) {
  margin-right: 0;
}

.info {
  padding-left: 20px;
  font-size: 12px;
  .supplier {
    font-size: 12px;
    line-height: 17px;
    color: #bf9e6b;
    margin-top: 10px;
  }
  .title {
    font-size: 14px;
    line-height: 19px;
    color: #4a4a4a;
    margin-top: 5px;
  }
  .priceBox {
    line-height: 25px;
    height: 25px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    .price {
      margin-right: 5px;
    }

    .mack {
      line-height: 20px;
    }
  }
  .evaluate {
    font-size: 12px;
    line-height: 17px;
    color: #bbb;
    margin-top: 10px;
  }
}
</style>