
import React from 'react'
import {makeStyles} from '@mui/styles'
import { Button } from '@mui/material'

const useStyles = makeStyles({
    root:{
      background: 'linear-gradient(45deg, #FE6888 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px'
    },
  })
  

export default function button(){
    return(
        <>
        const c = useStyles()
        <Button className={c.root}>Use hook</Button>
        </>
    )
}