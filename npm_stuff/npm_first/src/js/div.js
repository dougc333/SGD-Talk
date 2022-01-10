

let js_id = document.getElementById("js-div")
console.log("js_id:",js_id)
let p = document.createElement("p")
console.log("js_id:",js_id)
let text = document.createTextNode("stuff inserted to dom")
p.appendChild(text)
js_id.appendChild(p)
