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
          <img :src="article.imageUrl" :alt="article.title">
          <p v-if="article.createdAt !== article.updatedAt">
          Modifié le {{ article.updatedAt | formatDate }} par {{ article.user.username }}
          </p>


          <div v-for="(userLikesId, index) in article.userLikes" v-bind:key="index">
            {{xxx(userLikesId)}} ????
            {{ articles.canLike }}
            {{ canILike }}
            <span v-if="parseInt(userLikesId) === parseInt(localStorage.userId)">Ta dja vote</span>
          </div>
          <a href="#" @click="addLike(article.id)" class="likes"><i class="far fa-thumbs-up"></i></a>
          {{ article.likes }}
          <a href="#" @click="addDislike(article.id)" class="likes dis"><i class="far fa-thumbs-down"></i></a>
          {{ article.dislikes }} 



        </b-card-text>
        <span v-if="article.content" v-show="$store.state.user.isAdmin || parseInt(localStorage.userId) === parseInt(article.userId)"> 
          <Delete message="Supprimer" :id="parseInt(article.id)" content="blog"/>
          <b-button :href="`blog/` + article.id" variant="secondary">Modifier</b-button>
        </span><span v-else v-show="$store.state.user.isAdmin || parseInt(localStorage.userId) === parseInt(article.userId)">
          <Delete message="Supprimer" :id="parseInt(article.id)" content="gif"/>
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
      canILike: 'true',
      articles: [{
        userLikes: [],
        canLike: 'true',
      }
    ],
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
    addLike(id) {
      axios
      .put('gif/' + id + '/like')
        .then(() => this.msgAlert(true, "Merci pour votre contribution", "success"))
        .catch(error => console.log(error))
    },
    xxx(id) {
      if(id === localStorage.userId) { this.canILike = 'false' }
    },
  },
  computed: {
    myArraySort: function() {
      return _.orderBy(this.myArray, 'createdAt', 'desc')
    },
  },
  wath: {
  },
}
</script>

<style>
.likes {
  font-size: 1.3rem;
  color: green;
}
.dis {
  color: red;
}
</style>
