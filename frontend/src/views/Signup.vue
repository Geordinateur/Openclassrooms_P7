<template>
  <div id="login">
        <b-card v-if="status === 'error'" bg-variant="danger" text-variant="white" class="text-center m-1">
          <b-card-text>Erreur.</b-card-text>
        </b-card>
        <b-card v-else-if="status === 'success'" bg-variant="success" text-variant="white" class="text-center m-1">
          <b-card-text>Votre inscription c'est dérouler avec succes, vous pouvez dès maintenant vous connecter.</b-card-text>
        </b-card>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Username:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
        >
        <b-form-input
          id="input-1"
          v-model="form.user"
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

export default {
  data(){
    return {
      status: '', 
      myToken: '',
      form: {
        user: '',
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
        .post('http://localhost:3000/api/user/signup', {
          user: this.form.user,
          email: this.form.email,
          password: this.form.password
        })
        .then(response => {
//          axios.defaults.headers.common['Authorization'] = response.data.token;
//          localStorage.setItem('userToken', response.data.token);
          this.status = 'success';
          this.show = false;
          console.log(response);
        })
        .catch(error => {
          this.status = 'error';
//          localStorage.removeItem('userToken');
          console.log(error);
        });
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.password= ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.status = ''
      this.$nextTick(() => {
        this.show = true
      });
    },
  },
}
</script>
