
const addHere = document.getElementById("list-container")

stuff.map(x=>{
    const elem = document.createElement("li")
    const txt = document.createTextNode(x.toString())
    elem.appendChild(txt)
    addHere.appendChild(elem)
})

const inputHandler = (e)=>{
  const inputBox = document.getElementById("input-id")
  const elem = document.createElement("li")
  const txt = document.createTextNode(inputBox.value)
  elem.appendChild(txt)
  addHere.appendChild(elem)
}

const button = document.getElementsByName("button-name")[0].addEventListener("click",inputHandler)

