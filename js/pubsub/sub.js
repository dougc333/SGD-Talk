const pubSub = require("./pubsub");



pubSub.subscribe("anEvent", data=>{
  console.log(
     `"anEvent", was publisched iwth: "${data.msg}"`
  );
});
