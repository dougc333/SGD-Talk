
const addUserToDOM = (name) => {
    const node = document.createElement("li")
    const text = document.createTextNode(name)
    node.appendChild(text)
    document.getElementById("users").appendChild(node)
}

document.getElementById("submit").addEventListener("click", () => {
    const input = document.getElementById("input")
    addUserToDOM(input.value)
    input.value = ""
});


getUsers().map(x => { console.log(x); addUserToDOM(x); console.log("done") })
