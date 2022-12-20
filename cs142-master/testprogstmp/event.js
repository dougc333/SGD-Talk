var events = require('events')

var eventEmitter = new events.EventEmitter()


var list1=function listener1(){
    console.log('listener1 executed',arguments)
}

var list2=function listener2(){
    console.log('listener2 execute',arguments)
}

console.log('2 ways to bind listener to eventEmitter, addLIstener or on');
console.log('first arg is eventName, connection in this case')
eventEmitter.addListener('connection',list1)
//eventEmitter.addListener('connection',list2)
console.log('b')
eventEmitter.on('connection',list2) //bind list2

var eventList = events.EventEmitter.listenerCount(eventEmitter,'connection')
console.log('evetnListners ',eventList)
console.log('c')
eventEmitter.emit('connection',1,2,3) //how to print this/

