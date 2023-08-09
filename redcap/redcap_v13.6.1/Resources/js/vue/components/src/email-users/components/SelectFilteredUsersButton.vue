<template>
    <div>
        <button class="btn btn-sm btn-secondary" @click="toggleCheckAll" :class="{indeterminate: checkboxIsIndeterminate, checked: allChecked}" :disabled="buttonDisabled">
            <span v-if="allChecked"><tt-text tkey="email_users_130" /></span>
            <span v-else><tt-text tkey="email_users_129" /></span>
        </button>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import store from '../store'

/**
 * button is disabled if total users is the same as the filtered users
 */
const buttonDisabled = computed( () => {
    const _total = store.users.source.length
    return totalUsers.value==_total
} )
const totalUsers = computed( () => { return store.users.totalFilteredUsers } )
const totalSelectedUsers = computed( () => { return store.users.totalFilteredAndSelectedUsers } )
const checkboxIsIndeterminate = computed( () => {
    if(buttonDisabled.value==true) return false
    if(totalSelectedUsers.value==0) return false
    if(totalSelectedUsers.value==totalUsers.value) return false
    return true
} )
const allChecked = computed( () => {
    if(totalUsers.value==0) return false
    return totalSelectedUsers.value==totalUsers.value
} )

function toggleCheckAll() {
    store.users.toggleSelectFiltered()
}

</script>

<style scoped>
button {
    /* position: absolute; */
    top: 0;
    transition-property: background-color;
    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
    background-color: grey;
    color: white;
}
button.indeterminate {
    background-color: #FFC108;
}
button.checked {
    background-color: var(--selected-bg-color);
}
</style>