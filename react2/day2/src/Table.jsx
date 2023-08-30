import React from 'react';
import Table from 'react-bootstrap/Table';

function HerrTable(){
  return (
    <React.Fragment>
    <h1 className = "display-1 mt-5">Pokemon Search</h1>
    <Table striped bordered hover>
    <thead>
      <tr>
      <th>Name</th>
      <th>Type</th>
      </tr>
    </thead>
    <tbody>
    <tr>
      <td>Bulbasaur</td>
      <td>Grass, Poison</td>
    </tr>
    </tbody>
    </Table>
    </React.Fragment>
  )
}

export default HerrTable