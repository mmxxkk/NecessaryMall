<template>
  <div>
    <!-- tag切换 -->
    <div class="bread">
      <router-link to="/">首页</router-link>
      <span class="line">></span>
      <span>{{ good.title }}</span>
    </div>

    <!-- 商品 -->
    <div class="section-editor">
      <div class="left">
        <img class="bigimg" :src="imgs[imgNum]" alt="" />
        <div class="imgs">
          <img
            class="smallimg"
            :style="{ border: index == imgNum ? '1px solid #523669' : '' }"
            v-for="(item, index) in imgs"
            :key="index"
            :src="item"
            @click="changeImg(index)"
            alt=""
          />
        </div>
      </div>

      <div class="editor-panel">
        <p class="title">{{ good.title }}</p>
        <p class="salePoint">{{ good.salePoint }}</p>

        <div class="supplier">
          <span>{{ good.supplier }}</span>
        </div>

        <div class="priceStr">
          <span class="text">售价</span>

          <span class="yen"
            >&yen;
            <span>{{ good.priceStr }}</span>
          </span>
          <span class="leadTime"> 生产周期：{{ good.leadTime }}天 </span>
        </div>

        <div style="display: flex; margin-top: 20px">
          <span class="text">规格</span>
          <ul class="sizeList">
            <li
              v-for="(item, i) in sizeList"
              :key="i"
              @click="changedSizeList(i)"
            >
              {{ item }} <em v-show="i==sizeListNum"></em>
            </li>
          </ul>
        </div>

        <!-- <div class="buy">微信扫码购买</div> -->

        <div class="buy" @click="add()">添加购物车</div>
      </div>
    </div>

    <!--  -->
    <ul class="editor-policy">
      <li>
        <span>7天无忧退货</span>
        <div>
          <i></i>
          根据国家七天无理由退货规范，为您办理退货退款，具体退货政策见商品详情页。
        </div>
      </li>
      <li>
        <span>先行赔付</span>
        <div><i></i>争议可申诉，申诉成功，立即退款。</div>
      </li>
      <li>
        <span>超时赔偿</span>
        <div>
          <i></i>
          未按承诺时间发货，系统自动赔付（赔款金额为订单商品金额的30%，上限500元）。
        </div>
      </li>
      <li>
        <span>顺丰包邮</span>
        <div><i></i>运费由商家承担</div>
      </li>
    </ul>

    <div class="view-title">
      <div class="addressName">{{ good.addressName }}</div>
      <div class="detail" :class="{ 'view-active': flag }" @click="changed(1)">
        商品信息
      </div>
      <div class="detail" :class="{ 'view-active': !flag }" @click="changed(0)">
        评价详情
      </div>
    </div>

    <div class="view">
      <div class="view-supplier">
        <!--  -->
        <div class="store">
          <img :src="good.addressLogo" alt="" />
          <ul>
            <li>商品质量：<span>5.0</span></li>
            <li>服务态度：<span>5.0</span></li>
          </ul>
        </div>
        <!-- 进店看看 -->
        <div class="supplier-into">进店看看</div>

        <ul class="list">
          <li v-for="item in sameList" :key="item.Id" @click="jump(item.Id)">
            <img :src="item.imageUrl" alt="" />
            <p class="title">{{ item.title }}</p>
            <p class="salePoint">{{ item.salePoint }}</p>
            <div class="priceBox">{{ item.priceStr }}</div>
            <p class="evaluate">{{ item.evaluate }}条评论</p>
          </li>
        </ul>
      </div>

      <div class="view-main" v-show="flag">
        <ul>
          <li v-for="(item, i) in descriptionImage" :key="i">
            <img :src="item" alt="" />
          </li>
        </ul>
      </div>

      <div class="view-main" v-show="!flag">评论</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
export default {
  setup() {
    let route = useRoute();
    let router = useRouter();

    let good = ref({});
    let imgs = ref([]);

    let sizeList = ref([]);

    let sameList = ref([]);
    let descriptionImage = ref([]);

    let flag = ref(true);
    // 商品详情/评论 切换
    function changed(val) {
      flag.value = val;
    }

    function getDetail(goodId) {
      axios({
        method: "get",
        url: "/api/detail",
        params: {
          goodId,
        },
      }).then((res) => {
        console.log(res.data[0]);

        good.value = res.data[0];
        // 图片
        imgs.value = JSON.parse(res.data[0].imgs).filter((item, i) => {
          return i < 5;
        });
        //规格
        sizeList.value = JSON.parse(res.data[0].sizeList);
        //
        descriptionImage.value = JSON.parse(res.data[0].descriptionImage);
        // console.log(JSON.parse(res.data[0].descriptionImage));

        getSameList(res.data[0].supplier);
      });
    }

    function getSameList(supplier) {
      axios({
        method: "get",
        url: "/api/sameList",
        params: {
          supplier,
        },
      }).then((res) => {
        console.log(res.data);
        sameList.value = res.data;
      });
    }

    let sizeListNum = ref(0);
    let changedSizeList = (i) => {
      sizeListNum.value = i;
    };

    let imgNum = ref(0);
    function changeImg(index) {
      imgNum.value = index;
    }

    getDetail(route.query.goodId);


    let store = useStore();
    let add = () => {
      axios({
        method: "get",
        url: "/api/add",
        params: {
          token: store.state.token,
          goodId: route.query.goodId,
        },
      }).then((res) => {
        if (res.data.code) {
          alert("添加好购物车成功");
        }
        console.log(res.data);
      });
    };

    function jump(goodId) {
      router.push({
        name: "detail",
        query: {
          goodId,
        },
      });
    }
    onBeforeRouteUpdate((to, from) => {
      getDetail(to.query.goodId);
    });

    return {
      good,
      imgs,

      sizeList,
      sizeListNum,
      changedSizeList,

      sameList,
      descriptionImage,
      changed,
      flag,

      changeImg,
      imgNum,

      add,
      jump,
    };
  },
};
</script>

