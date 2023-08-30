import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React from 'react'
import Button from 'react-bootstrap/Button'

const style = {
  border:'1px solid red'
}

function BootstrapInput(){
  return (
    <div style={style}>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="button-addon2">
          Button
        </Button>
      </InputGroup>
    </div>
  )
}

export default BootstrapInput
