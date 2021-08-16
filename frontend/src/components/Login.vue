<template>
  <div v-if="!myToken" id="login">
    <Alert :status="statusAlert" :message="messageAlert" :show="showAlert" />
    <b-form @submit="onSubmit" @reset="onReset" v-if="showForm">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
        >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
          ></b-form-input>
      </b-form-group>
        <b-form-group 
          id="input-group-2" 
          label="Password" 
          label-for="input-2"
          description="Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji."
          >
          <b-form-input 
          type="password" 
          id="text-password" 
          v-model="form.password"
          aria-describedby="password-help-block"
          required
          ></b-form-input>
          <b-form-text id="password-help-block">
          </b-form-text>
        </b-form-group>
        <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
          <b-form-checkbox-group
            v-model="form.saved"
            id="checkboxes-4"
            :aria-describedby="ariaDescribedby"
            >
            <b-form-checkbox value="save">Se souvenir de moi</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
        <b-button b-link href="./user/signup" variant="success">Inscription</b-button>
    </b-form>
    {{ $store.getters.user }}
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
      form: {
        email: '',
        password: '',
        saved: []
      },
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      axios
        .post('http://localhost:3000/api/user/login', {
          email: this.form.email,
          password: this.form.password
        })
        .then(response => {
//          axios.defaults.headers.common['Authorization'] = response.data.token
          localStorage.setItem('userToken', response.data.token)
          localStorage.setItem('userId', response.data.userId)
          this.msgAlert(true, "Votre identification à été réaliser avec succès, vous allez être rediriger...", "success")
          this.showForm = false
//          this.$store.commit('AUTHENTIFICATION', response.data.user)
          setTimeout(function(){ document.location.href="../user" }, 2000);
//          console.log(this.$store)
//          console.log(response.data.user)
//          console.log(this.$store.state)
        })
        .catch(() => {
          this.statusAlert = 'danger'
          this.messageAlert = "Votre mot de passe ou identifiants sont incorrects."
          this.showAlert = true
          this.showForm = true
          localStorage.removeItem('userToken') 
        });
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
    msgAlert(show, message, status) {
      this.showAlert = show 
      this.messageAlert = message 
      this.statusAlert = status
    }
  },
  computed: {
  },
}
</script>
