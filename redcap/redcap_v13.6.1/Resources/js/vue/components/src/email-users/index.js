
import { createApp } from 'vue'
import App from './App.vue'

import {default as LocalizedText, tt} from './components/LocalizedText.vue'

const init = (target) => {
    const app = createApp(App)
    app.config.globalProperties.$tt = tt // provide access to the translate method globally
    app.component('tt-text', LocalizedText)
    app.mount(target)
    return app
}

export { init as default }