<template>
  <div class="box">
    <div class="header">
      <div class="hcol1">
        <input
          type="checkbox"
          id="selectAllShop"
          v-model="allflag"
          @change="selectall"
        />
        <label for="selectAllShop">全选</label>
      </div>
      <div class="hcol2">商品信息</div>
      <div class="hcol3">单价</div>
      <div class="hcol3">数量</div>
      <div class="hcol3">金额</div>
      <div class="hcol3">操作</div>
    </div>

    <div class="product-list">
      <div class="product" v-for="(good, index) in shopcarlist" :key="index">
        <div class="hcol1">
          <!-- <input
            type="checkbox"
            :checked="p.selected"
            @change="check($event, p, s)"
          /> -->
          <input type="checkbox" :value="good" v-model="selectgood" />
        </div>

        <div class="hcol2">
          <div class="info">
            <img :src="JSON.parse(good.imgs)[0]" alt="" />
            <a href="">{{ good.title }}</a>
          </div>
          <div class="spec"></div>
        </div>

        <div class="hcol3">
          <div class="price">{{ good.priceStr }}</div>
        </div>

        <div class="hcol3">
          <button class="btn" @click="sub(good)">-</button>
          <span class="btn">
            {{ good.count }}
          </span>
          <button class="btn" @click="add(good)">+</button>
        </div>

        <div class="hcol3 col5">{{ count(good) }}</div>

        <div class="hcol3" @click="del(good)">删除</div>
      </div>
    </div>

    <div class="foot">
      已选商品<span>{{ totalCount }}</span>
      件合计金额:
      <span>{{ totalPrice }}</span>
      <button>结算</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import axios from "axios";
import { useStore } from "vuex";
export default {
  setup() {
    let store = useStore();

    // 商品
    let shopcarlist = ref([]);

    // 选中的商品
    let selectgood = ref([]);

    // 全选
    let allflag = ref(false);

    let getlist = () => [
      axios({
        method: "get",
        url: "/api/shopList",
        params: {
          token: store.state.token,
        },
      }).then((res) => {
        shopcarlist.value = res.data;

        console.log(res.data);
      }),
    ];

    let selectall = () => {
      if (allflag.value) {
        selectgood.value = [...shopcarlist.value];
      } else {
        selectgood.value = [];
      }
    };

    let count = (good) => {
      return good.count * good.priceStr;
    };

    watch(selectgood, (newval, oldval) => {
      allflag.value = newval.length == shopcarlist.value.length;
      console.log("@@@@", selectgood.value);
    });

    // 计算属性
    let totalCount = computed(() => {
      var res = 0;
      selectgood.value.forEach((item) => {
        res += item.count;
      });
      return res;
    });

    let totalPrice = computed(() => {
      var res = 0;
      selectgood.value.forEach((item) => {
        res += item.count * item.priceStr;
      });
      return res;
    });

    let sub = (good) => {
      if (good.count === 0) return;
      axios({
        method: "get",
        url: "/api/remove",
        params: {
          token: store.state.token,
          goodId: good.Id,
        },
      }).then((res) => {
        console.log(res.data);
        if (res.data.code) {
          getlist();
        }
      });
    };

    let add = (good) => {
      //   i.count++;
      axios({
        method: "get",
        url: "/api/add",
        params: {
          token: store.state.token,
          goodId: good.Id,
        },
      }).then((res) => {
        console.log(res.data);
        if (res.data.code) {
          getlist();
        }
      });
    };

    let del = (good) => {
      //   console.log(good.Id);
      axios({
        method: "get",
        url: "/api/del",
        params: {
          token: store.state.token,
          goodId: good.Id,
        },
      }).then((res) => {
        console.log(res.data);
        if (res.data.code) {
          getlist();
        }
      });
    };

    getlist();

    return {
      shopcarlist,
      selectgood,
      allflag,
      count,
      selectall,
      totalCount,
      totalPrice,
      sub,
      add,
      del,
    };
  },
};
</script>


<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  height: 60px;
}
.hcol1 {
  width: 60px;
}
.hcol2 {
  flex-grow: 1;
}
.hcol3 {
  width: 120px;
  text-align: center;
}

.product-list {
  border: 1px solid #ccc;
  .product {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    .info {
      display: flex;
      align-items: center;
      img {
        height: 80px;
        margin: 10px;
      }
      a {
        height: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: #3c3c3c;
        text-decoration: none;
      }
    }
    .btn {
      padding: 5px 10px;
      font-size: 20px;
    }
    .price {
      font-weight: bold;
    }
    .col5 {
      width: 120px;
      color: #ff5300;
      font-weight: bold;
    }
  }
}

.foot {
  height: 50px;
  font-size: 14px;
  line-height: 50px;
  float: right;
  display: flex;
  span {
    color: #ff5300;
    margin: 0 10px;
  }
  button {
    display: block;
    height: 50px;
    width: 80px;
    background-color: #ff5300;
    border: none;
    color: white;
    font-weight: 400;
    font-size: 20px;
  }
}
</style>

