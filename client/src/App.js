import './App.css';
import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import UserPanel from './pages/UserPanel';
import { useEffect } from 'react';

function App() {

  const [profile, setProfile] = useState("")

  const userInfo = JSON.parse(localStorage.getItem("user"));
  const adminInfo = JSON.parse(localStorage.getItem("admin"));

 useEffect(() => {
  if(adminInfo) {
    setProfile(adminInfo)
   }
   else {
     setProfile(userInfo)
   }
 },[adminInfo, userInfo])
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/dashboard" element={<Dashboard />}/>
    <Route path="/" element={!profile ? <LoginPage /> : <Navigate to="/dashboard"/>}/>
    <Route path="/user" element={<UserPanel />}/>
    </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;
