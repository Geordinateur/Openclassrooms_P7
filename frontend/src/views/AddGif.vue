<template>
  <div>
    <Alert :message="messageAlert" :status="statusAlert" :show="showAlert" />
    <b-form @submit="onSubmit" @reset="onReset" v-if="showForm">
      <b-form-group
        id="input-group-1"
        label="Titre de l'article:"
        label-for="input-1"
        description=""
        >
        <b-form-input
          id="input-1"
          v-model="form.title"
          type="text"
          placeholder="Titre"
          required
          ></b-form-input>
      </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Url de l'image:"
          label-for="urlFile"
          description=""
          >
          <b-form-input
            id="urlFile"
            v-model="form.imageUrl"
            type="text"
            placeholder="Url"
            @focus="onFocusAvatar"
            ></b-form-input>
          <b-form-file @selected="onFocusAvatar" @change="onFileSelected" v-model="selectedFile" class="mt-3" id="selectedFile" plain></b-form-file>
        </b-form-group>
        <b-button type="submit" variant="primary" class="btn-add-content">Partager</b-button>
        <b-button type="reset" variant="danger" class="btn-add-content">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios'
import Alert from '../components/Alert'

export default {
  components: {
    Alert
  },
  data(){
    return {
      messageAlert: '',
      statusAlert: '',
      showAlert: false, 
      showForm: true,
      selectedFile: null,
      form: {
        title: '',
        userId: localStorage.userId,
        imageUrl: '',
      },
    }
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile  = event.target.files[0]
    },
    onFocusAvatar(event) {
      console.log(event)
      if(event.target.id == "urlFile"){
        document.getElementById('selectedFile').setAttribute("disabled", "")
      } else if(event.target.id == "selectedFile") {
        console.log('choisir focused')
      }
    },
    onSubmit(event) {
      event.preventDefault()
      const fd = new FormData();
      fd.append('title', this.form.title)
      fd.append('userId', this.form.userId)
      console.log(this.selectedFile)
      if(this.selectedFile !== null){
        fd.append('image', this.selectedFile, this.selectedFile.name)
        fd.append('imageUrl', 'http://localhost:3000/images/' + this.selectedFile.name)
      } else {
        fd.append('imageUrl', this.form.imageUrl);
      }
      axios
        .post('gif', 
          fd
          //          { ...this.form, fd },
        )
        .then(() => {
          this.showForm = false;
          this.messageAlert = "Votre Gif à été ajouter avec succes."
          this.statusAlert = 'success'
          this.showAlert = true
//          setTimeout(function(){ document.location.href="../user" }, 3000);
        })
        .catch(error => {
          this.messageAlert = error + ': ' +  error.response.data.error
          this.statusAlert = 'danger'
          this.showAlert = true
        });
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.title = ''
      this.form.url = ''
      // Trick to reset/clear native browser form validation state
      this.showForm = false
      this.showAlert = false
      this.$nextTick(() => {
        this.showForm = true
      });
    },
  },
  watch: {
  }
}
</script>
