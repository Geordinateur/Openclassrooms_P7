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
import {mapState} from 'vuex'
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
    ...mapState(['day'])
  }
}

Vue.filter('formatDate', function(value) {
  if(value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
});

</script>

<style>
a {
  text-decoration: none;
}
</style>
