import { Container,Flex } from '@chakra-ui/react'
import Cart  from '../src/sections/cart'
import Details from '../src/sections/details'


const IndexPage = ()=>(
  <Container maxW="container.x1" p={0}>
    <Flex h="100vh" py={20}>
     
      <Cart />
      <Details />
    </Flex>


  </Container>

);

export default IndexPage