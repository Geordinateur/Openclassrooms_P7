<template>
  <transition name="fade" mode="out-in">
  <b-card v-show="show" :bg-variant="status" text-variant="white" class="text-center mb-2">
    <b-card-text>{{ message }}</b-card-text>
  </b-card>
  </transition>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    status: {type: String, default: 'success'},
    message: {type: String},
    show: {type: Boolean, default: false}
  }
}
</script>
