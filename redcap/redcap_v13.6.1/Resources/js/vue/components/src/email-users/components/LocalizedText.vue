<template>
    <span v-html="translation"></span>
</template>

<script>
import store from '../store'
const translate = key => {
    const translation = store?.settings?.lang[key]
    if(translation==null) {
        console.log(`error: could not find a translation for ${key}`)
        return false
    }
    return translation
}

export default {
    computed: {
        translation() {
            const translation =  translate(this.tkey)
            if(!translation) return '-- no translation found --'
            return translation
        }
    },
    props: {
        tkey: {
            type: String,
            default: ''
        }
    },
}

export {translate as tt}
</script>

<style scoped>

</style>