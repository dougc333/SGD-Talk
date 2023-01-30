import React from "react"
import ReactDOM from "react-dom"


class P1 extends React.Component{
    constructor(props){
        super(props)
        console.log("P1 props:",props)
    }
    render(){
        return(<div>this is a div </div>)
    }

}

export default P1