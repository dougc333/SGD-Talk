//dont need to access these fns access everything in APP
//const users = APP.getUsers()
//const users2 = APP.users //what is difference? 
//dont like the first folder and the wrapper functions and iife functions

APP.addHere = document.getElementById("addHere");

APP.users.map(x=>{
    elem = document.createElement("li");
    elem_txt = document.createTextNode(x)
    elem.appendChild(elem_txt)
    APP.addHere.appendChild(elem)
})

APP.handleClick = (e) => {
    const input_id = document.getElementById("input-id")
    elem = document.createElement("li");
    console.log("input_id:",input_id.value)
    elem_txt = document.createTextNode(input_id.value)
    elem.appendChild(elem_txt)
    addHere.appendChild(elem)
}

APP.button = document.getElementById("button-id");

APP.button.addEventListener("click",APP.handleClick)

