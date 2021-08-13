<template>
  <div>
    <Alert :status="statusAlert" :message="messageAlert" :show="showAlert" />
    <!--        <b-card v-if="status === 'error'" bg-variant="danger" text-variant="white" class="text-center m-1">
      <b-card-text>Erreur.</b-card-text>
      </b-card>
      <b-card v-else-if="status === 'success'" bg-variant="success" text-variant="white" class="text-center m-1">
      <b-card-text>Votre inscription c'est dérouler avec succes, vous pouvez dès maintenant vous connecter.</b-card-text>
      </b-card>-->
      <b-form @submit="onSubmit" @reset="onReset" v-if="showForm">
        <b-form-group
          id="input-group-1"
          label="Username:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
          >
          <b-form-input
            id="input-1"
            v-model="form.username"
            type="text"
            placeholder="Enter username"
            required
            ></b-form-input>
        </b-form-group>
          <b-form-group
            id="input-group-2"
            label="Email address:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
            >
            <b-form-input
              id="input-2"
              v-model="form.email"
              type="email"
              placeholder="Enter email"
              required
              ></b-form-input>
          </b-form-group>
            <b-form-group 
              id="input-group-3" 
              label="Password" 
              label-for="input-3"
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
        saved: []
      },
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      console.log(this.form.username + this.form.email + this.form.password)
      axios
        .post('http://localhost:3000/api/user/signup', {
          username: this.form.username,
          email: this.form.email,
          password: this.form.password
        })
        .then(response => {
          this.status = 'success'
          this.showForm = false
          this.showAlert = true
          this.messageAlert = "Félicitation, votre inscription c'est dérouler avec succes"
          this.statusAlert = 'success'
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
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.password= ''
      // Trick to reset/clear native browser form validation state
      this.showForm = false
      this.showAlert = false
      this.status = ''
      this.$nextTick(() => {
        this.showForm = true
      });
    },
  },
}
</script>
