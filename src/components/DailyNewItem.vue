<template>
  <div class="item" @click="jump(item.Id)">
    <div class="words">
      <div class="mark">
        <span
          v-for="(it, i) in JSON.parse(item.labels)"
          :key="i"
          :style="{
            color: it.textColor,
            background: it.color,
            border: `1px solid ` + it.roundColor,
          }"
          >{{ it.content }}</span
        >
      </div>

      <div class="manufacturers">xxx制造商</div>
      <div class="title">{{ item.title }}</div>

      <div class="price">
        &yen;
        <span class="priceStr">{{ item.priceStr }}</span>
      </div>

      <div class="salePoint">{{ item.salePoint }}</div>
    </div>

    <img :src="item.imageUrl" alt="" />
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
  height: 335px;
  display: flex;
  margin-bottom: 20px;
  background-color: #fff;
  .words {
    flex-grow: 1;
    position: relative;

    .mark {
      position: absolute;
      top: 10px;
      left: 8px;
      span {
        display: inline-block;
        font-size: 12px;
        padding: 0 2px;
        margin-left: 5px;
      }
    }

    .manufacturers {
      font-size: 14px;
      text-align: center;
      color: #bf9e6b;
      margin-top: 64px;
      line-height: 20px;
    }

    .title {
      margin-top: 22px;
      text-align: center;
      font-size: 18px;
      color: #4a4a4a;
      line-height: 25px;
    }
    .price {
      text-align: center;
      width: 260px;
      height: 50px;
      margin: 15px auto 0;
      padding-bottom: 15px;
      color: #f7a701;
      font-size: 18px;
      border-bottom: 2px solid #f2f2f2;

      .priceStr {
        font-size: 24px;
      }
    }
    .salePoint {
      width: 288px;
      font-size: 16px;
      margin: 30px auto 0;
      color: #808080;
      text-align: center;
    }
  }
  img {
    height: 100%;
  }
}
</style>