<template>
  <div>
    <Alert :message="messageAlert" :status="statusAlert" :show="showAlert" />
    <!-- formulaire pour modifier l'article, afficher seulement si on est authentifié et reconnu comme auteur ou admin-->
    <b-form @submit="onSubmit" @reset="onReset" v-if="$store.state.user.isAdmin || parseInt(localStorage.userId) === parseInt(form.userId)" v-show="showForm">
      <h2>Modifier votre article</h2>
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
          id="textarea-group-content"
          label="Contenu de l'article:"
          label-for="textarea-content"
          description=""
          >
          <b-form-textarea
            id="textarea-content"
            v-model="form.content"
            rows="3"
            max-rows="6"
            ></b-form-textarea>
        </b-form-group>
          <p><b-button type="submit" variant="primary" class="btn-add-content">Modfier</b-button></p>
    </b-form>
    <!-- affichage de l'article -->
    <template>
      <h2>{{ form.title }}</h2>
      <p>
      Ajouté le {{ form.createdAt | formatDate }} par {{ form.user.username }}
      </p>
      <p>
      {{ form.content }}
      </p>
      <p v-if="form.createdAt !== form.updatedAt">
      Modifié le {{ form.updatedAt | formatDate }}
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
            </b-card-text>
            <template #footer>
              <Delete class="float-right" v-show="$store.state.user.id === comment.user.id || $store.state.user.isAdmin" message="Supprimer" :id="parseInt(comment.id)" content="comment"/>
              {{ comment.updatedAt | formatDate }} par <strong>{{ comment.user.username }}</strong>
            </template>
          </b-card>
        </div>
      </div>
    </template>
    <!-- formulaire pour ajouter un commentaire afficher seulement si authentifié -->
    <FormComment v-show='showFormComment' content="blog" :id="parseInt($route.params.id)"/>
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
      form: {
      },
    }
  },
  mounted() {
    //récupere l'article via une promise de axios
    axios.
      get('blog/' + this.id)
      .then(response => this.form = { ...response.data.blog })
      .catch(error => console.log(error))
    //récupere les commentaires de la même facon
    axios
      .get('comment/blog/' + this.id)
      .then(res => this.comments = res.data )
      .catch(err  => console.log(err))
  },
  methods: {
    //modifier l'article
    onSubmit(event) {
      event.preventDefault()
      axios
        .put('blog/' + this.id, { ...this.form, userId: this.$store.state.user.id, updatedAt: Date.now() })
        .then(() => this.msgAlert(true, "Votre post à correctement été modifier", "success"))
        .catch(error => this.msgAlert(true, error, "danger"))
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
    //afficher mon message d'alerte
    msgAlert(show, message, status) {
      this.showAlert = show 
      this.messageAlert = message 
      this.statusAlert = status
    },
  }
}
</script>
