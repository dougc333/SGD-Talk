
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faUserEdit, faEdit } from "@fortawesome/free-solid-svg-icons";
import './App.css'



function logMe(){
  console.log("asfasdfas")
}

function App() {
  return (
    <>
  <Table striped bordered hover>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
      <th scope="col">Action</th>
      <th scope="col">Action</th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td> <Button><FontAwesomeIcon icon={faTrash} /></Button></td>
      <td> <Button><FontAwesomeIcon icon={faEdit} /></Button></td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@eer</td>
      <td> <Button><FontAwesomeIcon icon={faTrash} /></Button></td>
      <td> <Button><FontAwesomeIcon icon={faUserEdit} onClick={logMe}/></Button></td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>bob</td>
      <td>Thor</td>
      <td>@eee</td>
       <td><Button><FontAwesomeIcon icon={faTrash} /></Button></td>
      <td> <Button><FontAwesomeIcon icon={faEdit} /></Button></td>
    </tr>
    
  </tbody>
</Table>
  </>
  )
}

export default App
