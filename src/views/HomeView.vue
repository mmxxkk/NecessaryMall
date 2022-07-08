<template>
  <div>
    <Header></Header>

    <div class="box">
      <div class="banner"></div>
      <div class="platfor">
        <div class="item"></div>
      </div>

      <div class="title">
        <h3>热销排行</h3>
      </div>
      <div class="list">
        <template v-for="item in list" :key="item.Id">
          <ListItem :item="item"></ListItem>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import ListItem from "@/components/ListItem.vue";
import Header from "@/components/Header.vue";
export default {
  name: "HomeView",
  components: { ListItem, Header },
  setup() {
    let list = ref([]);

    let platfor = ref([
      {
        icon: "@/assets/ptzc_character.png",
        text: "大牌品质",
      },
      {
        icon: "@/assets/ptzc_price.png",
        text: "工厂价格",
      },
      {
        icon: "@/assets/ptzc_payment.png",
        text: "分期支付",
      },
      {
        icon: "@/assets/ptzc_sf.png",
        text: "顺丰包邮",
      },
      {
        icon: "@/assets/ptzc_refund.png",
        text: "无忧退款",
      },
    ]);

    let getList = () => {
      axios({
        method: "get",
        url: "/api/hotList?page=1",
      }).then((res) => {
        console.log(res.data);
        list.value = res.data;
      });
    };

    getList();

    return {
      list,
      platfor
    };
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 1080px;
  margin: 0 auto;
}
.title {
  margin-top: 20px;

  height: 80px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  h3 {
    font-size: 18px;
    color: #333;
    padding-bottom: 8px;
    border-bottom: 2px solid #bbb;
  }
}

.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}


.platfor{
  height: 40px;
}
</style>
