
const add = document.getElementById("addHere")
const button = document.getElementById("button")
button.addEventListener("click",clickHandler)

function clickHandler(e) {
    e.preventDefault()
    const inputBox = document.getElementById("input")
    console.log(inputBox.value)
    users.push(inputBox.value)
    console.log("users", users)
    const elem = document.createElement("li")
    const txt =  document.createTextNode(inputBox.value)
    elem.appendChild(txt)
    add.appendChild(elem)    
}

console.log(users)
users.map(x=>{
        const elem = document.createElement("li")
        const txt =  document.createTextNode(x.toString())
        elem.appendChild(txt)
        add.appendChild(elem)
    })

