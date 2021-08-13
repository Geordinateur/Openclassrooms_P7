<template>
  <div id="login">
    <Alert :message="messageAlert" :status="statusAlert" :show="showAlert" />
    <div v-if="!myToken">
      <Login />
    </div>
    <div v-else-if="myToken">
      <h1>Bienvenue dans votre espace membre</h1>
      <div class="div-button-navuser">
        <b-button variant="warning" @click="logout()">Se déconnecter</b-button>
        <b-button variant="danger" @click="deleteAccount()">Supprimer mon compte</b-button>
      </div>
      <ul>
        <li><a href="./user/blog">Ajouter un article</a></li>
        <li><a href="./user/gif">Ajouter une image Gif</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Login from '../components/Login'
import Alert from '../components/Alert'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    Login,
    Alert
  },
  data(){
    return {
      messageAlert: '',
      statusAlert: '',
      showAlert: false, 
      user: '',
      myToken: '',
    }
  },
  beforeCreated() {
    axios.defaults.headers.common['Authorization'] = localStorage.userToken
  },
  created() {

  },
  methods: {
    logout() {
      event.preventDefault()
      this.myToken = ''
      localStorage.clear()
    },
    deleteAccount() {
      event.preventDefault()
      axios.defaults.headers.common['Authorization'] = localStorage.userToken + ' ' + localStorage.userId
      axios
        .delete('http://localhost:3000/api/user/' + localStorage.userId)
        .then(() => {
          this.messageAlert = 'Compte supprimer.'
          this.statusAlert = 'danger'
          this.showAlert = true
          this.logout()
          setTimeout(function(){ this.showAlert = false }, 3000);
        })
        .catch(error => console.log('erreur222: ' + error));
    }
  },
  mounted() {
    if(localStorage.userToken.length !== 0) {
      this.myToken = localStorage.userToken;
    }else{
      localStorage.clear()
    }
  },
  watch: {
    myToken(newToken) {
      localStorage.userToken = newToken;
    },
  }
}
</script>
