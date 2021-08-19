<template>
  <div>
    <Alert :message="messageAlert" :status="statusAlert" :show="showAlert" />
    <h2>Utilisateurs</h2>
    <b-table striped hover :items="users" :fields="fields">
      <template #cell(delete)="data">
        <Delete message="Supprimer" v-show="parseInt(data.item.isAdmin) === 0" :id="parseInt(data.item.id)" :userId="parseInt(data.item.id)" content="user"/>
      </template>
    </b-table>
    <h2>Articles de blog</h2>
    <b-table striped hover :items="blogs" :fields="contents">
      <template #cell(delete)="data">
        <Delete message="Supprimer" :id="parseInt(data.item.id)" :userId="parseInt(data.item.id)" content="blog"/>
      </template>
    </b-table>
    <h2>Images Gifs</h2>
    <b-table striped hover :items="gifs" :fields="contents">
      <template #cell(delete)="data">
        <Delete message="Supprimer" :id="parseInt(data.item.id)" :userId="parseInt(data.item.id)" content="gif"/>
      </template>
    </b-table>
    <h2>Commentaires</h2>
    <b-table striped hover :items="comments" :fields="fieldsComment">
      <template #cell(delete)="data">
        <Delete message="Supprimer" :id="parseInt(data.item.id)" :userId="parseInt(data.item.id)" content="comment"/>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from 'axios'
import Delete from '../components/Delete'
import Alert from '../components/Alert'

export default {
  components: {
    Delete,
    Alert,
  },
  data() {
    return {
      fields: [
        { key: 'id', sortable: true },
        { key: 'username' },
        { key: 'email', label: 'Adresse email' },
        { key: 'delete', variant: 'danger', label: 'Supprimer', }
      ],
      fieldsComment: [
        { key: 'id', },
        { key: 'content', label: 'Message'},
        { key: 'user.username', label: 'Auteur'},
        { key: 'delete', variant: 'danger', label: 'Supprimer'}
      ],
      contents: [
        { key: 'id' },
        { key: 'title' },
        { key: 'user.username', label: 'Auteur' },
        { key: 'createdAt', sortable: true },
        { key: 'delete', variant: 'danger', label: 'Supprimer' }
      ],
      users: [],
      blogs: [],
      gifs: [],
      comments: [],
      showAlert :false, 
      messageAlert: '',
      statusAlert: '',
    }
  },
  mounted() {
    axios
      .get('user')
      .then(res => this.users = res.data.user)
      .catch(err => this.msgAlert(true, err, "danger"))
    axios
      .get('blog')
      .then(res => this.blogs = res.data )
      .catch(err => this.msgAlert(true, err, "danger"))
    axios
      .get('gif')
      .then(res => this.gifs = res.data)
      .catch(err => this.msgAlert(true, err, "danger"))
    axios
      .get('comment')
      .then(res => this.comments = res.data)
      .catch(err => this.msgAlert(true, err, "danger"))
  },
  methods: {
    msgAlert(show, message, status) {
      this.showAlert = show 
      this.messageAlert = message 
      this.statusAlert = status
    }
  }
}
</script>
