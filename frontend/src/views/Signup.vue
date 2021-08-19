<template>
  <div>
    <h2>Inscription</h2>
    <Alert :status="statusAlert" :message="messageAlert" :show="showAlert" />

    <!--        <b-card v-if="status === 'error'" bg-variant="danger" text-variant="white" class="text-center m-1">
      <b-card-text>Erreur.</b-card-text>
      </b-card>
      <b-card v-else-if="status === 'success'" bg-variant="success" text-variant="white" class="text-center m-1">
      <b-card-text>Votre inscription c'est dérouler avec succes, vous pouvez dès maintenant vous connecter.</b-card-text>
      </b-card>-->
      <b-form @submit="onSubmit" @reset="onReset" v-if="showForm">
        <b-form-group
          id="username-input-group"
          label="Pseudo"
          label-for="username-input"
          description="Utiliser un pseudo pour vous faire connaitre plus facilement."
          >
          <b-form-input
            id="username-input"
            v-model="form.username"
            type="text"
            required
            ></b-form-input>
        </b-form-group>
          <b-form-group
            id="email-input-group"
            label="Adresse email"
            label-for="email-input"
            description="Votre adresse email dois être valide, afin de confirmer votre compte."
            >
            <b-form-input
              id="email-input"
              v-model="form.email"
              type="email"
              required
              ></b-form-input>
          </b-form-group>
            <b-form-group 
              id="password-input-group" 
              label="Mot de passe" 
              label-for="password-input"
              description="Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji."
              >
              <b-form-input 
              type="password" 
              id="password-input" 
              v-model="form.password"
              aria-describedby="password-help-block"
              required
              ></b-form-input>
              <b-form-text id="password-help-block">
              </b-form-text>
            </b-form-group>
<b-form-group 
              id="password-input-group" 
              description="Confirmez votre mot de passe"
              >
              <b-form-input 
              type="password" 
              id="password-confirmed-input" 
              v-model="form.passwordConfirmed"
              aria-describedby="password-help-block"
              description="sss"
              required
              ></b-form-input></b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>

      </b-form>
  </div>
</template>

<script>
import axios from 'axios';
import Alert from '../components/Alert'

export default {
  components: {
    Alert 
  },
  data(){
    return {
      statusAlert: '', 
      messageAlert: '',
      showAlert: false,
      showForm: true,
      myToken: '',
      form: {
        username: '',
        email: '',
        password: '',
        passwordConfirmed: '',
        saved: []
      },
    }
  },
  methods: {
    isValid(value) {
      return /^[A-zÀ-ú]{3,}$/.test(value);
    },

    isValidAddress(value) {
      return /^[0-9]{1,}\s[A-zÀ-ú]{3,}\s[A-zÀ-ú]/.test(value);
    },

    isValidEmail(value) {
      return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value);
    }, 
    onSubmit(event) {
      event.preventDefault()
      if(!this.isValidEmail(event.target[1].value)) { 
        this.msgAlert(true, "Votre addresse email est incorrect", "danger")
      } else if (this.form.password !== this.form.passwordConfirmed) {
        this.msgAlert(true, "Vos mot de passe ne sont pas identique", "danger")
      } else {
      axios
        .post('http://localhost:3000/api/user/signup', {
          username: this.form.username,
          email: this.form.email,
          password: this.form.password
        })
        .then(response => {
          this.showForm = false
          this.msgAlert(true, "Félicitation, votre inscription c'est dérouler avec succes", "success")
          //              setTimeout(function(){ document.location.href="../user" }, 3000);
          console.log(response);
        })
        .catch(error => {
          this.showAlert = true
          this.messageAlert = "Attention, une erreur à été déclarer lors de votre inscription, vérifier votre adresse email."
          this.statusAlert = 'danger'
          //          localStorage.removeItem('userToken');
          console.log('ERREUR: ' + error);
        });
      }
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.username = ''
      this.form.email = ''
      this.form.password = ''
      this.form.passwordConfirmed = ''
      // Trick to reset/clear native browser form validation state
      this.showForm = false
      this.showAlert = false
      this.status = ''
      this.$nextTick(() => {
        this.showForm = true
      });
    },
    msgAlert(show, message, status) {
      this.showAlert = show 
      this.messageAlert = message 
      this.statusAlert = status
    },
  },
}
</script>
