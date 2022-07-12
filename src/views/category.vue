<template>
  <div>
    <div class="bread">
      <router-link to="/">首页</router-link>
      <span class="line">></span>

      <template v-if="$route.query.type_two">
        <router-link :to="`/category?type_one=${$route.query.type_one}`">{{
          $route.query.type_one
        }}</router-link>
      </template>
      <template v-else>
        <span>{{ $route.query.type_one }}</span>
      </template>

      <template v-if="$route.query.type_two">
        <span class="line">></span>
        <span>{{ $route.query.type_two }}</span>
      </template>
    </div>

    <div class="cateBread">
      <span>{{ $route.query.type_two || $route.query.type_one }}：</span>

      <ul>
        <li
          v-for="item in TypeList"
          :key="item.title"
          @click="jump(item.title)"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>

    <ul class="list">
      <li v-for="item in TypeList" :key="item.title">
        <div class="title">{{ item.title }}</div>

        <div>
          <template v-for="(it, i) in item.data" :key="i">
            <SearchItem :item="it"></SearchItem>
          </template>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import SearchItem from "@/components/SearchItem.vue";
import axios from "axios";
export default {
  components: { SearchItem },
  setup() {
    let route = useRoute();
    let router = useRouter();

    let TypeList = ref([]);

    function getList(type_one) {
      axios({
        method: "get",
        url: "/api/getTypeTwo",
        params: {
          type_one,
        },
      }).then((res) => {
        // console.log(res.data);
        res.data.forEach(async (item) => {
          await getTypeTwoList(type_one, item);
        });
        // console.log(TypeList.value);
      });
    }

    function getTypeTwoList(type_one, type_two) {
      axios({
        method: "get",
        url: "api/getTypeTwoList",
        params: {
          type_one,
          type_two,
        },
      }).then((res) => {
        // console.log(type_one, type_two, res);
        TypeList.value.push({
          title: type_two,
          data: res.data,
        });
      });
    }

    function jump(type_two) {
      router.push({
        name: "category",
        query: {
          type_one: route.query.type_one,
          type_two,
        },
      });
    }

    onBeforeRouteUpdate((to, from) => {
      TypeList.value = [];
      if (to.query.type_two) {
        getTypeTwoList(to.query.type_one, to.query.type_two);
      } else {
        getList(to.query.type_one);
      }
    });

    // 初次/刷新
    if (route.query.type_two) {
      getTypeTwoList(route.query.type_one, route.query.type_two);
    } else {
      getList(route.query.type_one);
    }

    return {
      // 导航
      TypeList,
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

.cateBread {
  line-height: 50px;
  margin: 20px 0 30px;
  padding-left: 20px;
  background: #fff;

  font-size: 16px;
  color: #808080;

  display: flex;
  // flex-wrap: wrap;
  span {
    min-width: 80px;
  }

  ul {
    margin-left: 20px;
    // flex-grow: 1;
    display: flex;
    flex-wrap: wrap;

    li {
      margin-right: 30px;
      cursor: pointer;
    }
    li:hover {
      color: #000;
    }
  }
}

.list {
  .title {
    color: #333;
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>