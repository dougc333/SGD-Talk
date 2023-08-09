<template>
    <div>
        <button class="btn btn-sm btn-secondary" @click="toggleCheckAll" :class="{indeterminate: checkboxIsIndeterminate, checked: allChecked}" >
            <span v-if="allChecked"><tt-text tkey="email_users_18" /></span>
            <span v-else><tt-text tkey="email_users_17" /></span>
        </button>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import store from '../store'


const totalUsers = computed( () => store.users.totalNonSuspended )
const totalSelectedUsers = computed( () => store.users.totalSelected )
const checkboxIsIndeterminate = computed( () => {
    if(totalSelectedUsers.value==0) return false
    if(totalSelectedUsers.value==totalUsers.value) return false
    return true
} )
const allChecked = computed( () => {
    if(totalUsers.value==0) return false
    return totalSelectedUsers.value==totalUsers.value
} )

function toggleCheckAll() {
    store.users.toggleSelectAll([])
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