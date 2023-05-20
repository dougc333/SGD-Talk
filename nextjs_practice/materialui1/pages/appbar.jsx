import { AppBar,Toolbar,Card,Container } from "@material-ui/core"

//card is underneath the app bar if you put teh cards outside of the <AppBar>
export default function appbar(){
    return(
        <>
        <AppBar>
          <Toolbar>
            tool bar here
          </Toolbar>
          <Card variant="outlined">1</Card>
        <Card variant="outlined">2</Card>
        <Card variant="outlined">3</Card>
        </AppBar>
        </>
        
    )
}