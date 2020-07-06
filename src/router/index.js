import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/Login'
import Post from '@/views/Post'
import Publish from '@/views/Publish'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      name: '主页'
    },
    children: [
      {
        path: 'post',
        name: 'PostPage',
        component: Post,
        meta: {
          name: '文章列表'
        },
      },
      {
        path: 'publish',
        name: 'PublishPage',
        component: Publish,
        meta: {
          name: '发布文章'
        },
      }
    ]
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: Login
  },
]

const router = new VueRouter({
  routes
})

export default router
