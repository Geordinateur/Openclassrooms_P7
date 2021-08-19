<template>
  <div>
    <Alert :message="messageAlert" :status="statusAlert" :show="showAlert" />
    <!-- formulaire afficher seulement si on est authentifié -->
    <b-form @submit="onSubmit" @reset="onReset" v-if="$store.state.user.isAdmin || parseInt(localStorage.userId) === parseInt(form.userId)" v-show="showForm">
      <h2>Modifier votre image</h2>
      <p>
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
      </p>
    </b-form>
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
      <h3>Les commentaires</h3>
      <p v-show="comments.length === 0">Soyez le premier à réagir!</p>
      <div v-for="(comment, index) in comments" v-bind:key="index">
        <div v-if="!comment.commentId">
          <b-card
            style="max-width: 100%;"
            class="mb-2"
            >
            <b-card-text>
              <b-avatar variant="info" :src="comment.user.imageUrl" size="4rem"></b-avatar>
              {{ comment.content }}<br>
              <pre v-show="comment.createdAt !== comment.updatedAt">Modifier le {{ comment.updatedAt }}</pre>
              <!-- petit formulaire pour modifier son commetaire -->
              <transition name="fade" mode="out-in">
              <div v-if="showFormUpdate === comment.id && $store.state.user.id === comment.userId">
                <FormComment v-show='showFormComment' content="comment" :id="parseInt(comment.id)" option="update"/>
              </div>
              </transition>

            </b-card-text>
            <template #footer>
              <Delete class="float-right" v-show="$store.state.user.id === comment.user.id || $store.state.user.isAdmin" message="Supprimer" :id="parseInt(comment.id)" content="comment"/>
              <b-button @click="updateComment(comment.id)" variant="secondary">Modifier</b-button>
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
      showFormUpdate: false,
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
    updateComment(id) {
      if(this.showFormUpdate === false) { 
        this.showFormUpdate = id 
      } else if(this.showFormUpdate !== id) { 
        this.showFormUpdate = id 
      } else {
        this.showFormUpdate = false
      }
    }
  }
}
</script>

<style>
.imageArticle {
  border-radius: 100px;
  max-width: 100%;
}
</style>
