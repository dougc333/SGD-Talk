import React, {useState} from "react"


const InputStuff = ()=>{
  const [inputVal, setInputVal ] = useState('')
  const [buttonMessage, setButtonMessage] = useState("")

  const updateInputBox = (e)=>{
    setInputVal(e.target.value)
  }

  function onClick(e){
    e.preventDefault()
    setButtonMessage("in the old days I would have to use onkeydown and onclick but the hooks can get verbose")
  }
  
  return(
    <div className="outline">
      <div className="upperLeft">
        <h1 className="title">Pokemon Search</h1>
        <label htmlFor="ps" >Search</label>
        <form action="">
        <input 
          id="ps" 
          placeholder="enter in search term" 
          onChange = {updateInputBox}
          value = {inputVal} 
        />
        <div>InputVal:{inputVal}</div>
        <button  onClick={onClick} type="submit">Submit</button>
        <p>{buttonMessage}</p>
        </form>
      </div>
    <hr />
    </div>
  )
}

export default InputStuff