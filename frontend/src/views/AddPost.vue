<template>
  <div id="login">
    <b-card v-if="status === 'error'" bg-variant="danger" text-variant="white" class="text-center m-1">
      <b-card-text>Erreur.</b-card-text>
    </b-card>
    <b-card v-else-if="status === 'success'" bg-variant="success" text-variant="white" class="text-center m-1">
      <b-card-text>Votre article à été ajouter avec succes.</b-card-text>
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
          id="textarea-group"
          label="Contenu de l'article:"
          label-for="textarea"
          description=""
          >
          <b-form-textarea
            id="textarea"
            v-model="form.content"
            placeholder="Contenu..."
            rows="3"
            max-rows="6"
            ></b-form-textarea>
        </b-form-group>
          <b-button type="submit" variant="primary" class="btn-add-content">Partager</b-button>
          <b-button type="reset" variant="danger" class="btn-add-content">Reset</b-button>

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
        content: '',
      },
      show: true
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      axios.defaults.headers.common['Authorization'] = localStorage.userToken
      axios
        .post('http://localhost:3000/api/blog', {
//          header: {
 //           Authorization: localStorage.userToken
//          },
          title: this.form.title,
          content: this.form.content,
          userId: localStorage.userId
        })
        .then(response => {
          //          axios.defaults.headers.common['Authorization'] = response.data.token;
          //          localStorage.setItem('userToken', response.data.token);
          this.status = 'success';
          this.show = false;
          console.log('heee ' + response);
          setTimeout(function(){ document.location.href="../user" }, 3000);
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
