<template>
  <div class="login">
    <div class="title">必要</div>

    <div class="main">
      <div class="tit">
        <a :class="{ active: flag }" @click="change(1)">登录</a>
        <b>·</b>
        <a :class="{ active: !flag }" @click="change(0)">注册</a>
      </div>

      <div class="form" v-show="flag">
        <input
          class="username"
          v-model="userName"
          type="text"
          placeholder="你的昵称"
        />
        <input
          class="password"
          v-model="password"
          type="text"
          placeholder="密码"
        />
        <div class="btn" @click="login">登录</div>
      </div>

      <div class="form" v-show="!flag">
        <input
          class="username"
          v-model="userName"
          type="text"
          placeholder="你的昵称"
        />
        <input
          class="password"
          v-model="password"
          type="text"
          placeholder="设置密码"
        />
        <div class="btn" @click="register">注册</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
export default {
  setup() {
    let flag = ref(true);

    let userName = ref("");
    let password = ref("");

    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    // console.log(store);

    let change = (val) => {
      flag.value = val;
    };

    let login = () => {
      axios({
        method: "get",
        url: "/api/login",
        params: {
          userName: userName.value,
          password: password.value,
        },
      }).then((res) => {
        console.log(res.data);
        if (res.data.code) {
          store.commit("setToken", res.data.token);

          store.commit("setUser", {
            userId: res.data.userId,
            userName: res.data.userName,
          });

          if (route.query.path) {
            router.replace({
              path: route.query.path,
            });
          } else {
            router.replace({
              path: "/",
            });
          }
        } else {
          alert("用户或密码错误");
        }
      });
    };
    let register = () => {
      axios({
        method: "get",
        url: "/api/register",
        params: {
          userName: userName.value,
          password: password.value,
        },
      }).then((res) => {
        if (res.data.code) {
          change(1);
        } else {
          alert("当前用户已注册");
        }
      });
    };

    return {
      flag,
      change,
      userName,
      password,
      login,
      register,
    };
  },
};
</script>

<style lang="less">
#app {
  height: 100vh;
}
.login {
  height: 100%;
  width: 100%;
  background-color: #f1f1f1;
  position: absolute;

  .title {
    position: absolute;
    top: 56px;
    font-size: 40px;
    color: #ea6f5a;
    margin-left: 50px;
  }
  .main {
    width: 400px;
    // height: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    padding: 50px 50px 30px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 8px rgb(0 0 0 / 10%);

    .tit {
      color: #969696;
      text-align: center;
      margin-bottom: 50px;
      a {
        padding: 10px;
        cursor: pointer;
      }

      a:hover {
        border-bottom: 2px solid #ea6f5a;
      }

      .active {
        font-weight: 700;
        color: #ea6f5a;
        border-bottom: 2px solid #ea6f5a;
      }

      b {
        padding: 10px;
        font-family: 700px;
      }
    }

    .form {
      color: #969696;
      input {
        width: 100%;
        height: 50px;
        padding: 4px 12px 4px 35px;
        border: 1px solid #c8c8c8;
        background-color: hsla(0, 0%, 71%, 0.1);
        outline: none;
      }
      .username {
        border-radius: 4px 4px 0 0;
      }
      .password {
        border-radius: 0 0 4px 4px;
      }
      .btn {
        margin-top: 20px;
        width: 100%;
        padding: 9px 18px;
        font-size: 18px;
        text-align: center;

        border-radius: 25px;
        color: #fff;
        background: #3194d0;

        cursor: pointer;
        border: none;
        outline: none;
      }
    }
  }
}
</style>