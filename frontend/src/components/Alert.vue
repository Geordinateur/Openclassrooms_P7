<template>
  <transition name="fade" mode="out-in">
  <div>
    <b-alert :variant="status" v-show="show" show>{{ message }}</b-alert>
  </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    status: {type: String, default: 'default'},
    message: {type: String},
    show: {type: Boolean, default: false}
  },
  methods: {
  },
}
</script>


<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s, transform .5s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
