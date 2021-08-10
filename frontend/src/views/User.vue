<template>
  <div>
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
            v-model="form.checked"
            id="checkboxes-4"
            :aria-describedby="ariaDescribedby"
            >
            <b-form-checkbox value="save">Se souvenir de moi</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
</script>

<script>
import axios from 'axios';

export default {
  data(){
    return {
      blog: [],
      form: {
        email: '',
        password: '',
        checked: []
      },
      show: true
    }
  },
  methods: {
    login() {
      axios
        .post('http://localhost:3000/api/user/login', {
          email: this.form.email,
          password: this.form.password
        })
        .then(response => this.blog = response.data)
        .catch(error => this.blog = [{title: "Erreur de chargement: " + error}]);
    },
    signup() {
      axios
        .post('http://localhost:3000/api/user/signup', {
          title: 'Un titre d\'article',
          content: 'Un contenu bla bla bla bla',
          userId: 1,
        })
        .then(response => console.log(response))
        .catch();
    },
    onSubmit(event) {
      event.preventDefault()
      console.log(this.form.email);
      console.log(this.form.password);
      axios
        .post('http://localhost:3000/api/user/login', {
          email: this.form.email,
          password: this.form.password
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
      alert(JSON.stringify(this.form))
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.password= ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }

  }
}
</script>
