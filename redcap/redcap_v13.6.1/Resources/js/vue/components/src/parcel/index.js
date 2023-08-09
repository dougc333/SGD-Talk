
import { createApp } from 'vue'
import App from './App.vue'
import NotificationBadge from '@/parcel/components/NotificationBadge.vue'
import store from '@/parcel/store.js'
import {default as router, init as initRouter} from '@/parcel/router/index.js'

const init = async (target) => {
    await store.init()
    initRouter()
    const app = createApp(App)
    app.use(router)
    app.mount(target)
    return app
}

const initBadge = async (target) => {
    await store.init()
    const app = createApp(NotificationBadge)
    app.mount(target)
    return app
}


export { init as default, initBadge }