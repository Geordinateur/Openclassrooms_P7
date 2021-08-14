import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blog/:id',
    name: 'Blog',
    component: () => import('../views/Blog.vue')
  },
  {
    path: '/gif/:id',
    name: 'Gif',
    component: () => import('../views/Gif.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue')
  },
  {
    path: '/user/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/user/blog',
    name: 'Add post',
    component: () => import('../views/AddPost.vue')
  },
  {
    path: '/user/gif',
    name: 'Add gif',
    component: () => import('../views/AddGif.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
