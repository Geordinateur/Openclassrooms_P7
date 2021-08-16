import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import axios from 'axios'

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
    component: () => import('../views/User.vue'),
//    beforeEnter (route, redirect, next) {
//      axios
//        .get('user/' + localStorage.userId)
//        .then(() => next())
//        .catch(() => redirect('/'))
//    }
  },
  {
    path: '/admin', 
    name: 'Administration', 
    component: () => import('../views/Administration.vue'),
    beforeEnter (route, redirect, next) {
      axios
        .get('user/admin')
        .then(() => next())
        .catch(() => redirect('/'))
    }
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
