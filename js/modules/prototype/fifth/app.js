function App(stuff){
    App.prototype.users  = stuff
}

//App.prototype.users = this.user


App.prototype.populateUsers= function(){
    const ul_element = document.getElementById("list-id")
    this.users.map(x=>{
        const li_element = document.createElement("li")
        //allows ints to work in this.users
        const text_node = document.createTextNode(x.toString())
        li_element.appendChild(text_node)
        ul_element.appendChild(li_element)
    })
}

App.prototype.addEventListener=()=>{
    const button_element = document.getElementById("button-id")
    
    button_element.addEventListener("click",()=>{
        const input_element = document.getElementById("input-id")
        const ul_element = document.getElementById("list-id")
        const li_element = document.createElement("li")
        const text_node = document.createTextNode(input_element.value)
        li_element.appendChild(text_node)
        ul_element.appendChild(li_element)
    })
}
a = new App(["a","b","c","d","e","f"])
b = new App([1,2,3,4,5])
a.populateUsers()
a.addEventListener()