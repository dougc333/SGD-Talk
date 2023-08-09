<template>
  <div v-if="loading" class="p-2">
    <i class="fa fa-spinner fa-spin"/>
    <span class="ms-2">Loading</span>
  </div>


  <div v-else>
    <ComposeEmailPanel />
    <div class="mt-2">
      <UsersPanel />
    </div>
  </div>


</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import API from './API'
import store from './store'
import ComposeEmailPanel from './components/ComposeEmailPanel.vue'

import UsersPanel from './components/UsersPanel.vue';

const loading = ref(false)

async function load() {
  try {
    loading.value = true

    const response = await API.getData()
    const {users, settings} = response
    await store.settings.loadData(settings)
    await store.users.loadData(users)
  } catch (error) {
  }finally {
    loading.value = false
  }
}

onBeforeMount( () => { load() })
</script>

<style scoped>
</style>
