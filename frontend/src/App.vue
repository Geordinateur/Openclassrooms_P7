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
</script>

<style>
a {
  text-decoration: none;
}
</style>
