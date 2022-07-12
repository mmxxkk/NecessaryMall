<template>
  <div class="item" @click="jump(item.Id)">
    <img class="imageUrl" :src="item.imageUrl" alt="" />

    <div class="dd">
      <div class="priceBox">
        <div class="price">
          <span style="color: #f7a701; font-size: 12px; padding-left: 2px"
            >&yen;
            <span style="font-size: 18px">{{ item.priceStr }}</span>
          </span>
        </div>

        <div class="mack">
          <span
            v-for="(it, i) in JSON.parse(item.labels)"
            :key="i"
            :style="{
              color: it.textColor,
              background: it.color,
              border: `1px solid ` + it.roundColor,
            }"
          >
            {{ it.content }}
          </span>
        </div>
      </div>
      <div class="supplier">{{ item.salePoint }}</div>
      <div class="content">{{ item.title }}</div>
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
          goodId
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
  width: 530px;
  font-size: 0;
  margin-top: 20px;
  background-color: #fff;
  .imageUrl {
    width: 100%;
  }
  .dd {
    height: 103px;
    padding-left: 20px;
    .priceBox {
      display: flex;
      align-items: center;
      margin-top: 10px;

      .price {
        margin-right: 12px;
      }

      .mack {
        span {
          font-size: 12px;
          display: inline-block;
          margin-left: 5px;
          padding: 0 2px;
          border-radius: 2px;
        }
      }
    }
    .supplier {
      margin-top: 10px;
      color: #bf9e6b;
      font-size: 12px;
    }
    .content {
      margin-top: 10px;
      color: #4a4a4a;
      font-size: 16px;
    }
  }
}
</style>