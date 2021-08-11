<template>
  <div id="login">
    <b-card v-if="status === 'error'" bg-variant="danger" text-variant="white" class="text-center m-1">
      <b-card-text>Erreur.</b-card-text>
    </b-card>
    <b-card v-else-if="status === 'success'" bg-variant="success" text-variant="white" class="text-center m-1">
      <b-card-text>Votre Gif à été ajouter avec succes.</b-card-text>
    </b-card>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Titre de l'article:"
        label-for="input-1"
        description=""
        >
        <b-form-input
          id="input-1"
          v-model="form.title"
          type="text"
          placeholder="Titre"
          required
          ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-2"
        label="Url de l'image:"
        label-for="input-2"
        description=""
        >
        <b-form-input
          id="input-2"
          v-model="form.url"
          type="text"
          placeholder="Url"
          required
          ></b-form-input>
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
      form: {
        title: '',
        url: '',
      },
      show: true
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      axios.defaults.headers.common['Authorization'] = localStorage.userToken
      axios
        .post('http://localhost:3000/api/gif', {
          title: this.form.title,
          url: this.form.url,
          userId: 1
        })
        .then(response => {
          //          axios.defaults.headers.common['Authorization'] = response.data.token;
          //          localStorage.setItem('userToken', response.data.token);
          this.status = 'success';
          this.show = false;
          console.log(response);
          document.location.href="../user";
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
