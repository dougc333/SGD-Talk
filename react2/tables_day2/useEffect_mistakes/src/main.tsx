import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UseEffectNoDepArray } from './UseEffectNoDepArray.tsx'
import { UseEffectOnce } from './UseEffectOnce.tsx'
import { UseEffectTripleEquals } from './UseEffectTripleEqual.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <hr />
    <h4>UseEffectNoDepArray</h4>
    <UseEffectNoDepArray />
    <hr></hr>
    <h4>Use Effect Once</h4>
    <hr />
    <h4>UseEffectTripleEqual</h4>
    <UseEffectTripleEquals></UseEffectTripleEquals>
  </React.StrictMode>,
)
