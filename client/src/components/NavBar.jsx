import React from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


const NavBar = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/")
  }
  return (
    <>
    <div className="container">
  <nav className="navbar navbar-expand-lg bg-light">
    <div className="container-fluid">
      <a className="navbar-brand"></a>
      <Button onClick={handleLogOut}>Log Out</Button>
      
    </div>
  </nav>
</div>
    </>
  )
}

export default NavBar