<template>
    <main class="d-flex align-items-center p-2" :class="{active, read}">
        <aside class="pl-2 mr-2">
            <input type="checkbox" v-model="selected" :value="parcel.id" @click.stop/>
        </aside>
        <article class="flex-fill">
            <span class="d-block" data-from>{{parcel.from}}</span>
            <span class="d-flex">
                <span class="d-block" data-subject>{{parcel.subject}}</span>
                <span class="d-block ml-auto text-muted text-right" data-created-at :title="parcel.createdAt"><DateTime :value="parcel.createdAt" /></span>
            </span>
            <span class="d-block" data-summary>{{parcel.summary}}</span>
            <ParcelToolbar data-toolbar :read="parcel.read" :parcel-id="parcel.id" />
        </article>
    </main>
</template>

<script>
import store from '@/parcel/store.js'
import ParcelToolbar from '@/parcel/components/ParcelToolbar.vue'
import DateTime from '@/parcel/components/DateTime.vue'

    export default {
        components: { ParcelToolbar, DateTime },
        props: {
            parcel: {
                type: Object,
                default: {}
            },
        },
        computed: {
            active() { return store.active?.id === this.parcel?.id },
            read() { return this.parcel?.read===true },
            selected: {
                get() {
                    const index = store.selected.indexOf(this.parcel.id)
                    return index >= 0
                },
                set(value) {
                    const ID = this.parcel.id
                    const list = [...store.selected]
                    const index = list.indexOf(ID)
                    if(value===true) {
                        if(index>=0) return
                        store.selected.push(ID)
                    }else {
                        if(index<0) return
                        store.selected.splice(index, 1)
                    }
                },
            }
        },
    }
</script>

<style scoped>
main {
    position: relative;
    cursor: pointer;
}
main.active {
    background-color: rgba(0, 0, 0, .2);
}
main:not(.read) {
    font-weight: bold;
}
main:hover [data-toolbar] {
    opacity: 1;
    pointer-events: all;
}
article {
    font-size: 1em;
}
[data-created-at],
[data-subject] {
    font-size: .8rem;
}
[data-summary] {
    font-size: .7rem;
}
[data-toolbar] {
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 5px;
    right: 5px;
    transition-property: all;
    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
}
</style>