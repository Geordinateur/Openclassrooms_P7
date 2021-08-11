<template>
  <div v-if="!myToken" id="login">
    <b-card v-if="status === 'badLogin'" bg-variant="danger" text-variant="white" class="text-center m-1">
      <b-card-text>Votre mot de passe ou identifiants sont incorrects.</b-card-text>
    </b-card>
    <b-card v-else-if="status === 'successLogin'" bg-variant="success" text-variant="white" class="text-center m-1">
      <b-card-text>Votre identification à été réaliser avec succès, vous allez être rediriger...</b-card-text>
    </b-card>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data(){
    return {
      status: '', 
      myToken: '',
      form: {
        email: '',
        password: '',
        saved: []
      },
      show: true
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
          axios.defaults.headers.common['Authorization'] = response.data.token
          localStorage.setItem('userToken', response.data.token)
          localStorage.setItem('userId', response.data.userId)
          this.status = 'successLogin' 
          this.show = false
          setTimeout(function(){ document.location.href="./user" }, 5000);
        })
        .catch(() => {
          this.status = 'badLogin';
          this.show = true
          localStorage.removeItem('userToken') 
        });
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.password = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.status = ''
      this.$nextTick(() => {
        this.show = true
      });
    }
  }
}
</script>
