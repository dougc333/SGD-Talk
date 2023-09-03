import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

function App() {
  const [name, setName] = useState("")
  const [state, setState] = useState({
    name:'',
    selected:false,
  })

  return (
    <>
    <div >
    <Form className='container-lg mt-3 mb-3 dc-border-container'>
      <Form.Group className = "mb-3" >
      <Form.Control type="text" onChange = {(e)=>{setName(e.target.value)}} placeholder="Enter name" />
      <Form.Text className="text-muted">{name}</Form.Text>
      </Form.Group>
    </Form>
    </div>
    </>
  )
}

export default App
