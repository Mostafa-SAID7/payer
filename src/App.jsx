import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Outlet } from "react-router-dom";
import MainContaint from "./components/MainContaint";
import Container from "@mui/material/Container";
import Footer from "./components/Footer";
import Scroll_btn from './components/Scroll_btn';
import Top_Head from './components/Top_Head';
function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Top_Head/>
        <div
          className="App"
          style={{
            direction: "rtl",
            display: "flex",
            justifyContent: "center",
            alignItems:"center",
          
            margin:"auto",
            width: "90vw",
            minHeight:"87vh",
          }}
        >
          
          <Container>
            <MainContaint />
          </Container>

          <Outlet />
        </div>
        
        <Scroll_btn/><Footer/>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
