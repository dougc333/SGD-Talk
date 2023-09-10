// import {Route} from "./components/Route"
import {Home} from "./components/Home"
import {About} from "./components/About"
import  Navbar from './components/Navbar'
import {Foo} from "./components/Foo"
import {C} from "./components/C"
// import { Link } from "./components/Link"
import {useState, useEffect} from 'react'
import {Contact} from './components/Contact'
import './App.css'

const Route = ({path, component})=>{
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(()=>{
    const navigate =()=>{
      setCurrentPath(window.location.pathname)
    } 
    window.addEventListener('popstate',navigate)
    window.addEventListener('navigate',navigate)
  })

  return (
    currentPath === path ? component():null

  )
}



export const Link = ({to,children})=>{
  const prevDefault=((e)=>{
    e.preventDefault();
    window.history.pushState({},"",to)
    const loc=new PopStateEvent('navigate')
    window.dispatchEvent(loc)
  })
  return (<a href = {to} onClick = {prevDefault}>{children}</a>)
}


function App() {

  return (
    <>
      <Navbar />
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        
        {/* <Link to="/">Home</Link> */}
        
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />   
        <Route path="/foo" component={Foo} />  
        <Route path="/c" component={C} /> 
    </>
  )
}

export default App
