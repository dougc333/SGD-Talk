//test_redux.js

//https://github.com/udacity/reactnd-redux-todos-goals/blob/action-creators/index.js
//ok not good. he implemented his own "redux" which isn't really true 

function todos(state=[],action){
  if(action.type==='ADD_TODO'){
    return state.concat([action.todo])
  }else if(action.type==='REMOVE_TODO'){
    return state.filter(x=>x.id!==action.id)
  }else if(action.type==='TOGGLE_TODO'){
    return state.map(todo=>todo.id!==action.id ? todo: Object.assign({},todo,{complete:!todo.complete})
    )
  }
  return state
}

function goals(state=[],action){
  switch(action.type){
    case 'ADD_GOAL':
      return state.concat([action.goal])
    case 'REMOVE_GOAL':
      return state.filter(goal=>goal.id!==action.id)
    default:
      return state
  }
}

function app(state={},action){
  return{
    todos:todos(state.todos,action),
    goals:goals(state.goals,action),
  }
}

function createStore(reducer){
  let state
  let listeners=[]

  const getState=()=>state
  const subscribe=(listener)=>{
    console.log("calling subscribe")
    listeners.push(listener)
    return ()=>{
      listeners = listeners.filter(l=>l!==listener)
    }
  }
  const dispatch=(action)=>{
    state = reducer(state,action)
    //run each listener
    listeners.forEach((listener)=>listener())
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}

const store = createStore(app)
store.subscribe(()=>{
  console.log("subscribe1", store.getState())
})

store.dispatch({
  type:"ADD_TODO",
  todo:{
    id:0,
    name:"first todo",
    complete:false,
  }
})

store.subscribe(()=>{
  console.log("subscribe2",store.getState())
})

store.dispatch({
    type:"ADD_TODO",
    todo:{
      id:1,
      name:"second todo",
      complete:false,
    }
})
  
store.dispatch({
  type:"ADD_TODO",
  todo:{
    id:2,
    name:"third todo",
    complete:true,
  }
})
store.dispatch({
  type:"REMOVE_TODO",
  id:0,  
})

store.dispatch({
    type:"ADD_GOAL",
    goal:{
      id:0,
      name:"first goal",
    }
})

store.dispatch({
    type:"ADD_GOAL",
    goal:{
      id:1,
      name:"second goal",
    }
})

store.dispatch({
    type:"REMOVE_GOAL",
    id:0,
})