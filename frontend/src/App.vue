<template>
  <div>
    <div id="nav">
      <NavBar />
    </div>
    <div class="container h-100 p-4">
      <h1>{{this.$route.name}}</h1>
      <div class="row h-100">
        <aside class="col-12 col-lg-3 order-lg-2">
          <nav class="navbar navbar-expand navbar-light bg-light flex-md-column flex-row align-items-start pt-1 rounded">
              <Login />
          </nav>
        </aside>
        <main class="col order-lg-1">
          <transition name="fade-page" mode="out-in">
          <router-view/>
          </transition>
        </main>
      </div>
    </div>
  </div>
</template>

<style>

</style>

<script>
import NavBar from './components/NavBar.vue'
import axios from 'axios'
import Vue from 'vue'
import moment from 'moment'
import Login from './components/Login'

axios.defaults.baseURL = 'http://localhost:3000/api/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.userToken + ' ' + localStorage.userId; 
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


export default {
  name: 'App',
  components: {
    NavBar,
    Login,
  },
  computed: {
  },
  data() {
    return {
      showLoader: false
    }
  },
  mounted() {
    this.myToken = localStorage.userToken;
    axios
      .get('user/' + localStorage.userId)
      .then(res  => this.$store.commit('AUTHENTIFICATION', res.data.user))
      .catch(err => console.log('error: ' + err))

  },
  watch: {
    myToken(newToken) {
      localStorage.userToken = newToken;
    },
    //    '$route' (to, from) {
    '$route' (to) {
      document.title = to.meta.title || 'Groupomania'
    }
  },
}

Vue.filter('formatDate', function(value) {
  if(value) {
    return moment(String(value)).format('MM/DD/YYYY') + " à " + moment(String(value)).format('hh:mm')
  }
});

</script>

<style>
a {
  text-decoration: none;
}
.btn {
  margin-right: 6px;
}
.fade-page-enter-active, .fade-page-leave-active {
  transition: opacity .1s, transform .1s;
}
.fade-page-enter, .fade-page-leave-active {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s, transform .5s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
s.btn-delete {
  position: absolue;
  right: 0;
}
.div-button-navuser {
  padding-bottom: 10px;
}
.btn-add-content{
  margin-top: 10px;
}
</style>
