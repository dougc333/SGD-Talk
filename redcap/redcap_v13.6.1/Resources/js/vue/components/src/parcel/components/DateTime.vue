<template>
    <span>{{_date}}<slot></slot></span>
</template>

<script>
    export default {
        data() {
            const momentAvailable = window.hasOwnProperty('moment')
            return {
                momentAvailable,
            }
        },
        props: {
            value: { type: String, default: null}
        },
        computed: {
            _date() {
                if(!this.momentAvailable) return this.value
                const today = window.moment()
                const target = new Date(this.value)
                if(today.isSame(target, 'day')) return window.moment(target).format('LT')
                return window.moment(target).format('L')
            }
        },
    }
</script>

<style scoped>

</style>