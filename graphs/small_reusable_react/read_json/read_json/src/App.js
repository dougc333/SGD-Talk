import './App.css';
import React,{useState, useEffect} from 'react'
import s from './stuff.json'
import n from './nlsy.json'



function App() {
  const a =[1,2,3]
  const [st,setSt] = useState(a)
  const [data,setData] = useState([])
  console.log("s:",s)
  console.log("n:",n)
  //setSt((st)=>[...st,2])
  function getData(){
    console.log("get data")
    fetch('./test.json')
    .then((response)=>{
      console.log("one")
//      console.log("one json",r.json())
        setSt(3)
        //setSt((st)=>[...st,2])
      return response.json()
    })
    .then((myJSON)=>{
      //console.log("two")
      //console.log(myJSON.length)
      setData(x=>[...x,myJSON[0]])
    })
    .catch(function(err){
      //console.log(err)
    })
  }
  function foo(){
    setData(x=>[...x,1])
  }
  //componentDidMount equivalent. get data when component is mountedls
  useEffect(()=>{
    getData()
  },[])
  

  
  return (
    <div className="App">
       <div>hi</div>
      {<div>{data.length}</div>}
      { <div>{a.length}</div>}
      {<div>{st.length}</div>}
      <button onClick={foo}>Add Data</button>
    </div>
    
  );
}

export default App;
