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
            />
            <span id="searchBtn"></span>
          </div>
          <ul>
            <li>行李箱</li>
            <li>男士内裤</li>
            <li>女士内裤</li>
            <li>电动牙刷</li>
            <li>伞</li>
            <li>精华枕头</li>
            <li>洗面奶</li>
            <li>袜子男夏季</li>
          </ul>
        </div>
      </div>

      <ul class="nav-tab">
        <li><router-link to="">首页</router-link></li>
        <li><router-link to="">每日上新</router-link></li>
        <li class="border-l"></li>
        <li><router-link to="">了解必要</router-link></li>
        <li><router-link to="">购物车</router-link></li>
        <li class="border-l"></li>
        <li><router-link to="">登录</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
nav {
  background-color: #fff;
}
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
  }
}
</style>