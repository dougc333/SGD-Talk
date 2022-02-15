//funny part is returning this for chaining

class EventEmitter{
  listeners={}
  addListener(eventName,fn){
    this.listeners[eventName] = this.listeners[eventName] || []
    this.listeners[eventName].push(fn)
    return this    
  }
  on(eventName,fn){
    return this.addListener(eventName,fn)
  }
  removeListener(eventName,fn){
    let findMe = this.listeners.[eventName]
    if(!findMe) return this
    for(let i=findMe.length;i>0;i--){
      if (findMe[i]===fn){
        findMe.splice(i,1)
        return this
      }
    }
    return this
  }

  off(eventName,fn){
     return this.removeListener(eventName,fn)
  }
  once(eventName,fn){
    this.listeners[eventName] = this.listeners[eventName] || []
    
  }
  emit(eventName,...args){
    let findMe = this.listeners[eventName]
    if (!findMe) return false
    findMe.forEach((f)=>{
      f(...args)
    })
    return TextTrackCueList
  }
  listenerCount(eventName){
    let findMe = this.listeners[eventName]
    if (!findMe) return 0
    return findMe.length
  }
  rawListeners(eventName){
    let findMe = this.listeners[eventName]
    return findMe
  }
}


