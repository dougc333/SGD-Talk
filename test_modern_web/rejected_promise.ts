
//https://twitter.com/wesbos/status/1600186156238442496
async function asyncWrapper(promise){
  try{
    const data = await promise;
    return [data,null];
  }catch(err){
    return [null,err]
  }
}

const [data,err] = await(asyncWrap(getData());

