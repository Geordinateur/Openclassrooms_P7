<template>
  <span>
    <Alert :message="messageAlert" :status="statusAlert" :show="showAlert" />
    <b-button 
      id="delete"
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
//  mounted() {
//    axios
//    .get('user/' + localStorage.userId)
//      .then(() => console.log(res.data.user.username))
//      .catch(err => console.log(err))
//  },
  methods: {
    destroy(content, id) {
      axios
        .delete(content + '/' + id)
        .then(() => { 
          setTimeout(function(){ document.location.reload() }, 2000)
          this.msgAlert(true, "Contenu supprimer!!", "warning")
        })
        .catch(error => {
          this.msgAlert(true, error, "danger")
        })
    },
    msgAlert(show, message, status) {
      this.showAlert = show 
      this.messageAlert = message 
      this.statusAlert = status
    }
  },
}
</script>
