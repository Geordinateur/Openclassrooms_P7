<template>
  <div class="home">
    <Alert :message="messageAlert" :status="statusAlert" :show="showAlert" />
    <!-- on récupere puis on liste le grand tableau "myArray" qui contient tout le contenu... -->
    <div v-for="(article, index) in myArraySort" v-bind:key="index">
      <b-card
        :title="article.title"
        tag="article"
        style="max-width: 100%;"
        class="mb-2"
        :sub-title="article.createdAt | formatDate"
        >
        <b-card-text v-if="article.content">
          {{ article.content.substr(0, 355) }}
          <!-- si le texte est trop long, on ajoute ... -->
          <span v-show="article.content.length > 355">... <router-link :to="`blog/` + article.id">Lire la suite</router-link></span>
          <!-- condition si la date de mise a jour est pas la même que la date d'ajout, alors on le notifi -->
          <div v-if="article.createdAt !== article.updatedAt">
            Modifié le {{ article.updatedAt | formatDate }} par {{ article.user.username }}
          </div>
        </b-card-text>
        <b-card-text v-else>
          <p><img :src="article.imageUrl" :alt="article.title" class="image-article"></p>
          <p v-if="article.createdAt !== article.updatedAt">
          Modifié le {{ article.updatedAt | formatDate }} par {{ article.user.username }}
          </p>
          <!-- like et dislike pour les images seulment -->
          <div>
            <a v-if="canIVote(article.userLikes)" href="#" @click="addLike(article.id)"><i class="far fa-thumbs-up likes"></i></a>
            <i v-else class="fas fa-thumbs-up likes"></i>
            {{ article.likes }}
            <a v-if="canIVote(article.userDislikes)" href="#" @click="addDislike(article.id)"><i class="far fa-thumbs-down likes dis"></i></a>
            <i v-else class="fas fa-thumbs-down likes dis"></i>
            {{ article.dislikes }} 
          </div>
        </b-card-text>
        <span v-if="article.content"> 
          <!-- condition pour afficher le bouton "modifier" le post -->
          <span v-show="$store.state.user.isAdmin || parseInt(localStorage.userId) === parseInt(article.userId)">
          <Delete message="Supprimer" :id="parseInt(article.id)" content="blog"/>
          <b-button router-link :to="`blog/` + article.id" variant="secondary">Modifier</b-button>
          </span>
        <b-button router-link :to="`blog/` + article.id" variant="primary">Commentaires</b-button>
        </span><span v-else>
          <!-- condition pour afficher le bouton "modifier" l'image-->
          <span v-show="$store.state.user.isAdmin || parseInt(localStorage.userId) === parseInt(article.userId)">
          <Delete message="Supprimer" :id="parseInt(article.id)" content="gif"/>
          <b-button router-link :to="`gif/` + article.id" variant="secondary">Modifier</b-button>
          </span>
        <b-button router-link :to="`gif/` + article.id" variant="primary">Commentaires</b-button>
        </span>
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
      nbComment: [],
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
      .catch(()=> this.msgAlert(true, "Aucun contenu pour le moment.", "secondary"))
    axios
      .get('gif')
      .then(response => {
        this.msgAlert(false)
        this.gif = response.data
        this.myArray = this.myArray.concat(this.gif)
      })
      .catch(() => {
        //petite condition si le message est déja afficher, ne l'affichons pas deux fois
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
        .put('gif/' + id + '/like', { silent: true })
        .then(() => { 
          setTimeout(function(){ document.location.reload() }, 1000);
          this.msgAlert(true, "Merci pour votre contribution", "success")
        })
        .catch(error => console.log(error))
    },
    addDislike(id) {
      axios
        .put('gif/' + id + '/dislike')
        .then(() => {
          setTimeout(function(){ document.location.reload() }, 1000);
          this.msgAlert(true, "Merci pour votre contribution", "success")
        })
        .catch(error => console.log(error))
    },
    // on verifie si l'utilisateur peut voté ou a déjà voté (j'ai perdu quelques cheveux ici)
    canIVote(userLikes) {
      let i = 0
      while (parseInt(userLikes[i]) !== parseInt(localStorage.userId)){
        if(i > userLikes.length) {
          break
        }
        i++;
        if(i === userLikes.length) { return true }
      }
    }
  },
  computed: {
    myArraySort: function() {
      return _.orderBy(this.myArray, 'createdAt', 'desc')
    },
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
.image-article {
  max-width: 700px;
}
</style>
