/* eslint-disable */

/**
 * all libraries are loaded here
 */
import Vue from 'vue'
Vue.globalLibraryPrefix =  '__global'
Vue.addGlobalLibrary = (key, library) => {
    Vue[`${Vue.globalLibraryPrefix}${key}`] = library
}
Vue.getGlobalLibrary = (key) => {
    return Vue[`${Vue.globalLibraryPrefix}${key}`]
}


import Vuex from 'vuex'
Vue.use(Vuex)

Vue.addGlobalLibrary('Vuex', Vuex)
// import axios from 'axios'

// Vue.config.productionTip = process.env.NODE_ENV=='production'


 // set the global API object
 import API_Plugin from '@/API/plugin'
 Vue.use(API_Plugin)
  
// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)
Vue.component('font-awesome-icon', FontAwesomeIcon)


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

export default Vue