import React,{ useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Admin from '../components/Admin';
import NavBar from '../components/NavBar';
import UserPanel from './UserPanel';

const Dashboard = () => {

    const[isUser,setIsUser] = useState(true);

    const adminInfo = localStorage.getItem("admin");
    const userInfo = localStorage.getItem("user");
    const navigate = useNavigate();
    useEffect(() => {
        if(!adminInfo && !userInfo) {
            navigate("/");
        }
        else if(userInfo) {
            setIsUser(true)
        }
        else {
            setIsUser(false)
        }
      },[])
  return (
    <>
    <NavBar/>
    {isUser ? <UserPanel/> : <Admin/>}
    </>
  )
}

export default Dashboard