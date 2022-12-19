import { Container } from "@chakra-ui/layout";
import { ChakraProvider } from "@chakra-ui/react";

const grid2 = ()=>{
   return (
    <ChakraProvider>
    <Container maxW = "container.xl" bgColor={"rebeccapurple"}>1 </Container>
    <Container maxW = "container.lg" bgColor={"rebeccapurple"}> 2</Container>
    <Container maxW = "container.md" bgColor={"rebeccapurple"}>3 </Container>
    <Container maxW = "container.sm" bgColor={"rebeccapurple"}>4 </Container>
    </ChakraProvider>);

};

export default grid2