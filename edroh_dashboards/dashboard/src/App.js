import { ThemeProvider } from "@emotion/react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline } from "@mui/material";
import Topbar from "./scenes/global/Topbar";



function App() {
  const [theme, colorMode] = useMode()

  return (
    <ColorModeContext.Provider value={colorMode} >
    <ThemeProvider theme={theme}>
    <CssBaseline></CssBaseline>
    <div className="app">
      <main className="content">
      <Topbar />
      </main>
    </div>
    </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;
