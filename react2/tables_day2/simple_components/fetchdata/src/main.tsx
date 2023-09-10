//https://www.youtube.com/watch?v=s2-mZBf-LVE
import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider, Route, createBrowserRouter,createRoutesFromElements} from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import {SimpleJSON} from './SimpleJSON.tsx'
import {UsersPage} from './UsersPage'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<App/>} index />
      <Route path="simple">
        <Route element={<SimpleJSON />} index />
        <Route path=':userId' element={<UsersPage />}/>
      </Route>
    </Route>
  )
)



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
