import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component{
  render(){
    return(<div>{this.props.name}</div>)
  }

}

var node = document.getElementById("app")
ReactDOM.render(<App name="aaaaa" />,node)


