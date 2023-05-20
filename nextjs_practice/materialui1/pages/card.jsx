
import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Box,Paper,Card} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const make_cards=()=>{
 let result = []
 let aa = [1,2,3].filter(function(x){return <Card key={x}>{x}</Card>})
 console.log(aa)
}

//make_cards()
let ad  = [<Card key="00">array card</Card>]
export default function b() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid  xs={4}>
        {...ad}
        </Grid>
        <Grid  xs={4}>
         <Card  variant='outlined'>card here</Card>
        </Grid>
        <Grid  xs={4}>
        <Card  variant='outlined'>card here</Card>
        </Grid>
        <Grid  xs={4}>
        <Card  variant='outlined'>card here</Card>
        </Grid>
      </Grid>
    </Box>
  );

}