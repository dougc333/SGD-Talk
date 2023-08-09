<template>
  <div>
    <Main />
  </div>
</template>

<script>

import storeCallback from '@/store'
import apiCallback from '@/API'

import Main from '@/components/Main'

export default {
  // initCallback,
  storeCallback,
  apiCallback,
  components: { Main },
}
</script>

<style>



#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
