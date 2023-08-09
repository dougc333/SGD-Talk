<template>
  <div>
    <b-button variant="outline" @click="importRevision">
      <span>
        <font-awesome-icon :icon="['fas', 'file-import']" fixed-width/>
        <span class="ms-2">Import Revision</span>
      </span>
    </b-button>
  </div>
</template>


<script>


export default {
  computed: {
    userCanImportRevision() {
      const user = this.$store.state.user.info
      if(!user) return false
      const {super_user: userIsAdmin, can_create_revision} = user
      if(userIsAdmin) {
          return true
      }else {
          return can_create_revision
      }
    },
  },
  methods: {
    /**
     * show a file dialog box
     */
    importRevision()
    {
      const normalizeData = (data) => {
          const revision = Object.assign({}, data)
          if(!Array.isArray(revision.fields)) revision.fields = []
          if(!Array.isArray(revision.mrns)) revision.mrns = []
          return revision
      }

      // create a file inout element and append it to the DOM
      const fileUpload = document.createElement('input')
      fileUpload.setAttribute('type', 'file')
      // fileUpload.setAttribute('multiple', true)
      fileUpload.style.display = 'none'
      document.body.appendChild(fileUpload)

      fileUpload.addEventListener('change', async () => {

        const formData = new FormData()
        Array.from(fileUpload.files).forEach(file => {
          formData.append('files[]', file)
        })

        const { data } = await this.$API.dispatch('revisions/importRevision', formData)
        const revision = normalizeData(data)

        await this.$store.dispatch('revision/set', revision)
        this.$emit('import', data)
        if(!data) {
          this.$bvModal.msgBoxOk('The file you are trying to import could not be processed', {
            title: 'Import error',
            size: 'md',
            buttonSize: 'sm',
            headerClass: 'font-weight-bold',
            okVariant: 'secondary',
          })
        }
        fileUpload.remove()
      })
      fileUpload.click()
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>