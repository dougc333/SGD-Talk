import React from 'react';
import {
  AppBar, Toolbar, Typography,Checkbox
} from '@material-ui/core';
import './TopBar.css';

/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      prevProps:props,
      name:'',
      old:'',
      checked:false,
    }
  }

  componentDidUpdate(){
    //console.log("topbar componentdidupdate props:",this.state.prevProps)
    //console.log("topbar this.props.photoInfo;",this.props.photoInfo)
    if (this.state.old!==this.props.photoInfo){
      if(this.props.photoInfo===true){
        this.setState({name:"Photo",old:this.props.photoInfo})
      }else{
        this.setState({name:"Name",old:this.props.photoInfo})
      }
    }
  }

  handleChange=(e)=>{
    //console.log("topbar handleChange e.currentTarget.value",e.currentTarget.value)
    //console.log("handleChange topbar checked before setState:",this.state.checked)
    //console.log("topbar handleChange event.currentTarget.getAttribute('value')",event.currentTarget.getAttribute('value'))
    this.setState({checked:!this.state.checked},function(){
      this.props.onCheckBox(this.state.checked); 
      //console.log("topBar handleChange checked:",this.state.checked)
    })
  }
  

  render() {
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute" >
        <Toolbar>
          <Typography variant="h5" color="inherit" component='span' style={{ flex: 1 }}>
          Name:DC
          </Typography>
          Engage
          <Checkbox
            onChange={this.handleChange}
            value="checkedA"
            inputProps={{ 'aria-label': 'Checkbox A' }}
          />
          <Typography variant="h5" color="inherit" component='span' style={{ flex: 1 }}>
          User {this.state.name} :{this.props.usrid}
          </Typography>
        </Toolbar>
        
      </AppBar>
    );
  }
}

export default TopBar;
