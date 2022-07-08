<template>
  <div class="item">
    <img class="imageUrl" :src="item.imageUrl" alt="" />

    <div class="dd">
      <div class="priceBox">
        <span class="yen">&yen;</span>
        <span class="price">{{ item.priceStr }}</span>
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
      <div class="supplier">{{ item.salePoint }}</div>
      <div class="content">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  setup(props) {
    // console.log(JSON.parse(props.item.labels));
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
      font-size: 12px;
      span {
        display: inline-block;
        margin-left: 5px;
        padding: 0 2px;
        border-radius: 2px;
      }
      .price {
        font-size: 16px;
        color: #f7a701;
        margin: 0;
      }
      .yen {
        // font-size: 10px;
        color: #f7a701;
        margin: 0;
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