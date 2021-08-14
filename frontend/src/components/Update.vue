<template>
  <span>
    <a 
      :href="content + '/' + id"
      id="delete"
      v-if="parseInt(localStorage.userId) === parseInt(userId)" 
      class="btn btn-delete btn-secondary">
      {{ message }} 
    </a>
  </span>
</template>

<script>
export default {
  name: 'Delete',
  props: {
    message: {type: String},
    content: {type: String},
    id: {type: Number},
    userId: {type: Number}
  },
  data() {
    return {
      localStorage: localStorage,
    }
  },
}
</script>
