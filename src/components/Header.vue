<template>
  <nav>
    <div class="nav-main">
      <div class="nav-top">
        <div class="nav-logo">
          <img src="@/assets/logo.png" alt="" />
        </div>
        <div class="nav-search">
          <div>
            <input
              id="searchInput"
              type="text"
              placeholder="请输入要搜索的商品"
              v-model="word"
              @keydown.enter="serch"
            />
            <span id="searchBtn" @click="serch"></span>
          </div>
          <ul>
            <li v-for="item in hotList" :key="item" @click="onClick(item)">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <ul class="nav-tab">
        <li><router-link to="/">首页</router-link></li>
        <li><router-link to="/dailynew">每日上新</router-link></li>
        <li class="border-l"></li>
        <li class="hover_text">
          <span
            >了解必要
            <div class="hover_code">
              <i></i>
              <img src="@/assets/public_code.png" alt="" />
              <p>关注必要微信公众号</p>
              <p>了解你想了解的一切</p>
              <p>小必姐在此发福利哦</p>
            </div>
          </span>
        </li>
        <li><router-link to="/shopCar">购物车</router-link></li>

        <template v-if="!$store.state.token">
          <li class="border-l"></li>
          <li><router-link to="/login">登录</router-link></li>
        </template>
      </ul>

      <div
        class="flex"
        :style="{
          top: st > 145 ? 0 : -65 + 'px',
        }"
      ></div>
    </div>
  </nav>
</template>

<script>
import { ref, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    let word = ref("");
    let router = useRouter();
    // const store = useStore();
    // console.log(store.state.token);
    let st = ref("");
    let f = () => {
      st.value = document.documentElement.scrollTop;
    };
    window.onscroll = f;

    onBeforeUnmount(() => {
      window.onscroll = null;
    });

    let hotList = ref([
      "行李箱",
      "男士内裤",
      "女士内裤",
      "电动牙刷",
      "伞",
      "精华枕头",
      "洗面奶",
      "袜子男夏季",
    ]);

    function serch() {
      router.push({
        name: "search",
        query: {
          word: word.value,
        },
      });
    }
    function onClick(val) {
      router.push({
        name: "search",
        query: {
          word: val,
        },
      });
    }

    return {
      word,
      serch,
      hotList,
      onClick,
      st,
    };
  },
};
</script>

<style lang="less" scoped>
nav {
  background-color: #fff;
  box-shadow: 0 2px 4px rgb(0 0 0 / 5%);
}

.nav-main {
  width: 1080px;
  margin: 0 auto;

  .nav-top {
    height: 105px;
    display: flex;
    justify-content: space-between;
    .nav-logo {
      display: flex;
      align-items: center;
      img {
        width: 129px;
      }
    }
    .nav-search {
      margin-top: 30px;

      #searchInput {
        width: 422px;
        height: 38px;
        font-size: 14px;
        border-radius: 3px 0 0 3px;
        border: 1px solid #ccc;
        vertical-align: middle;
        padding-left: 10px;
        outline: none;
      }
      #searchBtn {
        display: inline-block;
        height: 38px;
        width: 39px;
        background: url(http://static3.biyao.com/pc/common/img/master/search.png?v=biyao_2e92562)
          center center no-repeat;
        border: 1px solid #ccc;
        vertical-align: middle;
        border-radius: 0 3px 3px 0;
        border-left: none;
        cursor: pointer;
      }

      ul {
        list-style: none;
        display: flex;
        li {
          height: 35px;
          line-height: 35px;
          margin-right: 10px;
          color: #666;
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
  }

  .nav-tab {
    list-style: none;
    display: flex;
    height: 40px;
    align-items: center;

    .border-l {
      border-left: 1px solid #ccc;
    }

    li {
      height: 16px;
      padding-right: 45px;
      display: flex;
      align-items: center;
      a {
        color: #333;
        text-decoration: none;
      }
    }

    .hover_text span {
      position: relative;
      //
      .hover_code {
        position: absolute;
        z-index: 10;
        left: 50%;
        top: 31.5px;
        transform: translateX(-50%);
        width: 220px;
        background-color: #fff;
        box-shadow: 0 0 10px 0 rgb(0 0 0 / 10%);
        padding: 30px 0 20px;
        display: none;
        img {
          display: block;
          width: 133px;
          margin: 0 auto 15px;
        }
        p {
          color: #333;
          text-align: center;
        }
      }

      i {
        display: block;
        border: 10px solid transparent;
        border-bottom-color: #fff;
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    li:hover {
      a {
        color: #6c36ab;
      }
      span {
        color: #6c36ab;
      }
    }

    .hover_text:hover {
      .hover_code {
        display: block;
      }
    }
  }

  .flex {
    position: fixed;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: red;
    top: -65px;
    z-index: 100;
  }
}
</style>