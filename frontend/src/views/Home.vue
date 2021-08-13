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
        </b-card-text>
        <b-card-text v-else>
          <img :src="article.url" :alt="article.title">
        </b-card-text>
        <span v-if="article.content">
        <Delete message="Supprimer mon contenu" :id="parseInt(article.id)" :userId="parseInt(article.userId)" content="blog"/>
        </span><span v-else>
        <Delete message="Supprimer mon contenu" :id="parseInt(article.id)" :userId="parseInt(article.userId)" content="gif"/>
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
    Delete
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
  created() {
    axios
      .get('http://localhost:3000/api/blog')
      .then(response => {
        this.blog  = response.data
        this.myArray = this.blog
        this.showAlert = false
      })
      .catch(()=> {
        this.showAlert = true
        this.messageAlert = "Aucun contenu pour le moment."
        this.statusAlert = 'secondary'
      })
    axios
      .get('http://localhost:3000/api/gif')
      .then(response => {
        this.gif = response.data
        this.myArray = this.myArray.concat(this.gif)
        this.showAlert = false
      })
      .catch(() => {
        if(this.showAlert === true) {
        this.messageAlert = "Aucun contenu pour le moment."
        this.statusAlert = 'secondary'
        }
      })
  },
  mounted() {
  },
  methods: {
  },
  computed: {
    myArraySort: function() {
      return _.orderBy(this.myArray, 'createdAt', 'desc')
    },
  },
}
</script>
