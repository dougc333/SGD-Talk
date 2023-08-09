<template>
  <b-button variant="info" @click="onClick" :disabled="!isDirty">
    <span>
      <font-awesome-icon :icon="['fas', 'undo']" fixed-width/>
      <span class="ms-2">Reset</span>
    </span>
  </b-button>
</template>

<script>
export default {
  name: 'ResetButton',
  computed: {
    isDirty() {
      return this.$store.getters['revision/isDirty'];
    }
  },
  methods: {
    onClick() {
      // use this check instead of :disabled to improve performances
      /* if(!this.isDirty) {
        alert('change at something before submitting')
        return 
      } */
      this.$store.dispatch('revision/reset')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
