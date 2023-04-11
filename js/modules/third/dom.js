
(()=>{
  const addUserToDOM=(user)=>{
    const ul_element=document.getElementById("users")
    const node = document.createElement("li")
    const text = document.createTextNode(user)
    ul_element.appendChild(node)
    node.appendChild(text)
  }
  
  document.getElementById("submit").addEventListener("click",()=>{
      const input_box = document.getElementById("input")
      addUserToDOM(input_box.value)
      input_box.value=""
  })
  
  const u=APP.getUsers()
  u.map(x=>addUserToDOM(x))

})()






