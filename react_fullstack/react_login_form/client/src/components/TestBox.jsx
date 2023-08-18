import {Box} from '@mui/material'



export default function TestBox(){
  return(
  <Box sx={{
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    border: '3px solid red', 
  }}> This is box
  </Box>
  )
}

