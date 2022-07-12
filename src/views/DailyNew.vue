<template>
  <div class="newProduct">
    <h3>每日新品</h3>
    <p>2022-07-09</p>

    <div class="list">
      <template v-for="item in list" :key="item.Id">
        <DailyNewItem :item="item"> </DailyNewItem>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import DailyNewItem from "@/components/DailyNewItem.vue";
export default {
  components: {
    DailyNewItem,
  },
  setup() {
    let list = ref([]);

    function getList() {
      axios({
        method: "get",
        url: "/api/newList?page=1",
      }).then((res) => {
        console.log(res.data);
        list.value = res.data;
      });
    }

    getList();

    return {
      list,
    };
  },
};
</script>

<style lang="less" scoped>
.newProduct {
  width: 1080px;
  margin: 20px auto 0;
}

h3 {
  font-size: 24px;
  margin: 10px 0 20px;
  color: #333;
  text-align: center;
}

p {
  font-size: 24px;
  color: #808080;
  text-align: center;
}

.list {
  margin-top: 30px;
}
</style>