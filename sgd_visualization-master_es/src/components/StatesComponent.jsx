import React from "react"

class StatesComponent extends React.Component{
    constructor(props){
        super(props)
        console.log("StatesComponent ctor")
        console.log(props)
        //how does the window component get here??
        this.arr = window.models.statesModel();
        console.log("this.arr:",this.arr)
    }
    render(){
        return(
            <div>States Component</div>
        )
    }

}

export default StatesComponent
