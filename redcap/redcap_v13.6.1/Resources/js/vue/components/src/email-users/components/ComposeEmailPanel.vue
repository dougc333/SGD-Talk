<template>
    <div class="email-attributes mb-2">
        <div>
            <span class="label"><tt-text tkey="email_users_108" /></span>
        </div>
        <div>
            <DropDown dropdown-email variant="outline-secondary">
                <template #button>
                    <span>{{selectedEmail}}</span>
                </template>
                <template v-for="(email, index) in emails" :key="index">
                    <DropDownItem @click="onEmailSelected(email)" :active="email==selectedEmail">{{email}}</DropDownItem>
                </template>
                <template v-if="emails.length<3">
                    <DropDownDivider />
                    <DropDownItem @click="onAddAnotherEmailClicked"><tt-text tkey="email_users_132" /></DropDownItem>
                </template>
            </DropDown>
        </div>

        <div>
            <span class="label"><tt-text tkey="email_users_109" /></span>
        </div>
        <input type="text" class="form-control" :placeholder="`[${store.settings?.lang?.email_users_09}]`" disabled/>

        <div>
            <span class="label"><tt-text tkey="email_users_10" /></span>
        </div>
        <input type="text" class="form-control" v-model="emailSubject" />
    </div>

    <div>
        <textarea name="emailMessage" class="x-form-textarea x-form-field vue-mceditor w-100" @input="onMessageChanged" v-model="emailMessage"></textarea>
    </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';
import { DropDown, DropDownItem, DropDownDivider } from '../../shared/DropDown'
import store from '../store'

onMounted( () => {
    if(typeof window.initTinyMCEglobal == 'function') window.initTinyMCEglobal('vue-mceditor', false)
})

const emails = computed( () => {
    return store.settings?.user?.emails || []
})
const selectedEmail = computed({
    get() { return store.form.from },
    set(value) { store.form.from = value }
})
const emailSubject = computed({
    get() { return store.form.subject },
    set(value) { store.form.subject = value }
})
const emailMessage = computed({
    get() { return store.form.message },
    set(value) { store.form.message = value }
})

watch(emails, (_emails) => {
    if(emails.length==0) return
    selectedEmail.value = _emails[0]
}, {immediate: true,} )

function onMessageChanged(event) {
    const html = event?.target?.value
    if(html==null) throw new Error('Error getting the message value')
    emailMessage.value = html
}
function onEmailSelected(email) {
    selectedEmail.value = email
}
function onAddAnotherEmailClicked() {
    if(typeof window.setUpAdditionalEmails == 'function') window.setUpAdditionalEmails(); 
}


</script>

<style scoped>
.email-attributes {
    display: grid;
    grid-template-columns: min-content 1fr; 
    gap: 10px 10px;
    align-items: center;
}
input:invalid,
textarea:invalid {
  box-shadow: 0 0 5px 1px rgba(255,0,0,.5);
}
[dropdown-email] :deep([data-button] button) {
    width: 100%;
}
</style>