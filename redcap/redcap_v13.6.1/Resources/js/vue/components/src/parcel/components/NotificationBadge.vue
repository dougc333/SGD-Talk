<template>

        <a :href="link">Messages</a>
        <template v-if="loading">
            <span class="action">
                <i class="fa-solid fa-spinner fa-spin fa-fw"></i>
            </span>
        </template>
        <template v-else>
            <span class="action" @click="onRefreshClicked"><i class="fas fa-sync-alt fa-fw"></i></span>
        </template>
        <span v-if="unread>0" class="ml-2 badge badge-danger" >{{unread}}</span>

</template>

<script>
    import store from '@/parcel/store.js'
    
    let intervalID = null
    const intervalDelay = 1000 * 60 // 1 minute

    export default {
        methods: {
            onRefreshClicked() {
                store.fetchList()
            },
        },
        mounted() {
            intervalID = setInterval(() => {
                store.fetchList()
            }, intervalDelay);
        },
        unmounted() {
            clearInterval(intervalID)
        },
        computed: {
            loading() { return store.loading },
            unread() { return store.unread },
            link() { return store?.settings?.indexURL },
        }
    }
</script>

<style scoped>
.action {
    cursor: pointer;
    padding: 2px;
    border-radius: 2px;
}
.action:hover {
    background-color: rgba(0,0,0,0.2);
}
</style>