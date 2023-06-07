import { useState } from 'react';
import './App.css';
import useMediaQuery from './hooks/mediaQuery';
import Navbar from './scenes/navbar';


function App() {
  const [selectedPage, setSelectedPage] = useState('home')
  const [isTopOfPage, setIsTopOfPage] = useState(true);
  const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)')

  useEffect(() =>{

  })

  return (
    <div className="app bg-deep-blue">
      <Navbar selectedPage={selectedPage} setSelectedPage={setSelectedPage} /> 
    </div>
  );
}

export default App;
