<template>
  <b-button variant="success" @click="onClick" :disabled="loading">
    <span>
      <font-awesome-icon v-if="loading" :icon="['fas', 'spinner']" spin/>
      <font-awesome-icon v-else :icon="['fas', 'check-circle']" fixed-width/>
      <span class="ms-2">Approve</span>
    </span>
  </b-button>
</template>

<script>

export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async onClick() {
      try {
        const { metadata: { id: revision_id } } = this.$store.getters['revisions/selected']
        this.loading = true
        await this.$store.dispatch('revisions/approve', {revision_id, vm: this})
        this.$bvToast.toast(`The revision has been approved`, {
          title: 'Success',
          autoHideDelay: 5000,
          variant: 'success',
          appendToast: true
        })
      } catch (response) {
        const { responseText } = response // get the error message from REDCap
        const responseJson = JSON.parse(responseText)
        const { errors } = responseJson
        console.log(errors)
        this.$bvModal.msgBoxOk('Error approving the revision', {
          title: 'Error',
          size: 'md',
          buttonSize: 'sm',
          headerClass: 'font-weight-bold',
          okVariant: 'secondary',
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
