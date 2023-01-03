import './App.css';
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'
import ToolBar from '@mui/material/Toolbar'


export default function App() {
  return (
    <div className="App">
          <AppBar >
            <Button variant="contained">One</Button>
            <Button variant="contained">Two</Button>
            <ToolBar></ToolBar>
          </AppBar>
    </div>
  );
}
