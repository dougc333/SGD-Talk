
const subscribers = {};

module.exports={
  publish(event,data){
    
    lookup = subcribers[event]
    if (!lookup) return
    subscribers[event].forEach(subCallback=>subCallback(data));
  },
  subscribe(event,callback){
    if(!subscribers[event]){
      subscribers[event] = []
    }
    subscribers[event].push(callback)
  }

};


