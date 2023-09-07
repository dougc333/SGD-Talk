import React from 'react';
// import './Simpson.css'
import Image from 'react-bootstrap/Image'
import Figure from 'react-bootstrap/Figure'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export const Simpson = ()=>{
  return(
    <Container>
      <Row>
        <Col>
        <Figure.Image src='./public/homersimpson.jpeg'></Figure.Image>
        </Col>
        <Col>
        <Figure.Image src='./public/bart.png'></Figure.Image>
        </Col>
      </Row>
      <Row>
      <Image   src='./public/homersimpson.jpeg'></Image>
      
      <Figure.Image className= 'simpson-img' src='./public/bart.png'></Figure.Image>
      </Row>
    </Container>
  )
}