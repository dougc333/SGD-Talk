<template>
  <rc-debug>
    <rc-messenger />
    <rc-toaster />
    <!-- <button @click="onMsgClicked">msg</button> -->
    <div ref="$header"></div>
    <slot></slot>
    <div ref="$footer"></div>
  </rc-debug>
</template>

<script>

function addScript(url) {
    var header = document.querySelector('head')
    const script = document.createElement('script')
    script.setAttribute('defer', true)
    script.src = url
    header.appendChild(script)
}
function addStyle(url) {
    var header = document.querySelector('head')
    const link = document.createElement('link')
    link.rel="stylesheet"
    link.type="text/css" 
    link.href = url
    header.appendChild(link)
}

function checkDevEnvironment() {
  if(process.env.NODE_ENV!=='development') return

  // add redcap styles in dev
  addStyle('/__redcap/redcap_v999.0.0/Resources/webpack/css/bundle.css')
  addStyle('/__redcap/redcap_v999.0.0/Resources/webpack/css/fontawesome/css/all.min.css')
  // addStyle('https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css')
  // addScript('/__redcap/redcap_v999.0.0/Resources/webpack/js/bundle.js')
  // addScript('/__redcap/redcap_v999.0.0/Resources/js/Libraries/bundle.js')
  // addScript('/__redcap/redcap_v999.0.0/Resources/js/base.js')
  // addScript("/__redcap/redcap_v999.0.0/Resources/webpack/css/tinymce/tinymce.min.js")

}



export default {
  data() {
    return {
      visible: true,
    }
  },
  created() {
    checkDevEnvironment()
  },
  mounted() {},
  methods: {
    async onMsgClicked() {
      const result = await this.$showModal({title: 'hello', body: 'world'})
      console.log(result)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
