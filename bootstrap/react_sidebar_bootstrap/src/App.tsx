import { useState } from 'react'
import './App.css'

function App() {
  const [toggle, setToggle] = useState(false)
  

  return (
    <>
    <button onClick={()=>{setToggle(x=>!x)}}>click</button>
    <div>toggle:{JSON.stringify(toggle)}</div>
    <div id={toggle ? "wrappermenuDisplayed":"wrapper"} >
      <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
          <li>About</li>
          <li>First</li>
          <li>Home</li>
        </ul>
      </div>
      <div id="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <h1>Sidebar menus cool</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex distinctio impedit, architecto alias doloremque enim, expedita, libero earum laudantium totam eum corporis aperiam sed magni perferendis autem cum doloribus. Nostrum, ducimus neque nihil, qui impedit ullam eum tempore eaque magnam veritatis iure a voluptatum ut perferendis ab blanditiis aspernatur possimus soluta. Maxime veritatis nisi id sit voluptatum et officia repellat cumque ipsum cupiditate? Officia minima necessitatibus quidem cum explicabo molestiae? Corporis a officia ipsa atque consequatur eaque distinctio illum possimus reprehenderit numquam fugiat id iure, velit dolor quas expedita, facere unde inventore temporibus esse ratione? Delectus minus quibusdam sunt. Laborum.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
