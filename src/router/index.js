import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

import Index from '../views/Index.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/',
        name: 'index',
        component: Index
      },
      {
        path: 'dailynew',
        name: 'dailynew',
        component: () => import(/* webpackChunkName: "dailynew" */ '../views/DailyNew.vue')
      },
      {
        path: 'search',
        name: 'search',
        component: () => import(/* webpackChunkName: "search" */ '../views/search.vue')
      },
      {
        path: 'category',
        name: 'category',
        component: () => import(/* webpackChunkName: "category" */ '../views/category.vue')
      },
      {
        path: 'detail',
        name: 'detail',
        component: () => import(/* webpackChunkName: "category" */ '../views/detail.vue')
      },
      {
        path: 'shopCar',
        name: 'shopCar',
        meta: {
          needLogin: true,
        },
        component: () => import(/* webpackChunkName: "detail" */ '../views/shopCar.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "category" */ '../views/login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})



export default router
