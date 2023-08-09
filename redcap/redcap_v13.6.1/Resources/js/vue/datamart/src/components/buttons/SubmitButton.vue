<template>
  <b-button variant="success" @click="onClick" :disabled="loading || !isValid || !isDirty">
    <span>
      <font-awesome-icon v-if="loading" :icon="['fas', 'spinner']" spin/>
      <font-awesome-icon v-else :icon="['fas', 'file-export']" fixed-width/>
      <span class="ms-2">Submit</span>
    </span>
  </b-button>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    isDirty() {
      return this.$store.getters['revision/isDirty']
    },
    isValid() {
      const errors = this.$store.state.validator.errors
      return Object.keys(errors).length==0
    }
  },
  methods: {
    async onClick() {
      // use this check instead of :disabled to improve performances
      /* if(!this.isDirty) {
        alert('change something before submitting')
        return 
      } */
      try {
        // check revision before submitting
        const isValid = await this.$store.dispatch('revision/validate')
        if(!isValid) return

        // close the modal
        // this.$store.dispatch('modal/setOpen', false)
        this.loading = true

        await this.$store.dispatch('revision/submit', this.$API)

        this.$bvToast.toast(`Your revision has been submitted`, {
          title: 'Success',
          autoHideDelay: 5000,
          variant: 'success',
          appendToast: true
        })
      } catch (error) {
        console.log(error)
        this.$bvToast.toast(`Error submitting your revision`, {
          title: 'Error',
          autoHideDelay: 5000,
          variant: 'danger',
          appendToast: true
        })
      }finally {
        this.loading = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
