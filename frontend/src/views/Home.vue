<template>
  <div class="home">
    <div v-for="article in blog" v-bind:key="article">
      <b-card
        :title="article.title"
        tag="article"
        style="max-width: 100%;"
        class="mb-2"
        >
        <b-card-text>
          {{ article.content }}
        </b-card-text>

        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
  import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
      blog: ''
    }
  },
  methods: {
  },
  created() {
    axios.defaults.headers.common['Authorization'] = localStorage.userToken
    axios
      .get('http://localhost:3000/api/blog')
      .then(response => {
        const toParse = JSON.stringify(response.data)
        this.blog = JSON.parse(toParse)
      })
      .catch(error => {
        this.status = 'error'
        console.log(error)
      });
  },
}
</script>
