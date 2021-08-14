<template>
  <div class="home">
    <Alert :message="messageAlert" :status="statusAlert" :show="showAlert" />
    <div v-for="(article, index) in myArraySort" v-bind:key="index">
      <b-card
        :title="article.title"
        tag="article"
        style="max-width: 100%;"
        class="mb-2"
        :sub-title="article.createdAt | formatDate"
        >
        <b-card-text v-if="article.content">
          {{ article.content }}
          <div v-if="article.createdAt !== article.updatedAt">
            Modifié le {{ article.updatedAt | formatDate }} par {{ article.user.username }}
          </div>
        </b-card-text>
        <b-card-text v-else>
          <img :src="article.url" :alt="article.title">
          <p>Modifié le {{ article.updatedAt | formatDate }} par {{ article.user.username }}</p>
        </b-card-text>
        <span v-if="article.content" v-show="parseInt(localStorage.userId) === parseInt(article.userId)"> 
          <Delete message="Supprimer" :id="parseInt(article.id)" :userId="parseInt(article.userId)" content="blog"/>
          <b-button :href="`blog/` + article.id" variant="secondary">Modifier</b-button>
        </span><span v-else v-show="parseInt(localStorage.userId) === parseInt(article.userId)">
          <Delete message="Supprimer" :id="parseInt(article.id)" :userId="parseInt(article.userId)" content="gif"/>
          <b-button :href="`gif/` + article.id" variant="secondary">Modifier</b-button>
        </span>
        <b-button href="#" variant="primary" @click="decouverte(article.userId)">Go somewhere</b-button>

      </b-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
  import axios from 'axios'
import _ from 'lodash'
import Alert from '../components/Alert'
import Delete from '../components/Delete'

export default {
  name: 'home',
  components: { 
    Alert,
    Delete,
  },
  data() {
    return {
      localStorage: localStorage,
      showAlert: false,
      messageAlert: '',
      statusAlert: '',
      blog: [],
      gif: [],
      myArray: [],
    }
  },
  mounted() {
    axios
      .get('blog')
      .then(response => {
        this.blog  = response.data
        this.myArray = this.blog
        this.showAlert = false
      })
      .catch(()=> {
        this.msgAlert(true, "Aucun contenu pour le moment.", "secondary")
      })
    axios
      .get('gif')
      .then(response => {
        this.msgAlert(false)
        this.gif = response.data
        this.myArray = this.myArray.concat(this.gif)
      })
      .catch(() => {
        if(this.showAlert === true) {
          this.msgAlert(true, "Aucun contenu pour le moment.", "secondary")
        }
      })
  },
  methods: {
    msgAlert(show, message, status) {
      this.showAlert = show 
      this.messageAlert = message 
      this.statusAlert = status
    },
  },
  computed: {
    myArraySort: function() {
      return _.orderBy(this.myArray, 'createdAt', 'desc')
    },
  },
}
</script>
