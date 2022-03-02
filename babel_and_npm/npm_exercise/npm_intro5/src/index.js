import React from 'react'
import ReactDOM from 'react-dom'
import img1 from '../img/covid_bayes.jpg'
import './index.css'

const foo = "this is foo"

export function B(){
  return(<div className="foo">this is stuff
  this is foo {foo}. You should see this is foo twice.
      <img src={img1} />Bayes rule for covid
  </div>)
}
ReactDOM.render(<B/>,document.getElementById('app'))