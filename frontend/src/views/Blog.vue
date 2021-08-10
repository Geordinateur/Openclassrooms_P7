<template>
  <div id="app">
    <button v-on:click="updatePost()">Metter à jour</button>
    <button v-on:click="createPost()">Crée un contenu</button>
    <ul>
      <li v-for="post in blog" v-bind:key='post'>{{ updatePost() }}</li>
    </ul>
    <form>

    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'myData',
  data(){
    return {
      blog: []
    }
  },
  methods: {
    updatePost() {
      axios
        .get('http://localhost:3000/api/blog')
        .then(response => this.blog = response.data)
        .catch(error => this.blog = [{title: "Erreur de chargement: " + error}]);
    },
    createPost() {
      axios
        .post('http://localhost:3000/api/blog', {
          title: 'Un titre d\'article',
          content: 'Un contenu bla bla bla bla',
          userId: 1,
        })
        .then(response => console.log(response))
      .catch();
    }
  }
}
</script>
