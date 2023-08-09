<template>
  <div class="wrapper">
    <b-dropdown  class="m-0" variant="outline"  right :no-caret="true">
      <template #button-content>
        <font-awesome-icon :icon="['fas', 'cog']" fixed-width />
      </template>
      <b-dropdown-item>
          <ExportRevisionButton class="export"/>
      </b-dropdown-item>
      <b-dropdown-item>
          <ImportRevisionButton class="import" v-on:import="onImport"/>
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
import ImportRevisionButton from '@/components/buttons/ImportRevisionButton'
import ExportRevisionButton from '@/components/buttons/ExportRevisionButton'

export default {
  name: 'RevisionImportExport',
  components: {
      ImportRevisionButton,
      ExportRevisionButton,
  },
  methods: {
    onImport(data) {
      if(data) {
        this.$router.push({ name: 'create-revision'})
      }
    }
  },
}
</script>

<style>
.import-export.dropdown-container > button {
    background-color: transparent;
    border: none;
    color: black;
  }
.import-export.dropdown-container > button > i {
  transition-property: transform;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
  transform: rotate(0deg);
}
.import-export.dropdown-container > button:focus > i {
  transform: rotate(45deg);
}
/* style for buttons inside menu */
.export > button,
.import > button {
  font-size: 1rem;
  padding: 0;
  background-color: transparent;
  border-color: transparent;
}
.export > button:hover,
.import > button:hover {
  /* color: #212529; */
  background-color: transparent;
  border-color: transparent;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
