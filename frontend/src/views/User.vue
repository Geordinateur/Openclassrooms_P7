<template>
  <div id="login">
    <Alert :message="messageAlert" :status="statusAlert" :show="showAlert" />
    <div v-if="!myToken">
      <Login />
    </div>
    <div v-else-if="myToken">
      <h1>Bienvenue {{ form.username }} dans votre espace membre</h1>
      <div class="div-button-navuser">
        <b-button variant="warning" @click="logout()">Se déconnecter</b-button>
        <b-button variant="danger" @click="deleteAccount()">Supprimer mon compte</b-button>
      </div>
      <ul>
        <li><a href="./user/blog">Ajouter un article</a></li>
        <li><a href="./user/gif">Ajouter une image Gif</a></li>
        <li><a href="#" @click="showFormUpdate()">Modifier mon profil</a></li>
      </ul>
    </div>
    <b-form @submit="onSubmit" v-show="showForm">
      <b-form-group
        id="input-group-1"
        label="Pseudonyme:"
        label-for="input-1"
        description=""
        >
        <b-form-input
          id="input-1"
          v-model="form.username"
          type="text"
          required
          ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-2"
        label="Adresse email:"
        label-for="input-1"
        description=""
        >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-3"
        label="Mot de passe:"
        label-for="input-3"
        description="Entrez un nouveau mot de passe si vous désirez le changer"
        >
        <b-form-input
          id="input-3"
          v-model="form.newPassword"
          type="password"
          ></b-form-input>
      </b-form-group>

          <b-button type="submit" variant="primary" class="btn-add-content">Partager</b-button>
    </b-form>




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
      showForm: false,
      user: '',
      myToken: '',
      form: {
        newPassword: null,
      }
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
        .delete('user/' + localStorage.userId)
        .then(() => {
          this.messageAlert = 'Compte supprimer.'
          this.statusAlert = 'danger'
          this.showAlert = true
          this.logout()
          setTimeout(function(){ this.showAlert = false }, 3000);
        })
        .catch(error => console.log('erreur222: ' + error));
    },
    onSubmit() {
      axios
        .put('user/' + localStorage.userId, {
          ...this.form
        })
        .then(() => {
          console.log(this.form)
          this.msgAlert(true, "Votre profil à été mis à jour!", "success")
        })
        .catch(error => {
          this.msgAlert(true, "Erreur: " + error.response.data.error, "danger")
        })
    },
    showFormUpdate() {
      if(this.showForm === false) {
        this.showForm = true
      } else {
        this.showForm = false
      }
    },
    msgAlert(show, message, status) {
      this.showAlert = show 
      this.messageAlert = message 
      this.statusAlert = status
    },

  },
  mounted() {
    if(localStorage.userToken.length !== 0) {
      this.myToken = localStorage.userToken;
    }else{
      localStorage.clear()
    }
    axios
    .get('user/' + localStorage.userId)
      .then(response => {
        this.form = { ...response.data.user }
      })
      .catch(error => {
        console.log('une erreur: ' + error)
      })
  },
  computed: {
    salut: function() {
      return console.log(this.form)
    },
  },
  watch: {
    myToken(newToken) {
      localStorage.userToken = newToken;
    },
  }
}
</script>
