<template>
  <div v-show="show" class="ui active dimmer">
    <div class="ui loader"></div>
  </div>
</template>

<script>
export default {
  props: {
    show: {type: Boolean, default: false}
  }
}
</script>
