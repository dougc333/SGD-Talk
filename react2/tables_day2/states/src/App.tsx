import { useState } from 'react'
import './App.css'
import {State} from './components/State'
import {states} from  './data/states'
import {Filter} from './components/Filter'
import { InputForm } from './components/InputForm'

function App() {
  return (
    <>
    APP component,
    {states.map((x)=>(
      <State key={x} state={x}/>
    ))}
    <hr />
      <InputForm data={states}></InputForm>
    </>
  )
}

export default App
