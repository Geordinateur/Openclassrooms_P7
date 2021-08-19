<template>
  <div>
    <Alert :message="messageAlert" :status="statusAlert" :show="showAlert" />
    <h2>Modifier votre profil</h2>
    <b-form @submit="onSubmit" v-show="showForm">
      <b-form-group
        id="input-group-1"
        label="Pseudo"
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
          label="Adresse email"
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
            id="input-group-4"
            label="Url de votre avatar"
            label-for="input-4"
            >

            <b-form-input
              id="input-4"
              v-model="form.imageUrl"
              type="text"
              ></b-form-input>
          </b-form-group>
            <b-form-group
              id="input-group-3"
              label="Mot de passe"
              label-for="input-3"
              description="Entrez un nouveau mot de passe si vous désirez le changer"
              >
              <b-form-input
                id="input-3"
                v-model="form.newPassword"
                type="password"
                ></b-form-input>
            </b-form-group>
              <b-form-group
                id="input-group-5"
                label-for="input-3"
                description="Confirmez votre nouveau mot de passe"
                >
                <b-form-input
                  id="input-3"
                  v-model="form.newPassword"
                  type="password"
                  ></b-form-input>

              </b-form-group>
                <b-button type="submit" variant="primary" class="btn-add-content">Modifier mon profil</b-button>
                <b-button variant="danger" @click="deleteAccount()" class="btn-add-content">Supprimer mon compte</b-button>
    </b-form>
  </div>
</template>
<script>
import Alert from '../components/Alert'
import axios from 'axios'
import {mapState} from 'vuex'

export default {
  name: 'App',
  components: {
    Alert
  },
  data(){
    return {
      messageAlert: '',
      statusAlert: '',
      showAlert: false, 
      showForm: true,
      //user: '',
      myToken: '',
      form: {
        newPassword: null,
      }
    }
  },
  methods: {
    logout() {
      event.preventDefault()
      this.myToken = ''
      localStorage.clear()
      this.$store.commit('AUTHENTIFICATION', '')
          this.msgAlert(true, "Vous allez être déconnectez...", "info")
          setTimeout(function(){ document.location.href="../user" }, 2000);
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
    onSubmit(event) {
      event.preventDefault()
      axios
        .put('user/' + localStorage.userId, { ...this.form })
        .then(() => {
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
    //    if(localStorage.userToken.length !== 0) {
    //      this.myToken = localStorage.userToken;
    //    }else{
    //      localStorage.clear()
    //    }
    console.log(this.$store.state)
    axios
      .get('user/' + localStorage.userId)
      .then(response => {
        this.form = { ...response.data.user
        }
      })
      .catch(error => {
        console.log('une erreur: ' + error)
      })
  },
  computed: {
    ...mapState(["msg", "user"])
  },
  watch: {
    //    myToken(newToken) {
    //      localStorage.userToken = newToken;
    //    },
  },
}
</script>
