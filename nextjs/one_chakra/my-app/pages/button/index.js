import { Button } from "@chakra-ui/button";
import { Container } from "@chakra-ui/layout";

const b = ()=>{
    <Container>
      <SimpleGrid columns={2} spacing={20}>
        <Button>
            Submit1
        </Button>
        <Button>
            Submit2
        </Button>
        <Button>
            Submit3
        </Button>
        <Button>
            Submit4
        </Button>
      </SimpleGrid>

    </Container>

}
export default b