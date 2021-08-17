<template>
  <div id="add">
    <Alert :message="messageAlert" :status="statusAlert" :show="showAlert" />
    <b-form @submit="onSubmit" @reset="onReset" v-if="$store.state.user.isAdmin || parseInt(localStorage.userId) === parseInt(form.userId)" v-show="showForm">
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
            rows="3"
            max-rows="6"
            ></b-form-textarea>
        </b-form-group>
          <b-button type="submit" variant="primary" class="btn-add-content">Partager</b-button>

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
      localStorage: localStorage,
      showAlert :false, 
      showForm: true,
      messageAlert: '',
      statusAlert: '',
      id: this.$route.params.id,
      form: {
        title: '',
        content: '',
        userId: ''
      },
    }
  },
  mounted() {
    axios.
      get('blog/' + this.id)
      .then(response => {
        this.form = { ...response.data.blog }
//        console.log('ah verifier' + response.data)
      })
      .catch(error => console.log(error))
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      axios
        .put('blog/' + this.id, {
          ...this.form, userId: this.$store.state.user.id, updatedAt: Date.now()
        })
        .then(() => {
          this.msgAlert(true, "Votre post à correctement été modifier", "warning")
        })
        .catch(error => {
          this.msgAlert(true, error, "danger")
        });
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.title = 
        this.form.content = ''
      // Trick to reset/clear native browser form validation state
      this.showForm = false
      this.showAlert = false
      this.$nextTick(() => {
        this.showForm = true
      });
    },
    msgAlert(show, message, status) {
      this.showAlert = show 
      this.messageAlert = message 
      this.statusAlert = status
    },
  }
}
</script>
