import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {Link} from 'react-router-dom'
import { BrowserRouter,Routes, Route } from "react-router-dom";
import './index.css'
import {Posts} from './Posts.tsx'
// import { UseEffectNoDepArray } from './UseEffectNoDepArray.tsx'
// import { UseEffectOnce } from './UseEffectOnce.tsx'
import { UseEffectTripleEquals } from './UseEffectTripleEqual.tsx'
import { UseEffectTripleEqualsUseFixAddObjectFields } from './UseEffectTripleEqualsUseFixAddObjectFields.tsx'
import { UseEffectTimerInfinite } from './UseEffectTimerInfinite.tsx'
import { UseEffectTimerInfiniteFn } from './UseEffectTimerInfinteFn.tsx'
import { UseEffectCleanup } from './UseEffectCleanup.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}

     <App />
     <hr />
    {/* <h4>UseEffectNoDepArray</h4>
    <UseEffectNoDepArray />
    <hr></hr>
    <h4>Use Effect Once</h4>
    <UseEffectOnce></UseEffectOnce>
    <hr /> 
    <h4>UseEffectTripleEqual</h4>
    <UseEffectTripleEquals></UseEffectTripleEquals>
    <hr />
    <h4>UseEffectTripleEqualsUseMemoFix</h4>
    <UseEffectTripleEqualsUseFixAddObjectFields></UseEffectTripleEqualsUseFixAddObjectFields>
    <hr /> */}
    {/* <h3>UseEffectTimerInfinite</h3>
    <UseEffectTimerInfinite></UseEffectTimerInfinite>
    <hr />
    <h4>UseEffectTimerInfiniteFn</h4>
    <UseEffectTimerInfiniteFn></UseEffectTimerInfiniteFn> */}
    {/* <h4>UseEffectCleanup</h4>
    <UseEffectCleanup></UseEffectCleanup> */}
    <hr />
    {/* <Link to="/posts">Posts</Link>
    <Routes>
    <Route path="/posts" element={<Posts/>}></Route>
    </Routes>
    </BrowserRouter> */}
  </React.StrictMode>,
)
