/* import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app') */

import Factory from './'
if(process.env.NODE_ENV==='development') {
    window.addEventListener('DOMContentLoaded', () => {

        const {default: Test} = require('./components/TestComponent.vue')
        // const {default: CdisManager} = require('../../cdis-manager/src/App.vue')
        const devFactory = new Factory(Test, '#app')
        devFactory.mount()
    })
    
}


window.renderVue3Component = function(component, target) {
    const factory = new Factory(component, target)
    return factory.mount()
}

export default Factory