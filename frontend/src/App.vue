<template>
  <div id="app">
    <div id="nav">
      <NavBar />
    </div>
    <div class="container mt-4 mb-4">
    <router-view/>
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

axios.defaults.headers.common['Authorization'] = 'salut'; 
export default {
  name: 'App',
  components: {
    NavBar
  },
  computed: {
  }
}

console.log('userToken' + localStorage.userToken)
console.log('userId' + localStorage.userId)

Vue.filter('formatDate', function(value) {
  if(value) {
    return "Le " + moment(String(value)).format('MM/DD/YYYY') + " à " + moment(String(value)).format('hh:mm')
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s, transform .5s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
.btn-delete {
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
