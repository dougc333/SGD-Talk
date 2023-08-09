
/* 
 * use this pattern to import libraries into a vue component
 * keeping its compiled size low.
 * libs callback is called when the vue factory is created,
 * so the exported modules will be available when the wrapper
 * component is ready
 * */
let libs = {}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

const  libsCallback = function() {
    const vue = require('vue')
    libs.vue = {...vue}
    const pinia = require('pinia')
    libs.pinia = {...pinia}
    return libs
}

if(isEmpty(libs)) libsCallback()

export {libsCallback as default, libs}
