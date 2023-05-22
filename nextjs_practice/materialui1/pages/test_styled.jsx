import React from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const PREFIX = 'MyCard';
const classes = {
  root: `${PREFIX}-root`,
  cta: `${PREFIX}-cta`,
  content: `${PREFIX}-content`,
}
const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main
  },
  [`& .${classes.cta}`]: {
    borderRadius: theme.shape.radius
  },
  [`& .${classes.content}`]: {
    color: theme.palette.common.white,
    fontSize: 16,
    lineHeight: 1.7
  },
}))

 export default function test_styled() {
   return (
  
    <Root className={classes.root}>
       {/* The benefit of this approach is that the code inside Root stays the same. */}
       <Typography className={classes.content}>...</Typography>
       <Button className={classes.cta}>Go</Button>
    </Root>
  
   )
 }
