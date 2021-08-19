<template>
  <div>
    <Alert :message="messageAlert" :status="statusAlert" :show="showAlert" />
    <!-- formulaire pour poster un commentaire -->
    <b-form @submit="onSubmit" @reset="onReset" v-if="$store.state.auth">
      <b-form-group
        id="content"
        label="Votre commentaire"
        label-for="textarea-content"
        description="Restez poli et courtoi."
        >
        <b-form-textarea
          id="textarea-content"
          v-model="form.content"
          rows="3"
          max-rows="6"
          ></b-form-textarea>
      </b-form-group>
        <b-button type="submit" variant="primary" class="btn-add-content">Commenter</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios'
import Alert from './Alert'

export default {
  components: {
    Alert
  },
  data() {
    return {
      showAlert: false,
      messageAlert: '',
      statusAlert: '',
      form: {
        userId: this.$store.state.user.id,
      },
    }
  },
  props: {
    content: {type: String},
    id: {type: Number},
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      // récupere la nature du commentaire, blog ou gif
      switch(this.content) {
        case 'gif':
          this.form.linkGif = this.id
          break
        case 'blog': 
          this.form.linkPost = this.id
          break
        default: 
          this.msgAlert(true, "Erreur", "danger")
      }
      // technique by me pour recuperer la nature du commentaire mais le switch est tellement plus pro :D
      //      if(this.content === "gif") {   }
      //      if(this.content === "blog") {  this.form.linkBlog = this.id }
      // on post le commentaire via axios sur l'API REST
      axios
        .post('/comment/' + this.content + '/' + this.id, { ...this.form })
        .then(() => {
          this.msgAlert(true, "Votre commentaire à correctement été ajouter", "success")
          setTimeout(function(){ document.location.reload() }, 1000);
        })
        .catch(error => {
          this.msgAlert(true, error + ': ' +  error.response.data.error, "danger")
        });
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.title = 
        this.form.content = ''
      // Trick to reset/clear native browser form validation state
      this.showFormComment = false
    },
    msgAlert(show, message, status) {
      this.showAlert = show 
      this.messageAlert = message 
      this.statusAlert = status
    }
  }
}
</script>
