import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'

import { FirstExample } from './components/FirstExample.tsx'
import { SecondExample } from './components/SecondExample.tsx'
import { ThirdExample } from './components/ThirdExample.tsx'
import { FourthExample } from './components/FourthExample.tsx'
import {Sidebar} from './components/Sidebar.tsx'

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Navbar,Nav, NavDropdown } from 'react-bootstrap'

function App() {

  return (
    <>
    <header>
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">React-UseEffect</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
    <Container>
    <Row>
      <Col xs={2} id="sidebar-wrapper">      
      <Sidebar />
      </Col>
      <Col  xs={10} id="page-content-wrapper">
        this is a test
      </Col> 
    </Row>
      <Row>
    <Col>
    <Card border="primary" className="card h-100 mb-3">
    <Card.Body className="d-flex flex-column">
      <Card.Header as="h5">First Example</Card.Header>
      <FirstExample />
      </Card.Body>
    </Card>
    </Col>
    <Col>
    <Card border="primary" className=" card h-100 mb-3">
    <Card.Body className="d-flex flex-column">
    <Card.Header as="h5">Second Example</Card.Header>
    <SecondExample></SecondExample>
    </Card.Body >
    </Card>
    </Col>
    <Col>
    <Card border="primary" className=" card h-100 mb-3">
    <Card.Body className="d-flex flex-column">
    <Card.Header as="h5">Third Example useEffect With [number]</Card.Header>
    <ThirdExample></ThirdExample>
    </Card.Body>
    </Card>
    </Col>
    <Col>
    <Card border="primary" className=" card h-100 mb-3">
    <Card.Body className="d-flex flex-column">
    <Card.Header as="h5">Fourth Example useEffect w/[]</Card.Header>
    <FourthExample></FourthExample>
    </Card.Body>
    </Card>
    </Col>
    </Row>
    </Container>
    </>
  )
}

export default App
