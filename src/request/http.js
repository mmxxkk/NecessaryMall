import axios from "axios";

// import store from '../store/index'

// 环境的切换
if (process.env.NODE_ENV == 'development') {
    // axios.defaults.baseURL = '/api';
} else if (process.env.NODE_ENV == 'debug') {
    // axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = 'xxxxxxxxx';
}

// 请求超时时间
// axios.defaults.timeout = 10000;

// post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // const token = store.state.token;
        // token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        return error;
    }
)

// 响应拦截器
axios.interceptors.response.use(
    response => {
        // if (response.status === 200) {
        //     return Promise.resolve(response);
        // } else {
        //     return Promise.reject(response);
        // }
        return response;
    },
    // 服务器状态码不是200的情况    
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录                
                // 未登录则跳转登录页面，并携带当前页面的路径                
                // 在登录成功后返回当前页面，这一步需要在登录页操作。                
                case 401:
                    // router.replace({
                    //     path: '/login',
                    //     query: { redirect: router.currentRoute.fullPath }
                    // });
                    break;
                // 403 token过期                
                // 登录过期对用户进行提示                
                // 清除本地token和清空vuex中token对象                
                // 跳转登录页面                
                case 403:
                    // 清除token                    
                    // localStorage.removeItem('token');
                    // store.commit('loginSuccess', null);
                    // // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    // setTimeout(() => {
                    //     router.replace({
                    //         path: '/login',
                    //         query: {
                    //             redirect: router.currentRoute.fullPath
                    //         }
                    //     });
                    // }, 1000);
                    break;
                // 404请求不存在                
                case 404:
                    // Toast({
                    //     message: '网络请求不存在',
                    //     duration: 1500,
                    //     forbidClick: true
                    // });
                    break;
                // 其他错误，直接抛出错误提示                
                default:
            }
            return error.response;
        }
    }
);

export default axios;
