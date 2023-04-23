const APP={}

APP.getUsers = ()=>{
    return ["a", "b", "c", "d", "e"]
}

APP.populateList= ()=>{
    const list_div = document.getElementById("list-id")
    const users = APP.getUsers()
    users.map(x=>{
        const elem = document.createElement("li")
        const text_node = document.createTextNode(x)
        elem.appendChild(text_node)
        list_div.appendChild(elem)
    })
}

APP.addEventListener = ()=>{
    const button = document.getElementById("button-id")
    button.addEventListener("click",()=>{
        const list_elem = document.getElementById("list-id")
        const input_elem = document.getElementById("input-id")
        const elem = document.createElement("li")
        const text_node = document.createTextNode(input_elem.value)
        elem.appendChild(text_node)
        list_elem.appendChild(elem)
    })
}

APP.populateList();
APP.addEventListener();

