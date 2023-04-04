import logo from './logo.svg';
import './App.css';
import { useEffect , useState} from 'react';

const CLIENT_ID='3e12a33f37c6cea82b9b'

function loginWithGithub(){
  window.location.assign('https://github.com/login/oauth/authorize?client_id='+CLIENT_ID);
}

function App() {
  const [rerender, setRerender] = useState(false)
  useEffect(()=>{
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const codeParam = urlParams.get('code')
    console.log("codeParam:",codeParam)
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
       <button onClick={loginWithGithub}>
        Login With Github
       </button>
      </header>
    </div>
  );
}

export default App;
