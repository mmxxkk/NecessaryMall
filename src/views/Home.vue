<template>
  <div class="home">
    <Header></Header>

    <div class="box">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  components: {
    Header,
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 1080px;
  margin: 0 auto;
}
</style>



