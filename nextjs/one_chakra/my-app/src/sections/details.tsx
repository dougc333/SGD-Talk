import { VStack, Heading,Text,SimpleGrid, GridItem } from "@chakra-ui/layout";
import {FormControl, FormLabel} from "@chakra-ui/form-control"
import {Input} from "@chakra-ui/input"
import {Checkbox, Select} from "@chakra-ui/react"
import { Button } from "@chakra-ui/react";
const Details  = ()=>{
    return(<VStack 
        w="full" 
        h="full" 
        p={10}
        spacing={10}
        alignItems="flex-start"
        bg="blue.50"
      >
        <VStack p={3} alignItems="flex-start" >
        <Heading size="2xl">Your Details</Heading>
        <Text>If you already have an account, click here</Text>
        </VStack>
        <SimpleGrid column={2} columnGap={3} rowGap={6} w="full">
        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input placeholder="Bob"></Input>
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input placeholder="Smith"></Input>
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input placeholder="111 XYX Way"></Input>
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>City</FormLabel>
            <Input placeholder="111 XYX Way"></Input>
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Country</FormLabel>
            <Select placeholder="Select Option">
              <option value="option1">Optioin 1</option>
              <option value="option2">Optioin 2</option>
              <option value="option3">Optioin 3</option>
              <option value="option4">Optioin 4</option>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
            <Checkbox defaultChecked> Ship to default address</Checkbox>
        </GridItem>
        <GridItem colSpan={2}>
          <Button size="lg" w="full">
            Place Order
            </Button>          

        </GridItem>

        </SimpleGrid>
      </VStack>);
}

export default Details