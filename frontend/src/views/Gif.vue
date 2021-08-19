<template>
  <div id="add">
    <Alert :message="messageAlert" :status="statusAlert" :show="showAlert" />
    <!-- formulaire afficher seulement si on est authentifié -->
    <b-form @submit="onSubmit" @reset="onReset" v-if="$store.state.user.isAdmin || parseInt(localStorage.userId) === parseInt(form.userId)" v-show="showForm">
      <b-form-group
        id="input-group-title"
        label="Titre de l'article:"
        label-for="input-title"
        description=""
        >
        <b-form-input
          id="input-title"
          v-model="form.title"
          type="text"
          required
          ></b-form-input>
      </b-form-group>
        <b-form-group
          id="input-group-imageUrl"
          label="Url de l'image:"
          label-for="input-imageUrl"
          description=""
          >
          <b-form-input
            id="input-imageUrl"
            v-model="form.imageUrl"
            type="text"
            placeholder="Url"
            required
            ></b-form-input>
        </b-form-group>
          <b-button type="submit" variant="primary" class="btn-add-content">Modifier</b-button>
    </b-form><br>
    <!-- affichage de l'image-->
    <template>
      <h2>{{ form.title }}</h2>
      <p>
      Ajouté le {{ form.createdAt | formatDate }} par {{ form.user.username }}
      </p>
      <p>
      <img :src="form.imageUrl" class="imageArticle">
      </p>
      <p v-if="form.createdAt !== form.updatedAt">
      Modifié le {{ form.updatedAt | formatDate }} par {{ form.user.username }}
      </p>
    </template>
    <!-- affichage des commentaires -->
    <template>
      <div v-for="(comment, index) in comments" v-bind:key="index">
        <div v-if="!comment.commentId">
          <b-card
            tag="article"
            style="max-width: 100%;"
            class="mb-2"
            >
            <b-card-text>
              <b-avatar variant="info" :src="comment.user.imageUrl"></b-avatar>
              {{ comment.content }}<br>
            </b-card-text>
            <template #footer>
              <Delete class="float-right" v-show="$store.state.user.id === comment.user.id || $store.state.user.isAdmin" message="Supprimer" :id="parseInt(comment.id)" content="comment"/>
              {{ comment.updatedAt | formatDate }} par <strong>{{ comment.user.username }}</strong>
            </template>
          </b-card>
        </div>
      </div>
    </template>
    <FormComment v-show='showFormComment' content="gif" :id="parseInt($route.params.id)"/>
  </div>
</template>

<script>
import axios from 'axios';
import Alert from '../components/Alert'
import Delete from '../components/Delete'
import FormComment from '../components/FormComment'

export default {
  components: {
    Alert,
    FormComment,
    Delete
  },
  data(){
    return {
      localStorage: localStorage,
      showForm: true,
      showFormComment: true,
      showAlert :false, 
      messageAlert: '',
      statusAlert: '',
      id: this.$route.params.id,
      comments: '',
      form: {},
    }
  },
  mounted() {
    axios
      .get('gif/' + this.id)
      .then(response => {
        this.form = { ...response.data }
      })
      .catch(error => console.log(error))
    axios
      .get('comment/gif/' + this.id)
      .then(res => {
        console.log(res.data)
        this.comments = res.data
      })
      .catch(err  => console.log(err))
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      console.log(this.id)
      axios
        .put('gif/' + this.id, {
          ...this.form, updatedAt: Date.now()
        })
        .then(() => {
          this.msgAlert(true, "Votre image à correctement été modifier", "warning")
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

<style>
.imageArticle {
  border-radius: 100px;
  max-width: 100%;
}
</style>
