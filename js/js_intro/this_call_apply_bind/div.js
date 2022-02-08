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
     this.listeners.splice(this.listeners.indexOf(l),1)
 }
 addChild(c){
    this.childElements.push(c)
 }
 removeChild(c){
    this.listeners.splice(this.childElements.indexOf(c),1)
 }
 notify(event){
     console.log("div.notify event:",event)
     console.log("notify this:",this)
     console.log("eventIsInElement:",super.eventIsInElement(event))
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
        //console.log("textbox notify this:",this)
        if (this===textBox){
            console.log("this===textBox")
        }else{
            console.log("this!==textBox")
        }
        //can set color here
        for (const l of this.listeners){
           console.log("listener l:",l)
           if (event.name==='text_click'){
               console.log("found click")
               //added to textBox; 
               this.text="some new text"
               this.background_color="red"
           }
        }  
    }
}

class Event{
  constructor(name,xy){
    this.name=name
    this.x=xy[0]
    this.y=xy[1]
    this.type="click"
  }
}


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
console.log("creating div")
const div=new Div(id="div",[0,0],[40,40])
console.log("creating textbox")
const textBox = new TextBox(id="textBox",[5,5],[15,15])
//should we attach div and textbox to window? or globalThis? 
//or put it into a weakmap? 
textBox.addListener(listener2)
div.addChild(textBox)

div.addListener(listener1)
//this event is wrong. 
const e = new Event("div_click",[2,2])
const e_textbox = new Event("text_click",[10,10])

console.log("event fired in div")
div.notify(e)
console.log("event fired in textbox")
textBox.notify(e_textbox)
console.log("verify textBox red and new text appended:",textBox)