<style lang="less" scoped>
.bread {
  margin: 20px 0;
  color: #333;
  font-size: 12px;
  color: #808080;
  .line {
    margin: 0 8px 0 5px;
  }
}

.section-editor {
  display: flex;
  justify-content: space-between;

  .left {
    display: flex;

    .bigimg {
      width: 460px;
      height: 460px;
      margin-right: 18px;
    }

    .imgs {
      width: 80px;
      font-size: 0;

      .smallimg {
        margin-bottom: 15px;
        width: 100%;
      }
      .smallimg:nth-of-type(5) {
        margin-bottom: 0;
      }
    }
  }

  .editor-panel {
    width: 465px;
    .title {
      font-size: 20px;
      font-weight: 400;
      color: #333;
      margin-bottom: 14px;
    }
    .salePoint {
      font-size: 14px;
      color: #999;
      margin-bottom: 14px;
    }
    .supplier {
      border-bottom: 1px solid #ccc;
      span {
        font-size: 12px;
        display: inline-block;
        height: 24px;
        line-height: 24px;
        padding: 0 10px;
        margin-bottom: 10px;
        border-radius: 2px;
        background-color: #f7f1e8;
        color: #bf9e6b;
        cursor: pointer;
      }
    }
    .priceStr {
      display: flex;
      align-items: center;

      margin-top: 20px;
      font-size: 14px;
      color: #666;

      .yen {
        display: flex;
        align-items: center;

        color: #f85453;
        span {
          font-size: 28px;
          margin-left: 5px;
        }
      }
      .leadTime {
        margin-left: 20px;
      }
    }

    // 规格
    .sizeList {
      display: flex;
      li {
        font-size: 14px;
        color: #666;
        height: 35px;
        line-height: 35px;
        padding: 0 23px;
        margin: 0 6px 15px 0;
        border: 1px solid #523669;

        position: relative;
        user-select: none;

        em {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 22px;
          height: 22px;
          background: url(http://static1.biyao.com/pc/common/img/master/specs-active.png?v=biyao_99d793b)
            no-repeat;
        }
      }
    }

    // 标题
    .text {
      font-size: 14px;
      color: #666;
      display: inline-block;
      width: 65px;
      height: 35px;
      line-height: 35px;
    }

    // 购买
    .buy {
      margin-left: 65px;
      width: 180px;
      height: 40px;
      line-height: 40px;
      color: #fff;
      font-size: 18px;
      text-align: center;
      background: #523669;
      cursor: pointer;
    }
  }
}

.editor-policy {
  margin-top: 20px;
  display: flex;

  li {
    margin-right: 10px;
    font-size: 12px;
    color: #333;
    position: relative;

    span {
      padding-left: 20px;
      background: url(http://static3.biyao.com/pc/common/img/master/policy-icon.png?v=biyao_238b758)
        left center no-repeat;
    }
    div {
      width: 260px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 26px;

      padding: 10px 15px;
      border-radius: 3px;
      box-shadow: 0 1px 10px 4px rgb(0 0 0 / 5%);
      background: #fff;

      line-height: 27px;

      display: none;

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
  }
  li:hover {
    div {
      display: block;
    }
  }
}

//
.view-title {
  margin-top: 40px;
  height: 60px;
  background: #eeecef;
  border: 1px solid #ccc;

  display: flex;
  // align-items: center;
  line-height: 60px;
  text-align: center;

  .addressName {
    width: 240px;
    border-right: 1px solid #ccc;
  }

  .detail {
    width: 180px;
    border-right: 1px solid #ccc;
  }
}

.view {
  display: flex;
  .view-supplier {
    width: 240px;
    border: 1px solid #ccc;
    border-top: none;
    padding: 20px;

    .store {
      display: flex;
      justify-content: space-between;
      img {
        width: 76px;
        border: 1px solid #ccc;
      }
      ul {
        padding-top: 18px;
        margin-right: 30px;
        li {
          font-size: 12px;
          color: #333;
          margin-bottom: 10px;
          span {
            color: #f7b200;
          }
        }
      }
    }

    // 进店看看
    .supplier-into {
      height: 40px;
      line-height: 40px;
      margin-top: 20px;
      color: #fff;
      font-size: 16px;
      text-align: center;
      background: #f7b200;
      cursor: pointer;
    }

    .list {
      li {
        margin-top: 40px;
        padding-bottom: 20px;
        border-bottom: 1px solid #ccc;
        img {
          width: 100%;
        }
        .salePoint {
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
          font-size: 18px;
          font-weight: 400;
          color: #f7a701;
          line-height: 25px;
          height: 25px;
          margin-top: 10px;
        }
        .evaluate {
          font-size: 12px;
          line-height: 17px;
          color: #bbb;
          margin-top: 10px;
        }
      }
    }
  }

  .view-main {
    flex: 1;
    padding: 40px 0 0 38px;
    ul {
      li {
        img {
          width: 100%;
        }
      }
    }
  }
}
.view-active {
  background: #fff;
  color: #523669;
  border-bottom: 2px solid #523669;
}
</style>