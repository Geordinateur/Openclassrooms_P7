<template>
  <span>
    <Alert :message="messageAlert" :status="statusAlert" :show="showAlert" />
    <b-button 
      id="delete"
      v-if="parseInt(localStorage.userId) === parseInt(userId)" 
      class="btn-delete" 
      variant="danger" 
      @click="destroy(content, id)">
      {{ message }} 
    </b-button>
  </span>
</template>

<script>
import axios from 'axios'
import Alert from './Alert'

export default {
  name: 'Delete',
  components: {
    Alert
  },
  props: {
    message: {type: String},
    content: {type: String},
    id: {type: Number},
    userId: {type: Number}
  },
  data() {
    return {
      localStorage: localStorage,
      myToken: '',
      messageAlert: '',
      statusAlert:  '',
      showAlert: false, 
    }
  },
  methods: {
    destroy(content, id) {
      axios
        .delete('http://localhost:3000/api/' + content + '/' + id, {
          headers: {"Authorization": this.myToken + ' ' + this.userId}
        })
        .then(() => { 
          setTimeout(function(){ document.location.reload() }, 2000)
          this.messageAlert = "Contenu supprimer!!"
          this.statusAlert = "warning"
          this.showAlert = true
        })
        .catch(error => {
          this.messageAlert = error
          this.statusAlert = "success"
          this.showAlert = true
        })
    }
  },
  mounted() {
    if(localStorage.userToken.length !== 0) {
      this.myToken = localStorage.userToken;
    }else{
      localStorage.clear()
    }
  },
  watch: {
    myToken(newToken) {
      localStorage.userToken = newToken;
    }
  }
}
</script>
