import { SimpleGrid } from "@chakra-ui/layout"
import { Box } from "@chakra-ui/layout"
import {Text} from "@chakra-ui/react"

export default function grid_test(){
 return (
 <SimpleGrid columns={2} spacing={10} p={10} m=
 {100} >
    <Text>"margin, spacing props vs properties? "</Text>
 <Box bg='tomato' height='80px'></Box>
 <Box bg='tomato' height='80px'></Box>
 <Box bg='tomato' height='80px'></Box>
 <Box bg='tomato' height='80px'></Box>
 <Box bg='tomato' height='80px'></Box>
</SimpleGrid>
 );
}