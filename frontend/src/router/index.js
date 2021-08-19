import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import axios from 'axios'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "Home page!"
    },
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
    name: 'Espace Membre',
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
    meta: {
      title: "Administration web"
    },
    beforeEnter (route, redirect, next) {
      axios
        .get('user/admin')
        .then(() => next())
        .catch(() => redirect('/'))
    }
  },
  {
    path: '/user/update',
    name: 'Espace Membre',
    component: () => import('../views/UserUpdate.vue')
  },
  {
    path: '/user/signup',
    name: 'Espace Membre',
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
