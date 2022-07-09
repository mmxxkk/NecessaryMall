<template>
  <div>
    <Header></Header>

    <div class="box">
      <div class="banner">
        <div class="banner-slider">
          <img src="@/assets/banner2.png" alt="" />
        </div>

        <ul class="nav-list">
          <li>
            <router-link to="">咖啡</router-link>
            <span>/</span>
            <router-link to="">饮食</router-link>
            <span>/</span>
            <router-link to="">正餐</router-link>
          </li>
          <li>
            <router-link to="">眼睛</router-link>
            <span>/</span>
            <router-link to="">内衣服饰</router-link>
            <span>/</span>
            <router-link to="">运动</router-link>
          </li>
          <li>
            <router-link to="">咖啡</router-link>
            <span>/</span>
            <router-link to="">饮食</router-link>
            <span>/</span>
            <router-link to="">正餐</router-link>
          </li>
          <li>
            <router-link to="">眼睛</router-link>
            <span>/</span>
            <router-link to="">内衣服饰</router-link>
            <span>/</span>
            <router-link to="">运动</router-link>
          </li>
          <li>
            <router-link to="">咖啡</router-link>
            <span>/</span>
            <router-link to="">饮食</router-link>
            <span>/</span>
            <router-link to="">正餐</router-link>
          </li>
          <li>
            <router-link to="">眼睛</router-link>
            <span>/</span>
            <router-link to="">内衣服饰</router-link>
            <span>/</span>
            <router-link to="">运动</router-link>
          </li>
          <li>
            <router-link to="">咖啡</router-link>
            <span>/</span>
            <router-link to="">饮食</router-link>
            <span>/</span>
            <router-link to="">正餐</router-link>
          </li>
          <li>
            <router-link to="">眼睛</router-link>
            <span>/</span>
            <router-link to="">内衣服饰</router-link>
            <span>/</span>
            <router-link to="">运动</router-link>
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

    let getList = () => {
      axios({
        method: "get",
        url: "/api/hotList?page=1",
      }).then((res) => {
        // console.log(res.data);
        list.value = res.data;
      });
    };

    getList();

    return {
      list,
      platfor,
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
    width: 200px;
    color: #fff;
    padding: 10px 0;
    li {
      height: 34px;
      line-height: 34px;
      padding-left: 30px;
      font-size: 14px;
      a {
        color: #fff;
        font-size: 14px;
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
