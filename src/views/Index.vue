<template>
  <div>
    <div class="banner">
      <div class="banner-slider">
        <img src="@/assets/banner2.png" alt="" />
      </div>

      <ul class="nav-list">
        <li v-for="(item, index) in typeone" :key="index">
          <template v-for="(it, i) in item" :key="i">
            <a @click.prevent="jump(it)" v-if="it !== '/'">{{ it }}</a>
            <span v-else>{{ it }}</span>
          </template>
        </li>
      </ul>
    </div>

    <div class="platfor">
      <dl v-for="item in platfor" :key="item.icon">
        <dt
          :style="{
            backgroundImage: `url(${item.icon})`,
          }"
        ></dt>
        <dd>{{ item.text }}</dd>
      </dl>
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
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import ListItem from "@/components/ListItem.vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
export default {
  name: "HomeView",
  components: { ListItem },
  setup() {
    let list = ref([]);
    let typeone = ref([]);

    let router = useRouter();

    let platfor = ref([
      {
        icon: require("@/assets/ptzc_character.png"),
        text: "大牌品质",
      },
      {
        icon: require("@/assets/ptzc_price.png"),
        text: "工厂价格",
      },
      {
        icon: require("@/assets/ptzc_payment.png"),
        text: "分期支付",
      },
      {
        icon: require("@/assets/ptzc_sf.png"),
        text: "顺丰包邮",
      },
      {
        icon: require("@/assets/ptzc_refund.png"),
        text: "无忧退款",
      },
    ]);

    function getList() {
      axios({
        method: "get",
        url: "/api/hotList?page=1",
      }).then((res) => {
        // console.log(res.data);
        list.value = res.data;
      });
    }

    function getTypeOne() {
      axios({
        method: "get",
        url: "/api/getTypeOne",
      }).then((res) => {
        // console.log(res.data);

        let newArr = [];
        let oldArr = res.data;
        let num = Math.floor(oldArr.length / 3);
        for (let i = 0; i < num; i++) {
          let arr = [];
          arr.push(oldArr[0 + i * 3]);
          arr.push("/");
          arr.push(oldArr[1 + i * 3]);
          arr.push("/");
          arr.push(oldArr[2 + i * 3]);
          newArr.push(arr);
        }

        let remainder = oldArr.length % 3;
        if (remainder == 1) {
          let arr = [];
          arr.push(oldArr[oldArr.length - 1]);
          newArr.push(arr);
        }
        if (remainder == 2) {
          let arr = [];
          arr.push(oldArr[oldArr.length - 2]);
          arr.push("/");
          arr.push(oldArr[oldArr.length - 1]);
          newArr.push(arr);
        }

        typeone.value = newArr;
      });
    }

    function jump(val) {
      router.push({
        name: "category",
        query: {
          type_one: val,
        },
      });
    }


    getList();
    // 一级
    getTypeOne();

    return {
      list,
      platfor,
      typeone,
      jump
    };
  },
};
</script>

<style lang="less" scoped>
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

.platfor {
  height: 40px;
  display: flex;
  padding: 0 30px;
  justify-content: space-between;
  background-color: #fff;

  dl {
    display: flex;
    dt {
      width: 32px;
      height: 40px;
      background-size: 24px 24px;
      background-position: center left;
      background-repeat: no-repeat;
    }
    dd {
      line-height: 40px;
      font-size: 14px;
      color: #9687a4;
    }
  }
}

.banner {
  margin-top: 10px;
  height: 360px;
  position: relative;

  .banner-slider {
    font-size: 0;
    img {
      width: 100%;
    }
  }

  .nav-list {
    background-color: #554d5d;
    position: absolute;
    left: 0;
    top: 0;
    height: 360px;
    width: 210px;
    color: #fff;
    padding: 10px 0;
    li:hover {
      background-color: #77717d;
    }
    li {
      height: 34px;
      line-height: 34px;
      padding-left: 30px;
      font-size: 14px;
      a {
        color: #fff;
        font-size: 14px;
        cursor: pointer;
      }
      a:hover {
        color: #f7a461;
      }
      span {
        display: inline-block;
        color: #fff;
        font-size: 14px;
        margin: 0 5px;
      }
    }
  }
}
</style>
