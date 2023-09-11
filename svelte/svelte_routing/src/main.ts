import './app.css'
import {routing} from './lib/routing'

creatrouting([]).start()

import App from './App.svelte'

const app = new App({
  target: document.getElementById('app'),
})

export default app
