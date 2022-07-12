<template>
  <div>
    <div class="bread">
      <router-link to="/">首页</router-link>
      <span class="line">></span>
      <span>全部分类</span>
      <span class="line">></span>
      <span>{{ $route.query.word }}</span>
    </div>
    <div class="cateBread">根据您搜索的“{{ $route.query.word }}”，为您匹配到以下商品：</div>
    <div class="searchlist">
      <template v-for="item in searchlist" :key="item.Id">
        <SearchItem :item="item"></SearchItem>
      </template>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import SearchItem from "@/components/SearchItem.vue";
import axios from "axios";
export default {
  components: {
    SearchItem,
  },
  setup() {
    let route = useRoute();
    let searchlist = ref([]);

    // let router = useRouter();
    // console.log(router);

    function getList(val) {
      axios({
        method: "get",
        url: "api/search",
        params: {
          word: val,
        },
      }).then((res) => {
        searchlist.value = res.data;
        console.log(res.data);
      });
    }
    onBeforeRouteUpdate((to, from) => {
      // console.log(to.query.word);
      getList(to.query.word);
    });

    getList(route.query.word);

    return {
      searchlist,
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
  height: 50px;
  margin: 20px 0 30px;
  padding-left: 20px;
  line-height: 50px;
  background: #fff;
  font-size: 12px;
  color: #333;
}
</style>
