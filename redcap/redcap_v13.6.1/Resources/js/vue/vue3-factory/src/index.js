import { h, createApp, defineAsyncComponent } from 'vue'
// import { createApp } from 'vue/dist/vue.esm-bundler.js'
import { createWebHashHistory, createRouter } from "vue-router";
import { createPinia, defineStore } from 'pinia'
import api from './API/API'

import RcUtils from './plugins/rc-utils'

import axios from 'axios'

class Factory {

    app
    component
    target
    
    constructor(component, target='body') {

        if(typeof component == 'function') component = defineAsyncComponent(component) // if component is loaded with () => import()
        this.component = component
        if(typeof target == 'string') target = document.querySelector(target)
        this.target = target

        this.initApp()
        
        // this.registerComponents()
        // this.enableErrorHandler()
    }

    /* 
    * get HTML elements from the target and append it
    * to the target component.
    * data-target is used to specify the containing "slot".
    * if data-target is not specified, then the element will be inserted in the default slot
    * 
    * the wrapper component provides 2 slots: $header and $footer
    * other components can provide all the targets they want/need
    * 
    * a default value in the target container will be replaced
    */
    addOriginalHTML(component, node) {
        component.mounted = function() {
            for(let element of Array.from(node.children)) {
                let dataTarget = element.dataset.target || 'default'
                if(dataTarget in this.$refs) {
                    let target = this.$refs[dataTarget]
                    // remove all children
                    while (target.firstChild) target.removeChild(target.firstChild)
                    target.append(element)
                }
            }
        }
    }

    async initApp() {
        let component = this.component
        const {default: wrapper} = require('./App.vue')

        // move original content to a temporary container
        const temp = document.createElement('div')
        temp.append(...this.target.children)

        this.addOriginalHTML(wrapper, temp)
        this.addOriginalHTML(component, temp)
        
        const app = this.app = createApp({
            render() {
                return h(wrapper, {}, {
                    default: () => h(component),
                })
            }
        })

        /*
        TODO: remove this (added on 2022-05-04)
        injected property "$debugMode" is a ref and will be auto-unwrapped
        and no longer needs `.value` in the next minor release.
        To opt-in to the new behavior now, set `app.config.unwrapInjectedRef = true`
        (this config is temporary and will not be needed in the future.)
        */
        app.config.unwrapInjectedRef = true

        // provide custom events that can be used in children
        this.provideCustomEvent()

        // register the RcUtils plugin: custom components and directives
        app.use(RcUtils)
        /**
         * STORE
         * see the example store in this component to see how to implement multiple stores
         * in other components
         */
        app.use(createPinia()) // init pinia (must happen before triggering useStore)
        if(component.storeCallback) {
            const store =  component.storeCallback({defineStore})
            app.provide('$store', store) // this can be used in any component with inject
            app.config.globalProperties.$store = store // this is accessible in any component using this
        }
        
        if(component.routerCallback) {
            const router = component.routerCallback({createWebHashHistory, createRouter})
            app.use(router)
            app.provide('$router', router) // this can be used in any component with inject
            app.config.globalProperties.$router = router // this is accessible in any component using this
        }

        if(component.apiCallback) {
            const API = component.apiCallback(new api())
            app.provide('$API', API) // this can be used in any component with inject
            app.config.globalProperties.$API = API // this is accessible in any component using this
        }
        
        app.provide('axios', axios)
        app.provide('$app', app)

        app.config.globalProperties.appendElement = (element) => {
            for(let [key, value] of Object.entries(app)) {
                console.log(key, value)
            }
            console.log(app._component.render(element))
            // console.log(this.app.component, typeof this.app.component)
        }

    }

    mount() {
        /* const component = this.app._component
        const CustomElement = defineCustomElement(component)
        window.customElements.define('my-element', CustomElement) */
        /* const clonedTarget = this.target.cloneNode(false)
        console.log(clonedTarget)
        this.target.after(clonedTarget) */
        const mountedComponent = this.app.mount(this.target)
        return mountedComponent
    }

    /**
     * provide a custom event that can be used
     * in children and is dispatched by the wrapper node
     * 
     * example:
     *      in the component:
     * 
     *      inject: ['$customEvent'],
     *      mounted() {
     *          this.customEvent(this, 'onMount')
     *      },
     * 
     *      on the page:
     *      document.querySelector('#app').addEventListener('onMount', (e) => {
     *          console.log(e, e.detail, e.detail.page)
     *      })
     */
     provideCustomEvent() {
          const customeEvent = (args, name='onMount') => {
            const onMountEvent = new CustomEvent(name, { detail: args });
            let node = this.target
            if(typeof node == 'string') node = document.querySelector(this.target)
            if(node) node.dispatchEvent(onMountEvent);
        }
        this.app.provide('$customEvent', customeEvent)
    }

    enableErrorHandler() {
        this.app.config.errorHandler = (err, instance, info) => {
            // handle error, e.g. report to a service
            console.error('unhandled error', arguments)
        }
    }
}

export default Factory