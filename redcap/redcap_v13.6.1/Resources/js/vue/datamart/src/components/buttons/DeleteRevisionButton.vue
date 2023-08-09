<template>
  <b-button variant="danger" @click="onClick" :disabled="loading">
    <span>
      <font-awesome-icon v-if="loading" :icon="['fas', 'spinner']" spin/>
      <font-awesome-icon v-else :icon="['fas', 'trash-alt']" fixed-width/>
      <span class="ms-2">Delete revision</span>
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
    async deleteRevision() {
      const revision = this.$store.getters['revisions/selected']
      const {metadata: {id:revision_id}} = revision
      try {
        this.loading = true
        await this.$store.dispatch('revisions/delete', {revision_id, vm: this})
        this.$bvToast.toast(`Your revision has been deleted`, {
          title: 'Success',
          autoHideDelay: 5000,
          variant: 'success',
          appendToast: true
        })
      } catch(error) {
        console.log(error)
        this.$bvModal.msgBoxOk('Error deleting your revision', {
          title: 'Error',
          size: 'md',
          buttonSize: 'sm',
          headerClass: 'font-weight-bold',
          okVariant: 'secondary',
        })
      }finally {
        this.loading = false
      }
    },
    async onClick() {
      // check revision before submitting

      this.$bvModal.msgBoxConfirm('Please confirm that you want to delete this revision.', {
        title: 'Are you sure?',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'Delete',
        cancelTitle: 'Cancel',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
      .then(value => {
        if(value) this.deleteRevision()
      })
      .catch(error => {
        console.log(error)
      })    
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
