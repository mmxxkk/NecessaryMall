import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// console.log(process.env);

const { beforeEach } = router;

beforeEach((to, from, next) => {
    if (to.meta.needLogin) {
        if (!store.state.token) {
            next({
                name: 'login',
                query: {
                    path: to.path
                }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})


createApp(App).use(store).use(router).mount('#app')
