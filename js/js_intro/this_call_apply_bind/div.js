class Element{
    constructor(x,y){
        this.x=x
        this.y=y
    }

    eventIsInElement(e){
        console.log("Event x:",e.x," y:",e.y)
        console.log("this.x",this.x," this.y:",this.y)
        if (e.x >= this.x[0] && e.x<=this.x[1] && e.y>=this.y[0] && e.y<=this.y[1]) {
            return true
        }
        return false
    }
}




class Div extends Element{
 constructor(id,x,y){
    super(x,y)
    this.name="div"
    this.id=id
    this.listeners=[]
    this.childElements=[]
 } 
 addListener(l){
   this.listeners.push(l)
 }
 removeListener(l){
     const findMe=this.listeners.indexOf(l)
     this.listeners.splice(findMe,1)
 }
 addChild(c){
    this.childElements.push(c)
 }
 removeChild(c){
    const findMe=this.childElements.indexOf(c)
    this.listeners.splice(findMe,1)
 }
 notify(event){
     console.log("div.notify event:",event)
     console.log("notify this:",this)
     console.log("eventIsInElement:",eventIsInElement(event))
     //can set color here
     for (const l of this.listeners){
        console.log("listener l:",l)
        if (event.name==='click'){
            this.color="red"
        }
     }
    
 }
}

class TextBox extends Element{
    constructor(id,x,y){
       super(x,y)
       this.name="textbox"
       this.id=id
       this.listeners=[]
       this.text="text box"
    } 
    addListener(l){
      this.listeners.push(l)
    }
    remooveListener(l){
        const findMe=this.listeners.indexOf(l)
        this.listeners.splice(index,1)
    }
    notify(event){
        console.log("textbox.notify event:",event)
        console.log("textbox notify this:",this)
        //can set color here
        for (const l of this.listeners){
           console.log("listener l:",l)
           if (event.name==='click'){
               this.text="some new text"
           }
        }
       
    }
   
}

class Event{
  constructor(name,x,y){
    this.name=name
    this.x=x
    this.y=y
    this.type="click"
  }
}

const e = new Event("div_event",[0,0],[40,40])
const e_textbox = new Event("textbox_event",[5,5],[15,15])

const listener1={
    update:message=>{
        console.log("listener1 received:",message)
        console.log("listener1 this:",this)
    }
}

const listener2={
    update:message=>{
        console.log("listener2 received:",message)
        console.log("listener2 this:",this)
    }
}

const div=new Div(id="div",[0,0],[40,40])
const textBox = new TextBox(id="textBox",[5,5],[15,15])
//should we attach div and textbox to window? or globalThis? 
//or put it into a weakmap? 
textBox.addListener(listener2)
div.addChild(textBox)

div.addListener(listener1)

div.notify(e)
textBox.notify(e_textbox)
console.log("div after:",div)