import {Grid,Box, Theme,Button} from '@mui/material'
import {styled} from '@mui/material/styles'

//this isnt correct. sxStyle and inlineStyle same. 
//cant get hooks to work in here. 



//should get media queries here. 
const sxStyle={
    fontSize: '2rem',
    backgroundColor: 'red',
    paddingLeft:2,
    margin:1, //these units arent px. different than sytledbox
    border: '1px solid red',
}

//styled(Component) media queries work here. 
const StyledBox = styled(Box)(({ theme })=>({
    fontSize: '2rem',
    backgroundColor: 'orange',
    width:200,
    margin:10,
    paddingLeft:20,
    border: '2ps solid black',
    color: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]:{
        color:'yellow',
    },
    border:'2px solid',
    paddingLeft: theme.spacing(2),
    '&hover':{borderColor: 'magenta'},
    transition:theme.transitions.create(['border-color']),
}))

//no media queries 
const inlineStyle = {
  fontSize: '2rem',
  backgroundColor: '#f5f5dc',
  width:200,
  border: '10px solid',
 // '&hover':{borderColor: 'magenta'},
 //   transition:theme.transitions.create(['border-color']),
  paddingLeft: 2, //in pixel color:'primary.main' does not work because inlineStyle doesnt have access to it? Theme not
}


export default function grid2(){
 const c_hooks = useStyles()
 return (
    <Grid container spacing={2} direction="column">
        
        <Grid item xs={4} >
            <Button className={c_hooks.root}>hook here</Button>
        </Grid>
        <Box sx={sxStyle}>hi box sxStyle here</Box>
        <Grid item xs={12}>
            <StyledBox>A styled box where does the style come from? </StyledBox>
        </Grid>
        <Grid item xs={12}>
            <Box
              fontSize="2rem"
              bgcolor="#f5f5f5"
              width={200}
              height={200}
              color={['green', 'primary.main']}
            >
                style in box element the grammar is very different
            </Box>
        </Grid>
        <Grid item xs={12}>
            <Box style={inlineStyle}>inlineStyle do breakpoints work for inline style? .</Box>
        </Grid>
    </Grid>


 )   
}