import React,{useState} from "react";
import {Form} from 'react-bootstrap'
import {Button} from 'react-bootstrap'

type Props = {
  data:string[]
}


export const InputForm = (data:Props)=>{
  const [ form, setForm ] = useState({})
  const [ foo, setFoo ] = useState(['hi'])
  const [ errors, setErrors ] = useState({})


  function startsWith(wordToCompare:string) {
    return function(element:string) {
        return element.indexOf(wordToCompare) === 0;
    }
}
  const setField = (field:string, value:string) => {
    // {console.log("field:",field)}
    // {console.log("value prefix:",value)}
    // {console.log("data:",data)}
    setFoo(data.data.filter(startsWith(value)))
    {console.log(foo)}
    console.log("We should document why we need ...form")
    setForm({
      ...form,
      [field]: value
    })
  }

  return(
    <div className='App d-flex flex-column align-items-center'>
      <h1>Input Prefix?</h1>
      <Form style={{ width: '300px' }}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' onChange={ e => setField('name', e.target.value) }/>
          <div>{...foo}</div>
        </Form.Group>
      </Form>
    </div>  
  )
}