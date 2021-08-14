<template>
  <div id="login">
    <Alert :message="messageAlert" :status="statusAlert" :show="showAlert" />
    <b-form @submit="onSubmit" @reset="onReset" v-if="showForm">
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
          <b-button type="submit" variant="primary" class="btn-add-content">Partager</b-button>
          <b-button type="reset" variant="danger" class="btn-add-content">Reset</b-button>
    </b-form>
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
      form: {
        title: '',
        url: '',
        userId: localStorage.userId,
      },
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      axios.defaults.headers.common['Authorization'] = localStorage.userToken + ' ' + localStorage.userId
      axios
        .post('http://localhost:3000/api/gif', {
          ...this.form
      })
        .then(() => {
          //          axios.defaults.headers.common['Authorization'] = response.data.token;
          //          localStorage.setItem('userToken', response.data.token);
          this.showForm = false;
          this.messageAlert = "Votre Gif à été ajouter avec succes."
          this.statusAlert = 'success'
          this.showAlert = true
          setTimeout(function(){ document.location.href="../user" }, 3000);
        })
        .catch(error => {
          this.messageAlert = error
          this.statusAlert = 'danger'
          this.showAlert = true
        });
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.title = ''
      this.form.url = ''
      // Trick to reset/clear native browser form validation state
      this.showForm = false
      this.showAlert = false
      this.$nextTick(() => {
        this.showForm = true
      });
    },
  },
}
</script>
