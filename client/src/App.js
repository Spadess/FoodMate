import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./themes";


function App() {
  const mode = useSelector((state)=>state.mode); //grab the current state of the app with redux
  const theme = useMemo(()=> createTheme(themeSettings(mode)), [mode]);
  const hasAuthToken = Boolean(useSelector((state) => state.token));
  
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/> 
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/home" element={hasAuthToken ? <HomePage/> : <Navigate to="/" /> }/>
            <Route path="/profile/:userId" element={hasAuthToken ? <ProfilePage/> : <Navigate to="/"/> } />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
