import React from 'react'
import ReactDOM from 'react-dom'

function Slider({onChange, min, max}){
    const [value, setValue] = React.useState(1)
    return(
        <React.Fragment>
          {value}
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e)=>{
                const value = Number(e.target.value)
                onChange(value)
                setValue(value)
            }} 
            />  
        </React.Fragment>
    )
}

function reducer(state,action){
    if(action.type==='increment'){
        return {
            count: state.count + state.step,
            step: state.step
        }
      }else if(action.type==='decrement'){
        return {
            count: state.count -state.step,
            step: state.step
        }
      }else if(action.type==='reset'){
        return {
            count: 0,
            step: state.step
        }
      }else if(action.type==='updateStep'){
        return {
            count: state.count,
            step: action.step
        }
     }
    else {
        throw new Error('Unknown action')
    }
}


function Counter_With_Reducer_Hook(){
  const [state,dispatch]=React.useReducer(reducer,0)

 return(
    <React.Fragment>
        <Slider
           min={1}
           max={10}
           onChange={(value)=>dispatch({
              type: 'updateStep',
              step: value
            })}
        >
        </Slider>
        <h1>Count:{state.count}</h1>
        <button onClick={(()=>{dispatch('increment')})}>+</button>
        <button onClick={(()=>{dispatch('decrement')})}>-</button>
        <button onClick={(()=>{dispatch('reset')})}>Reset</button>
    </React.Fragment>
 )

}

export default Counter_With_Reducer_Hook
