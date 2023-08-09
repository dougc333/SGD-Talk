<template>
    <Pagination :per-page="perPage"  :total-items="totalFiltered" v-model="page" size="sm"/>
</template>

<script setup>
import { computed } from 'vue';
import Pagination from '../../shared/Pagination.vue'
import store from '../store'
const { users:usersStore } = store

const page = computed({
    get() { return usersStore.metadata.page },
    set(number) { usersStore.doAction('setPage', [number])},
})
const perPage = computed({
    get() { return usersStore.metadata.perPage },
    set(number) { usersStore.doAction('setPerPage', [number])},
})
const totalFiltered = computed({
    get() { return usersStore.metadata.totalFiltered },
    set(number) {},
})

</script>

<style scoped>


</style>