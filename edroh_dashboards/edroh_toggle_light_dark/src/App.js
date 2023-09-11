import Topbar from "./scenes/global/Topbar";
import { ColorModeContext,useMode } from "./theme";
import { ThemeProvider,CssBaseline } from "@mui/material";

function App() {
  const [theme, colorMode] = useMode()
  
  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme = {theme}>
      <CssBaseline />
    <div className="App">
      <Topbar></Topbar>
    </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
