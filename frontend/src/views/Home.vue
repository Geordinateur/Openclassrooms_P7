<template>
  <div class="home">
    wesh
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    seeBlog() {
      axios
        .get('http://localhost:3000/api/blog')
        .then(response => {
          this.status = 'success';
          this.show = false;
          console.log(response.user);
          document.location.href="./user";
        })
        .catch(error => {
          this.status = 'error';
          //          localStorage.removeItem('userToken');
          console.log(error);
        });

    },
  }
}
</script>
