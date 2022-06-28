const pubSub = require("./pubsub")


module.export = {
  publishEvent(){
     const data={
	msg:"test pub message"
     };
     pubSub.publish("anEvent",data);
  }
};

