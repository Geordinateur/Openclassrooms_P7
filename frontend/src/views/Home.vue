<template>
  <div class="home">
    <div v-for="(article, index) in myArraySort" v-bind:key="index">
      <b-card
        :title="article.title"
        tag="article"
        style="max-width: 100%;"
        class="mb-2"
        >
        <b-card-text>
          Le <strong>{{ article.createdAt | formatDate}}</strong> par <strong>{{ article.author }}</strong><br>
          {{ article.content }}
        </b-card-text>
        <b-button href="#" variant="primary" @click="decouverte(article.userId)">Go somewhere</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
  import axios from 'axios'
  import _ from 'lodash'

export default {
  name: 'home',
  data() {
    return {
      blog: [],
      gif: [],
      myArray: [],
    }
  },
  created() {
    console.log('beforeCreated: ' + this.myArray)
    axios
      .get('http://localhost:3000/api/blog')
      .then(response => {
        this.blog  = response.data
        this.myArray = this.blog
      })
    axios
      .get('http://localhost:3000/api/gif')
      .then(response => {
        this.gif = response.data
        this.myArray = this.myArray.concat(this.gif)
      })
  },
  beforeMount() {

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
