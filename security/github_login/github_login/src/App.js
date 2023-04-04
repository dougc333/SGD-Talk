import './App.css';
import { useEffect , useState, rerender, setRerender} from 'react';

const CLIENT_ID='3e12a33f37c6cea82b9b'


function loginWithGithub(){
  window.location.assign('https://github.com/login/oauth/authorize?client_id='+CLIENT_ID);
}

function logout(){
  localStorage.removeItem('access_token');
  setRerender(!rerender)

}

async function getUserData(){
  console.log('getUserData before fetch')
  await fetch('http://localhost:4000/getUserData',{
    method: 'GET',
    headers: {
      "Authorization" : "Bearer " + localStorage.getItem('access_token')
    }
  }).then((response)=>{
    console.log("finish fetch getUserData")
    console.log("getUserData response:"+response)
    return response.json()
  }).then((data)=>{
    console.log("getUserData data:",data)
  })
}



//localhStorage prone to security attacks. Not for production
//http only cookies better solution. 
function App() {
  



  const [rerender, setRerender] = useState(false)
  useEffect(()=>{
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const codeParam = urlParams.get('code')
    console.log("useEffect codeParam:",codeParam)
    if (codeParam && (localStorage.getItem('access_token') == null)) {
      
      async function getAccessToken(){
        await fetch("http://localhost:4000/getAccessToken?code=" + codeParam,{
          method:"GET",
        }).then(response=>{
          return response.json()
        }).then(data=>{
          console.log(data)
          if(data.access_token){
            localStorage.setItem('access_token',data.access_token)
            setRerender(!rerender) //force rerender to update state and perform react update
          }
        })
      }
      getAccessToken()
    }
  },[])

  return (
    <div className="App">
      <header className="App-header">
        {localStorage.getItem('access_token') ?
          <>
          <h1>We have the access_token</h1>
          <button onClick={logout}> 
            Logout
          </button>
          <h3>Console log user data from Github API</h3>
          <button onClick={getUserData}>
            Get User Data
          </button>
          </>
        :
        <>
          <h3>User is not logged in</h3>
          <button onClick={loginWithGithub}>
            Login With Github
          </button>
        </>
        }
      </header>
    </div>
  );
}

export default App;
