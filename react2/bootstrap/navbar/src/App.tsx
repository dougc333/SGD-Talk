import { useState } from 'react'
import './App.css'
import Navbar from './components/NavbarComp'
import NavbarComp from './components/NavbarComp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavbarComp></NavbarComp>
    </>
  )
}

export default App
