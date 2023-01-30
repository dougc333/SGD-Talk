import React from "react"
import ReactDOM from 'react-dom'



class TestComponent extends React.Component{
    constructor(props){
        super(props)
        console.log("props P1:",props)
    }

    render(){
        return(
            <div>TestComponent react component div</div>
        )
    }
}

export default TestComponent
