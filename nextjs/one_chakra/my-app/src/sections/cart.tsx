import { VStack,Heading,HStack, Image, AspectRatio, Text, Divider, 
Stack, Button, useColorMode, useColorModeValue,Box } from "@chakra-ui/react";


const Cart = ()=>{
    return(
        <VStack 
        w="full" 
        h="full" 
        p={10}
        spacing={10}
        alignItems="flex-start"
        bg="orange"
      >
      <VStack alignItems="flex-start"  >
        <Heading size="2xl">Your Cart</Heading>
        <Text>If you already have an account, click here to login</Text>
      </VStack>
      <HStack spacing="flex-start" isInline={true} >
        <Box w="40px" h="40px" bg="green"></Box>
        <Box w="40px" h="40px" bg="yellow"></Box>
        <Box w="40px" h="40px" bg="red"></Box>
        
      </HStack>
      </VStack>
    );
}

export default Cart