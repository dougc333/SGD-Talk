<template>
  <b-button variant="info" @click="onClick" >
    <span>
      <font-awesome-icon :icon="['fas', 'code-branch']" fixed-width/>
      <span class="ms-2">Use the Mapping Helper</span>
    </span>
  </b-button>
</template>

<script>

export default {
  name: 'mapping-helper-button',
  data: () => ({

  }),
  computed: {
    mapping_helper_url() {
      const {settings:{mapping_helper_url}} = this.$store.state.settings
      return mapping_helper_url
    }
  },
  methods: {
    async onClick() {
      // location.href = this.mapping_helper_url
      window.open(this.mapping_helper_url,'_self')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
