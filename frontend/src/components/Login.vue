<template>
  <div class="flex-column w-100 p-2 rounded">
  <div class="text-center" v-if="!$store.state.auth">
    <h2>Identification</h2>
    <Alert :status="statusAlert" :message="messageAlert" :show="showAlert" />
    <!-- formulaire d'identification -->
    <b-form @submit="onSubmit" @reset="onReset" v-if="showForm">
      <b-form-group
        id="input-group-1"
        >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Entrez votre adresse email"
          required
          ></b-form-input>
      </b-form-group>
        <b-form-group 
          id="input-group-2" 
          >
          <b-form-input 
          class="mt-2 mb-2"
          type="password" 
          id="text-password" 
          v-model="form.password"
          aria-describedby="password-help-block"
          placeholder="Entrez votre mot de passe"
          required
          ></b-form-input>
          <b-form-text id="password-help-block">
          </b-form-text>
        </b-form-group>
        <div>
          <b-button type="submit" variant="primary">Se connecter</b-button>
          <b-button type="reset" variant="danger">Effacer</b-button>
        </div>
        <br>
        <h2>Inscription</h2>
        <p>Vous n'êtes pas encore inscrit? <router-link to="/user/signup">Inscrivez-vous!</router-link></p>
    </b-form>
  </div>
  <div v-else>
    <Alert :status="statusAlert" :message="messageAlert" :show="showAlert" />
  <p class="text-center"><b-avatar variant="info" :src="$store.state.user.imageUrl" size="8rem"></b-avatar></p>
  <p class="text-center">Bienvenue <strong>{{ $store.state.user.name }}</strong></p>
  
<b-list-group>
  <b-list-group-item router-link to="/">Aller à l'accueil</b-list-group-item>
  <b-list-group-item router-link to="/user/blog" variant="primary">Ajouter un article</b-list-group-item>
  <b-list-group-item router-link to="/user/gif" variant="primary">Ajouter une image</b-list-group-item>
  <b-list-group-item router-link to="/user/update" variant="info">Modifier le profil</b-list-group-item>
  <b-list-group-item href="#" @click="logout" variant="warning">Se déconnecter</b-list-group-item>
  <b-list-group-item router-link to="/admin" variant="dark" v-if="$store.state.user.isAdmin">Administration</b-list-group-item>
</b-list-group>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import Alert from '../components/Alert'

export default {
  components: {
    Alert
  },
  data(){
    return {
      messageAlert: '',
      statusAlert: '',
      showAlert: false, 
      showForm: true,
      myToken: '',
      form: { },
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      axios
        .post('http://localhost:3000/api/user/login', {...this.form})
        .then(response => {
          //création d'un petit localStorage pour garder le token
          localStorage.setItem('userToken', response.data.token)
          localStorage.setItem('userId', response.data.userId)
          this.msgAlert(true, "Vous êtes maintenant identifier.", "success")
          this.showForm = false
          setTimeout(function(){ document.location.href="/" }, 2000);
        })
        .catch(() => this.msgAlert(true, "Votre mot de passe ou identifiants sont incorrects.", "danger"));
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.password = ''
      // Trick to reset/clear native browser form validation state
      this.showAlert = false
      this.showForm = false
      this.status = ''
      this.$nextTick(() => {
        this.showForm = true
      });
    },
    logout() {
      event.preventDefault()
      this.myToken = ''
      localStorage.clear()
      this.$store.commit('AUTHENTIFICATION', '')
          this.msgAlert(true, "Vous avez été déconnecter, je vous redirige vers la sortie...", "secondary")
          setTimeout(function(){ document.location.href="/" }, 2000);
    },
    deleteAccount() {
      event.preventDefault()
      axios
        .delete('user/' + localStorage.userId)
        .then(() => {
          this.msgAlert(true, "Compte supprimer!", "danger")
          this.logout()
          this.showForm = false
          setTimeout(function(){ this.showAlert = false }, 3000);
        })
        .catch(error => console.log('erreur: ' + error));
    },
    msgAlert(show, message, status) {
      this.showAlert = show 
      this.messageAlert = message 
      this.statusAlert = status
    }
  },
}
</script>
