<template>
<div>
    <b-button variant="outline" @click="showRevisionExportModal">
      <span>
        <font-awesome-icon :icon="['fas', 'file-export']" fixed-width/>
        <span class="ms-2">Export Revision</span>
      </span>
    </b-button>
    
    <b-modal ref="modal-export" id="modal-export" title="Export settings" size="md" no-stacking>
      <RevisionExportSettings ref="export-settings" :revision="revision">
        <template v-slot:default="slotData">
          <!-- use data from the slot to set 'valid' in the current context -->
          <div :slot-valid="valid=slotData.valid" />
        </template>
      </RevisionExportSettings>

      <template #modal-footer="{ok}">
        <div class="ml-auto">
          <b-button variant="primary" size="sm" @click="exportSettings" :disabled="!valid">Export</b-button>
          <b-button variant="secondary" size="sm" @click="ok" class="ms-2">Cancel</b-button>
        </div>
      </template>
    </b-modal>

</div>
</template>


<script>
import RevisionExportSettings from '@/components/RevisionExportSettings'

export default {
  components: { RevisionExportSettings },
  data() {
    return {
      valid: false,
    }
  },
  computed: {
    revision() {
      return this.$store.getters['revisions/selected']
    }
  },
  methods: {
    /**
     * export the active revision as a JSON file
     */
    async showRevisionExportModal() {
      const modal = this.$refs['modal-export']
      if(modal) modal.show()
    },
    exportSettings() {
      const component = this.$refs['export-settings']
      if(!component) return
      component.exportRevision()
      const modal = this.$refs['modal-export']
      if(modal) modal.hide()
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
