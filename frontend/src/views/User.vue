<template>
  <div v-if="!myToken" id="login">
    <Login />
  </div>
  <div v-else-if="myToken">
    <h1>Bienvenue {{ this.user.username }} dans votre espace membre</h1>
    <ul>
      <li><a href="./user/blog">Ajouter un article</a></li>
      <li><a href="./user/gif">Ajouter une image Gif</a></li>
      <li><a href="#" @click="logout()">Se déconnecter</a></li>
    </ul>
  </div>
</template>

<script>
import Login from '../components/Login.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    Login 
  },
  data(){
    return {
      user: '',
      myToken: '',
    }
  },
  created() {
      axios.defaults.headers.common['Authorization'] = localStorage.userToken
      axios
        .get('http://localhost:3000/api/user')
        .then(response => {
          const toParse = JSON.stringify(response.data.user)
          this.user = JSON.parse(toParse)
          console.log(this.user)
        })
        .catch(error => {
          this.status = 'error'
          console.log(error)
        });
  },
  methods: {
    logout() {
      event.preventDefault()
      localStorage.clear()
      document.location.href="./"
    },
  },
  mounted() {
    if(localStorage.userToken) {
      this.myToken = localStorage.userToken;
    }
  },
  watch: {
    myToken(newToken) {
      localStorage.userToken = newToken;
    },
  }
}
</script>
