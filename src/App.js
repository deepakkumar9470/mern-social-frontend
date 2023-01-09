import './App.css';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Home from './scenes/Home/Home'
import Login from './scenes/Login/Login'
import Profile from './scenes/Profile/Profile'
import {CssBaseline,ThemeProvider} from "@mui/material"
import {createTheme} from "@mui/material/styles"
import {themeSettings} from './theme'
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

function App() {
  const mode = useSelector((state)=>state.mode)
  const theme = useMemo(()=>createTheme(themeSettings(mode)),
   [mode]);

   const isAuth = Boolean(useSelector((state)=>state.token))

  return (
    <div className="App">
       <BrowserRouter>
       <ThemeProvider theme={theme}>
       <CssBaseline/>
        <Routes>
          <Route path='/' element={!isAuth ? <Login/> : <Navigate to="/home"/>}/>
          <Route path='/home' element={isAuth ?  <Home/>  : <Navigate to="/"/>}/>
          <Route path='/profile/:id' element={isAuth  ? <Profile/> : <Navigate to="/"/>}/>
        </Routes>
       </ThemeProvider>
       </BrowserRouter>
    </div>
  );
}

export default App;
