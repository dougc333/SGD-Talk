<template>
    <template v-if="parcel">
        <article class="parcel-detail">
            <header>
                <div class="d-flex">
                    <div>
                        <span class="d-block text-bold"><span class="detail-label">From:</span>{{parcel.from}}</span>
                        <span class="d-block"><span class="detail-label">To:</span>{{parcel.to}}</span>
                    </div>
                    <div class="ml-auto text-right">
                        <div class="time">
                            <small :title="parcel.createdAt" class="text-muted">created {{createdAtDisplay}}</small>
                            <small :title="createdAtDescription" class="text-muted"><i class="far fa-clock fa-fw"></i></small>
                            <small :title="parcel.expiration" class="text-muted">expires {{parcel.readableExpiration}}</small>
                            <small :title="expirationDescription" class="text-muted"><i class="far fa-hourglass fa-fw"></i></small>
                        </div>
                    </div>
                </div>
                <span class="d-block"><span class="detail-label">Subject:</span>{{parcel.subject}}</span>
            </header>

            <main class="mt-2">
                <span class="d-block" v-html="parcel.body"></span>
            </main>
        </article>
    </template>
    <template v-else>
        <span>Parcel ID {{id}} was not found</span>
    </template>
</template>

<script>
import {default as store } from '@/parcel/store.js'

    export default {
        props: {
            id: {
                type: String,
                default: null
            }
        },
        computed: {
            parcel() {
                const found = store.list.find(parcel => parcel.id===this.id)
                if(found) store.active = found
                return found
            },
            active() { return store.active },
            createdAtDescription() { return 'created at'},
            expirationDescription() { return 'expiration: date when the message will be automatically deleted'},
            createdAtDisplay() {
                const createdAtDate = this.parcel?.createdAt
                if(!createdAtDate) return 'no date available'
                if(!window.hasOwnProperty('moment')) return createdAtDate
                const localTime = window.moment(createdAtDate).format('LT')
                const localDate = window.moment(createdAtDate).format('L')
                return `${localDate}, ${localTime}`
            }
        },
        methods: {
            formatDate(date) {
                var d = new Date(date)
                var formatted = [d.getMonth()+1,
                        d.getDate(),
                        d.getFullYear()].join('/')+' '+
                        [d.getHours(),
                        d.getMinutes(),
                        d.getSeconds()].join(':');
                return formatted
            }
        },
        watch: {
            parcel: {
                immediate: true,
                handler(parcel) {
                    if(!parcel || parcel.read===true) return
                    store.markParcel(parcel.id, true)
                }
            },
            active: {
                immediate: false,
                handler(value) {
                    // please note: immediate is set to false so
                    // the component will not navigate to the inbox
                    // if the route is accessed directly
                    if(value===null) {
                        // got to inbox if nothing is active
                        this.$router.push('/inbox')
                    }
                }
            }
        }
    }
</script>

<style scoped>
.parcel-detail {

}
.detail-label {
    margin-right: 3px;
    font-weight: 700;
}
.time {
    display: grid;
    grid-template-columns: auto min-content;
    gap: 0.5em;
    text-align: right;
}
main {
    white-space: pre-line;
}
</style>