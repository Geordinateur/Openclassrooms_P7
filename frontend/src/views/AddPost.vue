<template>
  <div id="add">
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
        content: '',
        userId: localStorage.userId
      },
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      axios
        .post('blog', {
          ...this.form
        })
        .then(() => {
          this.showForm = false;
          this.messageAlert = "Votre post à été ajouter avec succes."
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
      this.form.content = ''
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
