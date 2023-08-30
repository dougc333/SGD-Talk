import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button"
import {Navbar, Container, Nav, NavDropdown, Card ,Row,Col,Image} from 'react-bootstrap'

// const div_style = {
//   marginTop:'2rem',
//   marginLeft:'2rem',
//   // padding:'10px',
//   height:'300px',
//   width:'300px',
//   border:'1px solid black',
// }

class TestComp extends React.Component {
  render(){
    return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand='lg'>
        <Container>
          <Navbar.Brand href='#home'>React Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" ></Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id='basic-nav-dropdown'>
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Separated Link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>
      <Container>
      <Row className="px 4 my-5">
        <Col sm={8}>sm=7
        <Image src="holder.js/100px250" fluid></Image>
        </Col>
        <Col sm={4}>sm=5
        <h1 className="fw-heavy">Tagline</h1>
          <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Esse perspiciatis recusandae distinctio praesentium assumenda expedita 
          eaque hic itaque earum
          </p>
          <Button variant="outline-primary">Button Here</Button>
        </Col>
      </Row>
      <Row>
        <Card className='text-center bg-secondary text-white my-5 py-4'>This is some text in a cards
        <Card.Body>
          This call to action card is an great place ot showcase some important information or display stuff
        </Card.Body>
        </Card>
      </Row>
      <Row>
        <Col> 
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://picsum.photos/id/330/320/200" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col> 
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://picsum.photos/320/200" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col> 
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://picsum.photos/330/200" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    <footer className="py-5 my-5 bg-dark">
      <Container className="px4">
        <p className="text-center text-white">Copyright &copy 2021</p>

      </Container>
    </footer>
      </main>
    </div>
    )
  }
}

export default TestComp;