<template>
  <b-button variant="info" @click="onClick">
    <span>
      <font-awesome-icon :icon="['fas', 'file-export']" fixed-width/>
      <span class="ms-2">Request a configuration change</span>
    </span>
  </b-button>
</template>

<script>

export default {
  name: 'CreateRevisionButton',
  methods: {
    async onClick() {
      // disable MRNs on revision manager
      this.$store.dispatch('revision/setAllowedSettings',{mrns:false})
      // reset values to selected revision on view creation
      this.$store.dispatch('revision/reset')
      // change route
      this.$router.push({ name: 'create-revision' })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  section {
    display: inline-block;
  }
</style>
