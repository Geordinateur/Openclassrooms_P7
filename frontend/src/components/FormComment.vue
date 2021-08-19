<template>
  <div>
    <Alert :message="messageAlert" :status="statusAlert" :show="showAlert" />
    <!-- formulaire pour poster un commentaire -->
    <b-form @submit="onSubmit" v-if="$store.state.auth">
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
      </b-form-group>{{ option}}
      <span v-if="option === `update`">
        <b-button href="#" @click="onUpdate" variant="primary" class="btn-add-content">Modifier</b-button>
      </span><span v-else>
        <b-button type="submit" variant="primary" class="btn-add-content">Commenter</b-button>
      </span>
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
    option: {type: String},
  },
  mounted() {
    if(this.option === "update") { 
      console.log(this.content + '/' + this.id)
      axios
        .get(this.content + '/' + this.id)
        .then(res => this.form = res.data)
        .catch(err => console.log(err))
    }
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
    onUpdate(event) {
      event.preventDefault()
      console.log(this.form)
      axios
        .put(this.content + '/' + this.id, { 
          content: this.form.content,
          updatedBy: this.$store.state.user.id,
          //...this.form 
        })
        .then(() => {
          this.msgAlert(true, "Votre commentaire à correctement été modifier", "success")
          setTimeout(function(){ document.location.reload() }, 1000);
        })
        .catch(error => {
          this.msgAlert(true, error + ': ' +  error.response.data.error, "danger")
        });
    },

    msgAlert(show, message, status) {
      this.showAlert = show 
      this.messageAlert = message 
      this.statusAlert = status
    }
  }
}
</script>
